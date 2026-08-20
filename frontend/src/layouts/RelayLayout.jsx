import { NavLink, Outlet } from "react-router-dom";
import { LayoutGrid, ListChecks, MapPinned, Package } from "lucide-react";
import LiveIndicator from "../components/common/LiveIndicator";

const TABS = [
  { to: "/relay", label: "Dashboard", icon: LayoutGrid, end: true },
  { to: "/relay/missions", label: "Missions", icon: ListChecks },
  { to: "/relay/team", label: "Team Tracking", icon: MapPinned },
  { to: "/relay/resources", label: "Resources", icon: Package },
];

// Relay's shell: top tab bar rather than Nexus's full sidebar — per
// spec, Relay is "a lighter provider shell than Nexus," since a field
// team needs fast switching between a handful of views, not a dense
// command-center nav tree.
export default function RelayLayout() {
  return (
    <div className="min-h-screen bg-navy-900 text-slate-100 font-sans">
      <header className="border-b border-navy-600 bg-navy-800/60 backdrop-blur sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold">
              ResQ <span className="text-accent">Relay</span>
            </span>
            <LiveIndicator />
          </div>
          <nav className="hidden sm:flex gap-1">
            {TABS.map((tab) => (
              <NavLink
                key={tab.to}
                to={tab.to}
                end={tab.end}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 rounded-card text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-accent text-white"
                      : "text-slate-400 hover:text-slate-200 hover:bg-navy-700"
                  }`
                }
              >
                <tab.icon size={14} />
                {tab.label}
              </NavLink>
            ))}
          </nav>
        </div>
        {/* Mobile tab row */}
        <nav className="sm:hidden flex justify-around border-t border-navy-600 px-2 py-1.5">
          {TABS.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium ${
                  isActive ? "text-accent" : "text-slate-500"
                }`
              }
            >
              <tab.icon size={16} />
              {tab.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-5 py-6">
        <Outlet />
      </main>
    </div>
  );
}
