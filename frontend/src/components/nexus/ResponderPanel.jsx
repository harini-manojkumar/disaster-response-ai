import { useNexus } from "../../context/NexusContext";

const STATUS_LABELS = {
  available: "Available",
  dispatched: "Dispatched",
  "en-route": "En Route",
};

// List of all response teams with their current status — used on the
// Dashboard side panel and the full Responders page.
export default function ResponderPanel({ compact = false }) {
  const { responders, incidents } = useNexus();
  const list = compact ? responders.slice(0, 5) : responders;

  return (
    <div className="responder-panel">
      <div className="panel-header">
        <h3>Response Teams</h3>
        <span className="panel-subtext">{responders.length} total</span>
      </div>
      <div className="responder-list">
        {list.map((r) => {
          const incident = incidents.find((i) => i.id === r.incidentId);
          return (
            <div key={r.id} className="responder-row">
              <div className={`status-dot status-${r.status}`} />
              <div className="responder-info">
                <div className="responder-name">{r.name}</div>
                <div className="responder-type">{r.type}</div>
              </div>
              <div className="responder-status-col">
                <div className="responder-status-label">
                  {STATUS_LABELS[r.status] || r.status}
                </div>
                {incident && (
                  <div className="responder-assigned-to">→ {incident.id}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
