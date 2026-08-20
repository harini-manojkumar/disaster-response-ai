import Card from "./Card";

/**
 * StatCard — a KPI tile for dashboards, e.g. "Critical Incidents: 7"
 */
export default function StatCard({ label, value, icon: Icon, tone = "navy", trend }) {
  const toneMap = {
    navy: "bg-navy-900 text-white",
    critical: "bg-red-50 text-critical",
    high: "bg-orange-50 text-high",
    brand: "bg-brand-500/10 text-brand-600",
  };

  return (
    <Card padding="md" className="flex items-start justify-between">
      <div>
        <p className="text-xs font-medium text-ink-400 uppercase tracking-wide mb-2">{label}</p>
        <p className="text-3xl font-bold text-ink-900">{value}</p>
        {trend && <p className="text-xs text-ink-400 mt-1">{trend}</p>}
      </div>
      {Icon && (
        <div className={`p-2.5 rounded-control ${toneMap[tone]}`}>
          <Icon size={20} />
        </div>
      )}
    </Card>
  );
}
