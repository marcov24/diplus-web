import { useState } from "react";
import NavMenu from "./Sidebar";
import clsx from "clsx";

// Demo pages
import TruckTrackingPage from "../pages/Tracking/TruckTracking";
import TrackingPage from "../pages/Tracking";
import TemporalSummary from "../pages/Tracking/TemporalSummary";
import OperatorPerformance from "../pages/Tracking/OperatorPerformance";
import TruckDashboard from "../pages/Truck";
import ConsumedByPeriods from "../pages/Truck/ConsumedByPeriods";

// Map of route keys to components
const PAGE_MAP: Record<string, React.ComponentType> = {
  "/demo": TruckTrackingPage,
  "/demo/tracking": TrackingPage,
  "/demo/tracking/summary": TemporalSummary,
  "/demo/tracking/operator-performance": OperatorPerformance,
  "/demo/truck/dashboard": TruckDashboard,
  "/demo/consumed-by-periods": ConsumedByPeriods,
};

const routesWithoutPadding = ["/demo", "/demo/tracking"];

/**
 * Self-contained demo component that does NOT use react-router.
 * The sidebar and content are both absolutely positioned inside
 * a relative container, so the sidebar OVERLAYS the content on hover.
 */
export default function EmbeddedDemo() {
  const [currentPage, setCurrentPage] = useState("/demo");
  const currentYear = new Date().getFullYear();

  const PageComponent = PAGE_MAP[currentPage] || TruckTrackingPage;
  const noPadding = routesWithoutPadding.includes(currentPage);

  return (
    <div className="h-full w-full relative">
      {/* Sidebar: absolutely positioned, overlays content on hover */}
      <NavMenu embedded onNavigate={setCurrentPage} currentPath={currentPage} />

      {/* Content area: fills the container with left padding for collapsed sidebar */}
      <div className="absolute inset-0 pl-[70px] z-0">
        <div className="h-full w-full flex flex-col bg-slate-950 rounded-br-xl overflow-y-auto overflow-x-hidden">
          <div
            className={clsx(
              "flex flex-col gap-2 flex-1",
              noPadding ? "" : "px-6 pt-4 pb-1",
            )}
          >
            <PageComponent />
          </div>
          {!noPadding && (
            <div className="flex flex-col justify-center h-7 shrink-0">
              <span className="text-center text-[10.5px] text-zinc-500">
                © {currentYear} Demo Terms Privacy Cookies
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
