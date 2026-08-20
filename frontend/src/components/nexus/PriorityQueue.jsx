import { useNavigate } from "react-router-dom";
import { useIncidentStats } from "../../hooks/useIncidentStats";
import IncidentCard from "./IncidentCard";

// The sorted list of incidents, highest priority first — this is the
// "what needs attention right now" panel on the Dashboard.
export default function PriorityQueue() {
  const { sortedByPriority } = useIncidentStats();
  const navigate = useNavigate();

  return (
    <div className="priority-queue">
      <div className="panel-header">
        <h3>Priority Queue</h3>
        <span className="panel-subtext">{sortedByPriority.length} incidents</span>
      </div>
      <div className="priority-queue-list">
        {sortedByPriority.map((incident) => (
          <IncidentCard
            key={incident.id}
            incident={incident}
            onOpenDetail={(id) => navigate(`/nexus/incidents/${id}`)}
          />
        ))}
      </div>
    </div>
  );
}
