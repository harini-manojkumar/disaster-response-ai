import PriorityBadge from "./PriorityBadge";
import { useNexus } from "../../context/NexusContext";

// A single incident row shown inside the Priority Queue list.
// Clicking it selects the incident so the map + detail panel can highlight it.
export default function IncidentCard({ incident, onOpenDetail }) {
  const { selectIncident, selectedIncidentId } = useNexus();
  const isSelected = selectedIncidentId === incident.id;

  return (
    <div
      className={`incident-card ${isSelected ? "incident-card-selected" : ""}`}
      onClick={() => selectIncident(incident.id)}
    >
      <div className="incident-card-top">
        <span className="incident-id">{incident.id}</span>
        <PriorityBadge priority={incident.priority} />
      </div>
      <div className="incident-type">{incident.type}</div>
      <div className="incident-meta">
        <span>{incident.peopleAffected} affected</span>
        <span>&middot;</span>
        <span>{incident.status}</span>
        <span>&middot;</span>
        <span>ETA {incident.eta}</span>
      </div>
      <div className="incident-desc">{incident.description}</div>
      <button
        className="incident-detail-btn"
        onClick={(e) => {
          e.stopPropagation();
          onOpenDetail?.(incident.id);
        }}
      >
        View details →
      </button>
    </div>
  );
}
