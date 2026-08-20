// Small reusable stat tile used across the Dashboard and Analytics pages.
export default function StatCard({ label, value, tone = "default", sub }) {
  return (
    <div className={`nexus-stat-card tone-${tone}`}>
      <div className="nexus-stat-value">{value}</div>
      <div className="nexus-stat-label">{label}</div>
      {sub && <div className="nexus-stat-sub">{sub}</div>}
    </div>
  );
}
