import { NavLink, Outlet } from "react-router-dom";
import { NexusProvider } from "../context/NexusContext";
import NetworkStatusBar from "../components/nexus/NetworkStatusBar";
import "./nexus.css";

const NAV_ITEMS = [
  { to: "/nexus", label: "Dashboard", end: true },
  { to: "/nexus/incidents", label: "Incidents" },
  { to: "/nexus/responders", label: "Responders" },
  { to: "/nexus/resources", label: "Resources" },
  { to: "/nexus/analytics", label: "Analytics" },
  { to: "/nexus/alerts", label: "Alerts" },
  { to: "/nexus/settings", label: "Settings" },
];

// Shared shell for every Nexus page: sidebar nav + top status bar.
// Wraps everything in NexusProvider so all child pages share one data source.
export default function NexusLayout() {
  return (
    <NexusProvider>
      <div className="nexus-shell">
        <aside className="nexus-sidebar">
          <div className="nexus-logo">
            ResQ <span>Nexus</span>
          </div>
          <nav className="nexus-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `nexus-nav-link ${isActive ? "active" : ""}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <div className="nexus-main">
          <NetworkStatusBar />
          <div className="nexus-page">
            <Outlet />
          </div>
        </div>
      </div>
    </NexusProvider>
  );
}
