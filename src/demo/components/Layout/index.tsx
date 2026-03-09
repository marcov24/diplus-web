import { Outlet, useLocation } from "react-router-dom";
import NavMenu from "../Sidebar";
import clsx from "clsx";

export default function Layout() {
  const currentYear = new Date().getFullYear();
  const { pathname } = useLocation();

  const routesWithoutPadding = ["/demo", "/demo/tracking"];

  return (
    <main className="h-full flex w-full overflow-hidden bg-white dark:bg-black pl-[70px] relative rounded-b-xl">
      <div className="absolute top-0 left-0 bottom-0 z-50">
        <NavMenu />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden p-0 gap-0 bg-[#E0E1E1] relative z-0">
        <div
          className={clsx(
            "flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden",
            routesWithoutPadding.includes(pathname) ? "" : "px-6 pt-4 pb-1",
          )}
        >
          <Outlet />
        </div>
        {/* Solo mostrar el footer si la ruta no está en routesWithoutPadding */}
        {!routesWithoutPadding.includes(pathname) && (
          <div className="flex flex-col justify-center h-7">
            <span className="text-center text-[10.5px] text-zinc-500">
              © {currentYear} Demo Terms Privacy Cookies
            </span>
          </div>
        )}
      </div>
    </main>
  );
}
