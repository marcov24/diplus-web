import { useState, useEffect } from 'react';
import { RefreshCw, Trash2 } from 'lucide-react'; // Necesario para los botones del floating panel
import { MapContainer, TileLayer, Marker, Popup, Polyline, LayersControl, useMap, LayerGroup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_LIVE_TRUCKS, MOCK_ROUTES_PATHS } from '../../demo/mockData';
import TruckStatusList from './components/TruckStatusList';
import TrackingStatus from './components/TrackingStatus';

// Fix for default marker icons
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = defaultIcon;

// const statusColors: Record<string, string> = {
//   "En Ruta": "bg-green-100 text-green-700",
//   "Cargando": "bg-blue-100 text-blue-700",
//   "Descargando": "bg-yellow-100 text-yellow-700",
//   "Mantenimiento": "bg-red-100 text-red-700",
// };

const createCustomIcon = (status: string, speed: number, unit: string) => {
  const isOperating = status.toLowerCase().includes("operando") || status.toLowerCase().includes("ruta");
  const isWarning = status.toLowerCase().includes("descargando") || status.toLowerCase().includes("cargando") || status.toLowerCase().includes("demora");
  const colorClass = isOperating ? "bg-green-500" : isWarning ? "bg-orange-500" : "bg-red-500";

  return L.divIcon({
    className: "custom-truck-icon bg-transparent border-none",
    html: `<div class="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-white shadow-lg ${colorClass} text-[8px] text-white font-bold">${unit.split('-')[1] || ''}</div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });
};

// Componente auxiliar para cambiar la vista de la cámara una sola vez al hacer clic
function MapControls({ focusTrigger }: { focusTrigger: { lat: number, lng: number, timestamp: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (focusTrigger) {
      map.flyTo([focusTrigger.lat, focusTrigger.lng], 16, { animate: true, duration: 1.5 });
    }
  }, [focusTrigger, map]);
  return null;
}

// Extender el tipo base para nuestro estado animado
type LiveTruck = typeof MOCK_LIVE_TRUCKS[0] & {
  lat: number;
  lng: number;
  history: { lat: number, lng: number }[];
};

export default function TruckTrackingPage() {
  const [, setSelectedTruck] = useState<string | null>(null);
  const [focusTrigger, setFocusTrigger] = useState<{ lat: number, lng: number, timestamp: number } | null>(null);

  // Nuevos estados para el panel flotante
  const [showTrails, setShowTrails] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [maxHistoryPoints, setMaxHistoryPoints] = useState(50);
  const [routesLoading, setRoutesLoading] = useState(false);

  // Estado para los camiones que se van a animar
  const [trucks, setTrucks] = useState<LiveTruck[]>(() =>
    MOCK_LIVE_TRUCKS.map(t => {
      const path = MOCK_ROUTES_PATHS[t.routeId];
      const pos = path[t.pathIndex % path.length];
      return {
        ...t,
        lat: pos.lat,
        lng: pos.lng,
        history: [pos]
      };
    })
  );

  // Efecto de animación: Mueve los camiones cada 3 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(currentTrucks =>
        currentTrucks.map(truck => {
          if (truck.status !== "En Ruta") return truck; // Solo mueve los que están en ruta

          const path = MOCK_ROUTES_PATHS[truck.routeId];
          const nextIndex = (truck.pathIndex + 1) % path.length;
          const nextPos = path[nextIndex];

          // Mantiene solo la cantidad de puntos determinada por el estado maxHistoryPoints
          const newHistory = [...truck.history, nextPos].slice(-maxHistoryPoints);

          return {
            ...truck,
            pathIndex: nextIndex,
            lat: nextPos.lat,
            lng: nextPos.lng,
            history: newHistory
          };
        })
      );
    }, 3000); // 3 segundos por "tick"

    return () => clearInterval(interval);
  }, []);

  // En el nuevo diseño, seleccionar un camión solo mueve la cámara,
  // no filtra los demás camiones del mapa.
  const filteredTrucks = trucks;

  const handleSelectTruckClick = (truckUnit: string, lat: number, lng: number) => {
    setSelectedTruck(truckUnit);
    setFocusTrigger({ lat, lng, timestamp: Date.now() });
  };

  const fetchRoutes = () => {
    setRoutesLoading(true);
    setTimeout(() => setRoutesLoading(false), 800);
  };

  const clearHistory = () => {
    setTrucks(currentTrucks => currentTrucks.map(t => ({ ...t, history: t.history.slice(-1) })));
  };

  return (
    <div className="h-full w-full bg-gray-50 relative">
      <TrackingStatus
        connectionStats={{ isConnected: true, lastUpdate: new Date().toLocaleTimeString('es-ES') }}
        routesError={null}
        truckData={trucks}
      />
      {/* Panel Superior Izquierdo Flotante */}
      <div className="absolute top-3 left-3 bg-black/70 rounded-xl shadow-lg p-3 z-40 w-[260px]">
        <div className="bg-black/90 py-1.5 rounded-md text-zinc-400 mb-2 px-2 text-center">
          <h2 className="text-[10px] font-bold leading-none tracking-wide uppercase">
            Información del tráfico
          </h2>
        </div>

        <div className="text-xs text-left pl-2 space-y-1">
          <p className="text-green-500">
            <strong className="text-green-500 text-sm">
              {trucks.filter(t => t.status === "En Ruta").length}
            </strong>{" "}
            Camiones con ubicación
          </p>
          <p className="text-yellow-500">
            <strong className="text-yellow-500 text-sm">
              {trucks.length}
            </strong>{" "}
            Camiones en el área
          </p>
          <p className="text-sky-500">
            <strong className="text-sky-500 text-sm">
              {Object.keys(MOCK_ROUTES_PATHS).length}
            </strong>{" "}
            Rutas cargadas
          </p>
          <p className="text-rose-400">
            <strong className="text-rose-400 text-sm">
              {trucks.reduce((acc, t) => acc + t.history.length, 0)}
            </strong>{" "}
            Puntos de historial
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 py-3 mt-4 border-y border-zinc-500/50">
          <div className="flex flex-col text-left space-y-1">
            <span className="text-[9px] text-zinc-300 font-semibold uppercase tracking-wide">
              Mostrar trazas
            </span>
            <button
              onClick={() => setShowTrails(!showTrails)}
              className={`px-3 py-1 h-7 rounded-md text-xs font-bold cursor-pointer transition-colors ${showTrails
                ? "bg-[#04C286] text-white"
                : "bg-zinc-500/50 text-zinc-400 hover:bg-zinc-400/50"
                }`}
            >
              {showTrails ? "ON" : "OFF"}
            </button>
          </div>

          <div className="flex flex-col text-left space-y-1">
            <span className="text-[9px] text-zinc-300 font-semibold uppercase tracking-wide">
              Mostrar rutas
            </span>
            <button
              onClick={() => setShowRoutes(!showRoutes)}
              className={`px-3 py-1 h-7 rounded-md text-xs font-bold cursor-pointer transition-colors ${showRoutes
                ? "bg-[#04C286] text-white"
                : "bg-zinc-500/50 text-zinc-400 hover:bg-zinc-400/50"
                }`}
            >
              {showRoutes ? "ON" : "OFF"}
            </button>
          </div>

          <div className="flex flex-col text-left space-y-1">
            <span className="text-[9px] text-zinc-300 font-semibold uppercase tracking-wide">
              Puntos máx
            </span>
            <select
              value={maxHistoryPoints}
              onChange={(e) => setMaxHistoryPoints(Number(e.target.value))}
              className="px-2 py-0 h-7 text-xs font-semibold rounded-md focus:border-blue-500 bg-zinc-800 border border-zinc-600 text-zinc-100"
            >
              <option value={20}>20</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
              <option value={200}>200</option>
            </select>
          </div>
        </div>

        <div className="space-y-2 mt-4">
          <button
            onClick={fetchRoutes}
            disabled={routesLoading}
            className="flex items-center justify-center gap-2 w-full px-2 py-2 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors font-semibold disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${routesLoading ? 'animate-spin' : ''}`} />
            {routesLoading ? "Cargando..." : "Recargar rutas"}
          </button>
          <button
            onClick={clearHistory}
            className="flex items-center justify-center gap-2 w-full px-2 py-2 text-xs bg-rose-500 text-white rounded-md hover:bg-rose-400 transition-colors font-semibold cursor-pointer"
          >
            <Trash2 className="size-3.5" /> Limpiar historial
          </button>
        </div>
      </div>

      {/* Leyenda Flotante (Abajo a la izquierda) */}
      <div className="space-y-1.5 text-xs absolute bottom-4 left-4 bg-black/70 rounded-xl py-3 px-4 z-40 shadow-lg">
        <p className="font-semibold text-zinc-300 text-left text-[11px] mb-2 uppercase tracking-wide border-b border-zinc-600/50 pb-1">
          Leyenda de camiones
        </p>
        <div className="flex justify-between text-white text-[12px] leading-tight gap-4">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(34,197,94,0.7)]"></div>
            <span className="text-green-400 font-medium">Operando</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(249,115,22,0.7)]"></div>
            <span className="text-orange-400 font-medium">Demora</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-1.5 shadow-[0_0_5px_rgba(239,68,68,0.7)]"></div>
            <span className="text-red-400 font-medium">Detenido</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-zinc-400 rounded-full mr-1.5"></div>
            <span className="text-zinc-400 font-medium">Offline</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="absolute inset-0 z-0">
        <MapContainer
          center={[-6.045, -80.860738]}
          zoom={14.5}
          maxZoom={17.4}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
          attributionControl={false}
        >
          <LayersControl position="topright">
            {/* Esri Satellite Layer */}
            <LayersControl.BaseLayer checked name="Vista Satelital">
              <TileLayer
                attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            </LayersControl.BaseLayer>

            {/* Standard OSM Layer */}
            <LayersControl.BaseLayer name="Red Vial (OSM)">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>

            {/* Overlays for Routes (Rutas base) */}
            {showRoutes && (
              <LayersControl.Overlay checked name="Rutas Permitidas">
                <LayerGroup>
                  {Object.entries(MOCK_ROUTES_PATHS).map(([routeName, path], i) => (
                    <Polyline
                      key={routeName}
                      positions={path.map(p => [p.lat, p.lng] as [number, number])}
                      pathOptions={{ color: i === 0 ? "#3b82f6" : "#f59e0b", weight: 3, dashArray: "10 5" }}
                    />
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
            )}

            {/* Trails (Trazas) */}
            {showTrails && (
              <LayersControl.Overlay checked name="Trazas de Recorrido">
                <LayerGroup>
                  {filteredTrucks.map((truck) => {
                    if (truck.history.length < 2) return null;
                    const positions = truck.history.map(p => [p.lat, p.lng] as [number, number]);
                    return (
                      <Polyline
                        key={`trail-${truck.id}`}
                        positions={positions}
                        pathOptions={{ color: "#8b5cf6", weight: 4, opacity: 0.8 }}
                      />
                    );
                  })}
                </LayerGroup>
              </LayersControl.Overlay>
            )}
          </LayersControl>

          {/* Truck markers with detailed Popup */}
          {filteredTrucks.map((truck, index) => (
            <Marker
              key={`${truck.unit}-${index}`}
              position={[truck.lat, truck.lng]}
              icon={createCustomIcon(truck.status, truck.speed, truck.unit)}
              eventHandlers={{
                click: () => handleSelectTruckClick(truck.unit, truck.lat, truck.lng),
              }}
            >
              <Popup className="custom-popup-demo">
                <div className="text-sm max-w-xs space-y-2 p-1">
                  <div className="flex items-center gap-2 justify-start">
                    <span className="font-black text-xl text-blue-600 px-3 py-1.5 bg-zinc-100 rounded-md">
                      {truck.unit}
                    </span>
                    <div className="flex flex-col items-start gap-1">
                      <span
                        className={`px-2 py-[2px] rounded-full text-[9px] leading-3 font-semibold ${truck.status.toLowerCase().includes("ruta") || truck.status.toLowerCase().includes("operando")
                          ? "bg-green-100 text-green-800"
                          : truck.status.toLowerCase().includes("descargando") || truck.status.toLowerCase().includes("cargando")
                            ? "bg-orange-300 text-orange-800"
                            : "bg-red-100 text-red-800"
                          }`}
                      >
                        {truck.status}
                      </span>
                      <span className="text-blue-600 font-bold ml-1 leading-3">
                        {truck.speed} km/h
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 border-b border-zinc-100 pb-2">
                    👤 Operador: <span className="font-medium text-gray-800">{truck.operator}</span>
                  </div>

                  <div className="flex items-center justify-between py-2 divide-x divide-zinc-200 bg-slate-50 rounded-lg">
                    <span className="text-center w-full">
                      <small className="text-[10px] text-gray-500 uppercase tracking-wider">Longitud</small> <br />
                      <strong className="font-mono text-xs text-slate-700">
                        {truck.lng.toFixed(6)}
                      </strong>
                    </span>
                    <span className="text-center w-full">
                      <small className="text-[10px] text-gray-500 uppercase tracking-wider">Latitud</small> <br />
                      <strong className="font-mono text-xs text-slate-700">
                        {truck.lat.toFixed(6)}
                      </strong>
                    </span>
                  </div>

                  <div className="border-t border-zinc-200 pt-2 flex flex-col gap-1">
                    <span className="text-[10px] leading-3 font-semibold text-gray-600">
                      Actualizado: 🟢 Señal en vivo
                    </span>
                    <span className="text-[10px] leading-3 text-gray-400">
                      {truck.history.length} puntos de Historial
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

          <MapControls focusTrigger={focusTrigger} />
        </MapContainer>

        {/* Live indicator (moved to right) */}
        <div className="absolute top-4 right-14 z-40">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm text-green-700 text-xs font-semibold rounded-lg border border-green-200 shadow-md">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            En vivo (Demo)
          </span>
        </div>
        {/* Bottom Right Floating Truck Status List */}
        <TruckStatusList
          data={trucks}
          onTruckSelect={(truck) => handleSelectTruckClick(truck.unit, truck.lat, truck.lng)}
        />
      </div>
    </div>
  );
}
