import { useState, useCallback, useMemo } from "react";
import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import esStrings from 'timeago.js/lib/lang/es';
import clsx from "clsx";
// Icons
import { MdViewWeek, MdViewStream } from "react-icons/md";

timeago.register('custom-es', esStrings);

// Tipado basado en el LiveTruck de TruckTracking.tsx
export interface TruckLocationData {
  id: number;
  unit: string;
  routeId: string;
  pathIndex: number;
  speed: number;
  status: string;
  operator: string;
  heading: number;
  lat: number;
  lng: number;
  history: { lat: number; lng: number }[];
}

type PropsTruckStatusList = {
  onTruckSelect: (truck: TruckLocationData) => void;
  data: TruckLocationData[];
};

const TruckStatusList = ({ onTruckSelect, data }: PropsTruckStatusList) => {
  const [gridDisposition, setGridDisposition] = useState<"row" | "column">("column");

  const truckData: TruckLocationData[] = useMemo(() => {
    return [...data].sort((a, b) => a.unit.localeCompare(b.unit));
  }, [data]);

  const getCardColorBackground = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("ruta") || s.includes("operando")) return "bg-green-500";
    if (s.includes("descargando") || s.includes("cargando")) return "bg-orange-500";
    if (s.includes("mantenimiento")) return "bg-yellow-500";
    if (s.includes("detenido")) return "bg-red-500";
    return "bg-zinc-400";
  };

  const handleCardClick = useCallback(
    (truck: TruckLocationData) => {
      const hasValidCoordinates =
        typeof truck.lat === "number" &&
        typeof truck.lng === "number" &&
        truck.lat !== 0 &&
        truck.lng !== 0;

      if (hasValidCoordinates) {
        onTruckSelect(truck);
      } else {
        alert(
          `Las coordenadas del vehículo ${truck.unit} no están disponibles.`
        );
      }
    },
    [onTruckSelect]
  );

  const getTruckStatusColor = (status: string) => {
    let unitColor = "bg-zinc-600 opacity-50";
    let bgColor = "bg-zinc-600 opacity-50";
    const s = status.toLowerCase();

    // Adaptación a mock data states
    if (s.includes("grifo")) {
      unitColor = "bg-purple-600";
      bgColor = "bg-purple-700/50 border-transparent hover:bg-purple-700 hover:border-purple-500";
    } else if (s.includes("parqueo")) {
      unitColor = "bg-blue-600";
      bgColor = "bg-blue-700/50 border-transparent hover:bg-blue-700 hover:border-blue-500";
    } else if (s.includes("mantenimiento")) {
      unitColor = "bg-yellow-600";
      bgColor = "bg-yellow-700/50 border-transparent hover:bg-yellow-700 hover:border-yellow-500";
    } else if (s === "offline") {
      unitColor = "bg-zinc-600 opacity-50";
      bgColor = "bg-black/50 border-transparent hover:bg-black hover:border-zinc-400";
    } else if (s.includes("detenido")) {
      unitColor = "bg-red-600";
      bgColor = "bg-red-700/50 border-transparent hover:bg-red-700 hover:border-red-500";
    } else {
      // Por defecto para Operativo, Cargando, Descargando, En Ruta
      unitColor = "bg-green-600";
      bgColor = "bg-green-700/50 border-transparent hover:bg-green-700 hover:border-green-500";
    }

    return {
      unitColor,
      bgColor
    };
  }

  return (
    <div className="absolute bottom-4 right-4 bg-black/70 rounded-xl p-2 z-40 max-h-[90vh] flex flex-col shadow-lg">
      {/* Cabecera Leyenda y Controles de Vista */}
      <div className="flex flex-row justify-between items-center p-1 gap-4 mb-2">
        <div className="flex flex-row gap-3">
          <p className="flex flex-row gap-1 items-center text-white font-bold tracking-[1px] text-[10px]">
            <span className="block bg-green-600 w-2.5 h-2.5 rounded-full shadow-[0_0_4px_rgba(22,163,74,0.8)]" ></span>
            OPERATIVO
          </p>
          <p className="flex flex-row gap-1 items-center text-white font-bold tracking-[1px] text-[10px]">
            <span className="block bg-purple-600 w-2.5 h-2.5 rounded-full shadow-[0_0_4px_rgba(147,51,234,0.8)]" ></span>
            GRIFO
          </p>
          <p className="flex flex-row gap-1 items-center text-white font-bold tracking-[1px] text-[10px]">
            <span className="block bg-blue-600 w-2.5 h-2.5 rounded-full shadow-[0_0_4px_rgba(37,99,235,0.8)]" ></span>
            PARQUEO
          </p>
          <p className="flex flex-row gap-1 items-center text-white font-bold tracking-[1px] text-[10px]">
            <span className="block bg-yellow-600 w-2.5 h-2.5 rounded-full shadow-[0_0_4px_rgba(202,138,4,0.8)]" ></span>
            MANTENIMIENTO
          </p>
        </div>

        <div className="relative bg-[#ffffff10] rounded-lg p-1 flex items-center">
          <div
            className={`absolute top-1 left-1 w-8 h-8 bg-white/20 rounded-md transition-transform duration-300 ease-in-out ${gridDisposition === "column" ? "translate-x-8" : "translate-x-0"
              }`}
          />
          <button
            className="relative z-10 p-1 w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200 cursor-pointer"
            onClick={() => setGridDisposition("row")}
          >
            <MdViewStream
              size={18}
              color={gridDisposition === "row" ? "#FFFFFF" : "#b9b6b6"}
            />
          </button>
          <button
            className="relative z-10 p-1 w-8 h-8 flex items-center justify-center rounded-md transition-colors duration-200 cursor-pointer"
            onClick={() => setGridDisposition("column")}
          >
            <MdViewWeek
              size={18}
              color={gridDisposition === "column" ? "#FFFFFF" : "#b9b6b6"}
            />
          </button>
        </div>
      </div>

      {/* Grilla o Lista de Camiones */}
      <div className={clsx(`grid ${gridDisposition === "row" ? "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]" : "grid-cols-2"} gap-2 overflow-y-auto pr-1 flex-1`, gridDisposition === "row" ? "max-w-[1100px]" : "max-w-[420px]")}>
        {truckData.map((truck) => (
          <div
            key={truck.unit}
            className={`flex gap-3 items-center p-1.5 rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer w-[200px] select-none ${getTruckStatusColor(truck.status).bgColor}`}
            onClick={() => handleCardClick(truck)}
          >
            <div
              className={`flex w-[80px] h-[50px] items-center justify-center rounded-lg shadow-inner ${getTruckStatusColor(truck.status).unitColor}`}
            >
              <h3 className="font-bold text-lg text-white leading-none tracking-wide">{truck.unit}</h3>
            </div>

            <div className="flex flex-col flex-1 justify-center rounded text-left overflow-hidden">
              <span className="text-[15px] leading-tight font-bold text-white tracking-wide">
                {Number(truck.speed).toFixed(2)} km/h
              </span>
              <span className="text-[10px] pb-1 font-medium text-zinc-300 truncate">
                En línea: <TimeAgo datetime={new Date(Date.now() - 3000)} locale="custom-es" />
              </span>
              <span className="flex flex-row items-center gap-1.5 py-1 px-2 rounded-full text-[9px] tracking-[1px] font-bold text-white bg-[#00000040] max-w-max uppercase shadow-sm">
                <span
                  className={`w-2 h-2 rounded-full shadow-sm ${getCardColorBackground(truck.status)}`}
                ></span>
                <span className="truncate max-w-[80px]">{truck.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {truckData.length === 0 && (
        <div className="flex flex-col items-center justify-center h-48 text-gray-500 px-8 w-full bg-black/50 rounded-xl mt-2">
          <div className="w-12 h-12 bg-zinc-500/50 rounded-full flex items-center justify-center mb-2">
            <span className="text-2xl">🚛</span>
          </div>
          <h3 className="text-sm font-medium mb-1 text-zinc-200 leading-tight">
            No hay vehículos disponibles
          </h3>
          <p className="text-[10px] text-zinc-400 text-center uppercase tracking-wide">
            Esperando información...
          </p>
        </div>
      )}
    </div>
  );
};

export default TruckStatusList;
