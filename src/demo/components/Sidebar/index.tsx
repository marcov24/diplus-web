import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import "./styles.css";

// Icons 
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineDashboard, MdGpsFixed } from "react-icons/md";
import { CiMonitor } from "react-icons/ci";
import { BsFillFuelPumpFill } from "react-icons/bs";

// Assets
import GunjopIcon from "../../assets/gunjop_icon.svg";
import GunjopLogoWide from "../../assets/logo-white.svg";

type MenuItem = {
  label: string;
  href: string;
};

type MenuSection = {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: MenuItem[];
};

const menuSections: MenuSection[] = [
  {
    id: "dashboards",
    label: "Estadísticas",
    icon: MdOutlineDashboard,
    items: [
      // { label: "Dashboard GPS", href: "/demo/dashboard/gps-bd" },
      { label: "Dashboard Truck", href: "/demo/truck/dashboard" },
    ]
  },
  {
    id: "tracking",
    label: "GPS Histórico",
    icon: FaClockRotateLeft,
    items: [
      { label: "Resumen Temporal", href: "/demo/tracking/summary" },
    ]
  },
  {
    id: "monitoring",
    label: "Monitoreo",
    icon: CiMonitor,
    items: [
      { label: "Desempeño Operador", href: "/demo/tracking/operator-performance" },
    ]
  },
  {
    id: "combustible",
    label: "Combustible",
    icon: BsFillFuelPumpFill,
    items: [
      { label: "Consumo por Periodos", href: "/demo/consumed-by-periods" },
    ]
  },
  {
    id: "realtime",
    label: "Tiempo Real",
    icon: MdGpsFixed,
    items: [
      { label: "Mapa en Vivo", href: "/demo" },
      // { label: "Rastreo GPS", href: "/demo/tracking" },
    ]
  },
];

type NavMenuProps = {
  embedded?: boolean;
  onNavigate?: (href: string) => void;
  currentPath?: string;
};

const NavMenu = ({ embedded, onNavigate, currentPath }: NavMenuProps) => {
  const [openMenu, setOpenMenu] = useState<string | null>("realtime");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Always call the hook (React rules), but only use it when not embedded
  let activePath = currentPath || "/demo";
  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const loc = useLocation();
    if (!embedded) activePath = loc.pathname;
  } catch {
    // No router context — we're in embedded mode, use currentPath
  }

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const sectionHasActiveItem = (section: MenuSection) =>
    section.items.some(
      (item) =>
        (item.href === "/demo" && activePath === "/demo") ||
        (item.href !== "/demo" && (activePath === item.href || activePath.startsWith(item.href + "/"))),
    );

  return (
    <div
      className={`sidebar--container border-r border-[#B1B0B1] ${embedded ? 'sidebar--embedded' : ''}`}
      onMouseEnter={() => setIsSidebarOpen(true)}
      onMouseLeave={() => setIsSidebarOpen(false)}
    >
      <div className={`logo--container p-4 font-bold text-white text-xl bg-[#E2231A] flex items-center ${isSidebarOpen ? "justify-start" : "justify-center"}`}>
        <img
          src={isSidebarOpen ? GunjopLogoWide : GunjopIcon}
          alt="Gunjop"
          className={isSidebarOpen ? "max-h-8" : "w-8 h-8"}
        />
      </div>

      <nav className="px-4 mt-6">
        {menuSections.map((section) => {
          const isActive = sectionHasActiveItem(section);
          const isOpen = openMenu === section.id || isActive;
          const SectionIcon = section.icon;

          return (
            <div key={section.id} className="menu-section py-2">
              <button
                onClick={() => toggleMenu(section.id)}
                className={`list-header h-8 flex gap-2 items-center justify-center
                text-xs font-bold uppercase transition-colors duration-200 rounded-full cursor-pointer
                ${isActive ? "bg-[#ff5556]" : ""}
              `}
              >
                <div className="main-icon pl-3">
                  <SectionIcon
                    size={16}
                    className={isActive ? "text-white" : "text-[#565B5D]"}
                  />
                </div>
                <span
                  className={`menu-title flex-1 text-left ${isActive ? "text-white" : "text-zinc-600"}`}
                >
                  {section.label}
                </span>
                <MdKeyboardArrowDown
                  className={`h-4 w-4 transition-transform duration-300 mr-2 expanded-icon ${isOpen ? "rotate-180" : "rotate-0"
                    } ${isActive ? "text-white" : "text-zinc-500"}`}
                />
              </button>
              <div
                className={`w-full pl-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <ul className="flex flex-col text-left pt-1 relative after:absolute after:-left-1 after:top-0 after:w-px after:h-full after:bg-zinc-300 ">
                  {section.items.map((item) => {
                    const isItemActive = (item.href === "/demo" && activePath === "/demo") ||
                      (item.href !== "/demo" && (activePath === item.href || activePath.startsWith(item.href + "/")));

                    if (embedded) {
                      // Embedded mode: use button + onNavigate callback
                      return (
                        <li key={item.label} className="Item-menu cursor-pointer">
                          <button
                            onClick={() => onNavigate?.(item.href)}
                            className={`text-[12px] font-semibold hover:text-[#ff5556] hover:bg-[#E2231A]/10 transition-colors duration-200 flex items-center px-3 leading-[.9rem] group h-7 rounded-2xl w-full text-left ${isItemActive
                              ? "text-[#ff5556] bg-[#E2231A]/10"
                              : "text-[#71717a]"
                              }`}
                          >
                            <span
                              className={`w-full leading-[.9rem] transition-all duration-500 ease-in-out will-change-transform translate-x-[0rem] group-hover:translate-x-[.4rem] truncate ${isItemActive ? "text-[#ff5556]" : "text-[#71717a]"
                                } group-hover:text-black`}
                            >
                              {item.label}
                            </span>
                          </button>
                        </li>
                      );
                    }

                    // Router mode: use NavLink
                    return (
                      <li key={item.label} className="Item-menu cursor-pointer">
                        <NavLink
                          to={item.href}
                          end={item.href === "/demo"}
                          className={({ isActive }) =>
                            `text-[12px] font-semibold hover:text-[#ff5556] hover:bg-[#E2231A]/10 transition-colors duration-200 flex items-center px-3 leading-[.9rem] group h-7 rounded-2xl ${isActive
                              ? "text-[#ff5556] bg-[#E2231A]/10"
                              : "text-[#71717a]"
                            }`
                          }
                        >
                          {({ isActive }) => (
                            <span
                              className={`w-full leading-[.9rem] transition-all duration-500 ease-in-out will-change-transform translate-x-[0rem] group-hover:translate-x-[.4rem] truncate 
                              ${isActive ? "text-[#ff5556]" : "text-[#71717a]"} 
                              group-hover:text-black`}
                            >
                              {item.label}
                            </span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </nav>

      <div className="mt-auto config-navigation--container pb-4 border-t border-gray-200 pt-4 px-4 bg-gray-50">
        <div className="text-center text-[10px] text-gray-400 font-medium">
          MODO DEMO
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
