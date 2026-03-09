import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_TRACKING_POINTS } from '../../demo/mockData';

// Fix for default marker icons in React Leaflet + Vite
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

export default function TrackingPage() {
  return (
    <div className="flex flex-col h-full gap-4 pb-10 select-none">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Tracking GPS en Tiempo Real</h1>
          <p className="text-sm text-gray-500">Visualización de la posición de toda la flota</p>
        </div>
        <div className="flex gap-2">
          <span className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-sm font-semibold rounded-lg border border-green-200">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            En vivo
          </span>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[500px]">
        <MapContainer
          center={[-6.045, -80.860738]}
          zoom={15}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {MOCK_TRACKING_POINTS.map((point) => (
            <Marker key={point.id} position={[point.lat, point.lng]}>
              <Popup>
                <div className="text-center font-semibold text-gray-800">
                  Vehículo: {point.element}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Leyenda Flotante */}
        <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-gray-200 z-[1000]">
          <h4 className="font-bold text-sm text-gray-800 mb-2 border-b pb-1">Leyenda</h4>
          <ul className="space-y-2 text-xs text-gray-600">
            <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span> Camiones Activos ({MOCK_TRACKING_POINTS.length})</li>
            <li className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-red-500 border-dashed inline-block bg-white"></span> Zona de Carga/Descarga</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
