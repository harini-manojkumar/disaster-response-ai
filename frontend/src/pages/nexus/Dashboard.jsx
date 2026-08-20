import LiveMap from "../../components/nexus/LiveMap";
import PriorityQueue from "../../components/nexus/PriorityQueue";
import ResponderPanel from "../../components/nexus/ResponderPanel";
import AIAnalysisWidget from "../../components/nexus/AIAnalysisWidget";
import StatCard from "../../components/nexus/StatCard";
import { useIncidentStats } from "../../hooks/useIncidentStats";
import { useNexus } from "../../context/NexusContext";

// Main landing page: top-line stats, live map, priority queue, and a
// side column with responders + AI analysis of whatever's selected.
export default function Dashboard() {
  const { totalActive, critical, high, totalPeople, availableResponders, totalResponders } =
    useIncidentStats();
  const { selectedIncident } = useNexus();

  return (
    <div>
      <h1 className="page-title">Command Center</h1>
      <p className="page-subtitle">Live overview of all active incidents and response capacity.</p>

      <div className="nexus-stats-row">
        <StatCard label="Active Incidents" value={totalActive} />
        <StatCard label="Critical" value={critical} tone="critical" />
        <StatCard label="High Priority" value={high} tone="warn" />
        <StatCard
          label="People Affected"
          value={totalPeople}
          sub="across all active incidents"
        />
      </div>

      <div className="nexus-grid">
        <div className="nexus-stack">
          <LiveMap />
          <PriorityQueue />
        </div>
        <div className="nexus-stack">
          <StatCard
            label="Responders Available"
            value={`${availableResponders}/${totalResponders}`}
            tone={availableResponders > 0 ? "good" : "critical"}
          />
          <AIAnalysisWidget incident={selectedIncident} />
          <ResponderPanel compact />
        </div>
      </div>
    </div>
  );
}
