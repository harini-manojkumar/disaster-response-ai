import { useNexus } from "../../context/NexusContext";

// Predicted risk zones surfaced as an actionable alert feed —
// separate from live incidents, this is the "what might happen next" view.
export default function Alerts() {
  const { predictedZones } = useNexus();

  return (
    <div>
      <h1 className="page-title">Predictive Alerts</h1>
      <p className="page-subtitle">AI-predicted risk zones based on sensor and weather trends.</p>

      <div className="nexus-stack">
        {predictedZones.map((zone) => (
          <div key={zone.id} className="priority-queue">
            <div className="panel-header">
              <h3>{zone.label}</h3>
              <span className={`badge badge-${zone.riskLevel === "high" ? "critical" : "medium"}`}>
                {zone.riskLevel} risk
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#cbd5e1" }}>{zone.reason}</p>
            <p style={{ fontSize: 12, color: "#64748b" }}>
              Center: {zone.lat.toFixed(4)}, {zone.lng.toFixed(4)} — radius {zone.radiusMeters}m
            </p>
          </div>
        ))}
        {predictedZones.length === 0 && (
          <p style={{ color: "#64748b" }}>No active predictive alerts.</p>
        )}
      </div>
    </div>
  );
}
