import { useNexus } from "../../context/NexusContext";

// Hospitals, shelters, fire/rescue HQs, supply depots — anything that
// isn't a mobile responder but is relevant to allocating aid.
export default function ResourcePanel() {
  const { resourceProviders } = useNexus();

  return (
    <div className="resource-panel">
      <div className="panel-header">
        <h3>Resource Providers</h3>
        <span className="panel-subtext">{resourceProviders.length} sites</span>
      </div>
      <div className="resource-list">
        {resourceProviders.map((p) => (
          <div key={p.id} className="resource-row">
            <div className="resource-info">
              <div className="resource-name">{p.name}</div>
              <div className="resource-type">{p.type}</div>
            </div>
            <div className="resource-capacity">
              <span className={`badge-status status-${p.status}`}>
                {p.capacity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
