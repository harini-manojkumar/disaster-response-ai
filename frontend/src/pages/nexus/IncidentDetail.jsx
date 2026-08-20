import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useNexus } from "../../context/NexusContext";
import PriorityBadge from "../../components/nexus/PriorityBadge";
import AIAnalysisWidget from "../../components/nexus/AIAnalysisWidget";
import LiveMap from "../../components/nexus/LiveMap";

// Deep-dive view for a single incident: full description, AI analysis,
// map focused on it, and controls to update status or assign a team.
export default function IncidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    incidents,
    responders,
    selectIncident,
    updateIncidentStatus,
    assignResponder,
  } = useNexus();

  const incident = incidents.find((i) => i.id === id);

  useEffect(() => {
    if (id) selectIncident(id);
  }, [id, selectIncident]);

  if (!incident) {
    return (
      <div>
        <p className="page-subtitle">Incident {id} not found.</p>
        <button onClick={() => navigate("/nexus/incidents")}>← Back to Incidents</button>
      </div>
    );
  }

  const availableResponders = responders.filter((r) => r.status === "available");

  return (
    <div>
      <button
        onClick={() => navigate("/nexus/incidents")}
        style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", marginBottom: 10 }}
      >
        ← Back to Incidents
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <h1 className="page-title" style={{ margin: 0 }}>
          {incident.type} — {incident.id}
        </h1>
        <PriorityBadge priority={incident.priority} />
      </div>
      <p className="page-subtitle">{incident.description}</p>

      <div className="nexus-grid">
        <div className="nexus-stack">
          <LiveMap height="380px" />
        </div>
        <div className="nexus-stack">
          <AIAnalysisWidget incident={incident} />

          <div className="priority-queue">
            <div className="panel-header"><h3>Update Status</h3></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["active", "en-route", "monitoring", "resolved"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateIncidentStatus(incident.id, s)}
                  style={{
                    padding: "6px 12px",
                    borderRadius: 8,
                    border: "1px solid #334155",
                    background: incident.status === s ? "#1d4ed8" : "#0f172a",
                    color: incident.status === s ? "#fff" : "#94a3b8",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="responder-panel">
            <div className="panel-header"><h3>Assign a Team</h3></div>
            {availableResponders.length === 0 ? (
              <p style={{ fontSize: 12, color: "#64748b" }}>No available responders right now.</p>
            ) : (
              <div className="responder-list">
                {availableResponders.map((r) => (
                  <div key={r.id} className="responder-row">
                    <div className="responder-info">
                      <div className="responder-name">{r.name}</div>
                      <div className="responder-type">{r.type}</div>
                    </div>
                    <button
                      onClick={() => assignResponder(incident.id, r.id)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: 6,
                        border: "1px solid #334155",
                        background: "#0f172a",
                        color: "#38bdf8",
                        cursor: "pointer",
                        fontSize: 11,
                      }}
                    >
                      Assign
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
