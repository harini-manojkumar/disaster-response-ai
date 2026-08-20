import { useMemo } from "react";
import { useNexus } from "../../context/NexusContext";
import StatCard from "../../components/nexus/StatCard";

// Aggregate numbers useful for after-action review / reporting.
export default function Analytics() {
  const { incidents } = useNexus();

  const byType = useMemo(() => {
    const counts = {};
    incidents.forEach((i) => {
      counts[i.type] = (counts[i.type] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [incidents]);

  const avgConfidence = useMemo(() => {
    if (incidents.length === 0) return 0;
    return (
      incidents.reduce((sum, i) => sum + i.aiConfidence, 0) / incidents.length
    );
  }, [incidents]);

  return (
    <div>
      <h1 className="page-title">Analytics</h1>
      <p className="page-subtitle">Aggregate patterns across all reported incidents.</p>

      <div className="nexus-stats-row">
        <StatCard label="Total Incidents" value={incidents.length} />
        <StatCard
          label="Avg AI Confidence"
          value={`${Math.round(avgConfidence * 100)}%`}
        />
        <StatCard
          label="Most Common Type"
          value={byType[0]?.[0] || "—"}
        />
        <StatCard
          label="Distinct Incident Types"
          value={byType.length}
        />
      </div>

      <table className="nexus-table">
        <thead>
          <tr>
            <th>Incident Type</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {byType.map(([type, count]) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
