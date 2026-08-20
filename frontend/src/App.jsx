import { Routes, Route } from "react-router-dom";

import LandingSelector from "./pages/LandingSelector";

import BeaconLayout from "./layouts/BeaconLayout";
import ReportEmergency from "./pages/beacon/ReportEmergency";
import ReportStatus from "./pages/beacon/ReportStatus";
import SafetyGuidance from "./pages/beacon/SafetyGuidance";

import NexusLayout from "./layouts/NexusLayout";
import Dashboard from "./pages/nexus/Dashboard";
import Incidents from "./pages/nexus/Incidents";
import IncidentDetail from "./pages/nexus/IncidentDetail";
import Responders from "./pages/nexus/Responders";
import Resources from "./pages/nexus/Resources";
import Analytics from "./pages/nexus/Analytics";
import Alerts from "./pages/nexus/Alerts";
import Settings from "./pages/nexus/Settings";

import RelayLayout from "./layouts/RelayLayout";
import ProviderDashboard from "./pages/relay/ProviderDashboard";
import AssignedMissions from "./pages/relay/AssignedMissions";
import TeamTracking from "./pages/relay/TeamTracking";
import ResourceManagement from "./pages/relay/ResourceManagement";

export default function App() {
  return (
    <Routes>
      {/* Entry point */}
      <Route path="/" element={<LandingSelector />} />

      {/* ResQ Beacon — citizen emergency reporting */}
      <Route path="/beacon" element={<BeaconLayout />}>
        <Route index element={<ReportEmergency />} />
        <Route path="status" element={<ReportStatus />} />
        <Route path="safety" element={<SafetyGuidance />} />
      </Route>

      {/* ResQ Nexus — Phase 4 command center */}
      <Route path="/nexus" element={<NexusLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="incidents" element={<Incidents />} />
        <Route path="incidents/:id" element={<IncidentDetail />} />
        <Route path="responders" element={<Responders />} />
        <Route path="resources" element={<Resources />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* ResQ Relay — response provider network */}
      <Route path="/relay" element={<RelayLayout />}>
        <Route index element={<ProviderDashboard />} />
        <Route path="missions" element={<AssignedMissions />} />
        <Route path="team" element={<TeamTracking />} />
        <Route path="resources" element={<ResourceManagement />} />
      </Route>
    </Routes>
  );
}