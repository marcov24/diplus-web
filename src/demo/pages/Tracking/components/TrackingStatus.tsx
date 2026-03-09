import { useEffect, useState } from "react";
import { MdChevronRight } from "react-icons/md";
import IconTruck from "../../../assets/icons/IconTruck";
import clsx from "clsx";

// Instead of the missing ITruckStatusORF, we use a generic type 
// that matches our MOCK_LIVE_TRUCKS data structure in the Demo
interface LiveTruck {
  unit: string;
  speed: number;
  status: string;
}

interface TrackingStatusProps {
  connectionStats: { isConnected: boolean, lastUpdate: string };
  routesError: string | null;
  truckData: LiveTruck[] | null;
}

const TrackingStatus = ({ connectionStats, routesError, truckData }: TrackingStatusProps) => {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false); // start open by default

  const operativeTrucks = truckData ? truckData.filter(truck => {
    // In our mock, status could be "Mantenimiento"
    return truck.status.toLowerCase() !== "mantenimiento";
  }) : [];

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2 pointer-events-none">
      <div className="rounded-lg py-2 px-4 flex items-center gap-4 bg-[#0e954b] text-white shadow-lg pointer-events-auto self-end">
        <div className="flex flex-col items-center justify-center min-w-[60px]">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#FFFFFF]/90 mb-1">
            Operativos
          </span>
          <span className="text-4xl font-extrabold leading-none">
            {operativeTrucks.length}
          </span>
        </div>
        <div className="flex border-l border-white/20 pl-4">
          <IconTruck className="w-10 h-10" color="#FFFFFF" />
        </div>
      </div>

      <div className={`relative transition-all duration-500 ease-in-out pointer-events-auto flex justify-end ${isVisible ? "translate-x-0" : "translate-x-[calc(100%+16px)]"}`}>
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="absolute left-[-28px] top-4 bg-black/90 hover:bg-black p-1.5 rounded-l-md shadow-md z-20 transition-colors duration-200 border border-r-0 border-white/10"
        >
          <MdChevronRight
            size={20}
            className={`text-white transition-transform duration-300 ${isVisible ? "rotate-0" : "rotate-180"}`}
          />
        </button>

        <div className="bg-black/80 rounded-xl rounded-tl-none shadow-lg px-6 py-4 min-w-[200px] space-y-1">
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${connectionStats.isConnected
                ? "bg-green-500 animate-pulse"
                : "bg-red-600"
                }`}
            ></div>
            <span
              className={`text-sm font-medium  ${connectionStats.isConnected ? "text-green-500" : "text-red-500"
                }`}
            >
              {connectionStats.isConnected ? "Conectado" : "Desconectado"}
            </span>
          </div>
          {connectionStats.isConnected && (
            <p className="text-[30px] leading-7 font-black text-white">
              {currentTime}
            </p>
          )}
          <p className="text-[10px] text-zinc-400 mt-1">
            Última actualización: {connectionStats.lastUpdate}
          </p>
          {routesError && (
            <p className="text-xs text-red-600 mt-1">Error cargando rutas</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TrackingStatus;
