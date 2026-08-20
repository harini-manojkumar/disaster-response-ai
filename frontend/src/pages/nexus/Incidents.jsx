import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useNexus } from "../../context/NexusContext";
import PriorityBadge from "../../components/nexus/PriorityBadge";

// Full sortable/filterable list of every incident, active or resolved.
export default function Incidents() {
  const { incidents } = useNexus();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const filtered =
    filter === "all" ? incidents : incidents.filter((i) => i.priority === filter);

  return (
    <div>
      <h1 className="page-title">Incidents</h1>
      <p className="page-subtitle">All reported incidents across Beacon, sensors, and manual entry.</p>

      <div style={{ marginBottom: 14, display: "flex", gap: 8 }}>
        {["all", "critical", "high", "medium", "low"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="nexus-nav-link"
            style={{
              background: filter === f ? "#1d4ed8" : "#1e293b",
              color: filter === f ? "#fff" : "#94a3b8",
              border: "1px solid #334155",
              cursor: "pointer",
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <table className="nexus-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Priority</th>
            <th>Status</th>
            <th>People</th>
            <th>Team</th>
            <th>ETA</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((inc) => (
            <tr key={inc.id}>
              <td style={{ fontFamily: "monospace" }}>{inc.id}</td>
              <td>{inc.type}</td>
              <td><PriorityBadge priority={inc.priority} /></td>
              <td>{inc.status}</td>
              <td>{inc.peopleAffected}</td>
              <td>{inc.assignedTeam}</td>
              <td>{inc.eta}</td>
              <td>
                <button
                  onClick={() => navigate(`/nexus/incidents/${inc.id}`)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#38bdf8",
                    cursor: "pointer",
                  }}
                >
                  View →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
