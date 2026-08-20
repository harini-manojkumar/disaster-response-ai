// Simple controlled tab bar — used for status filters (Active/Queued/Resolved).
export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex gap-1 bg-navy-800 border border-navy-600 rounded-card p-1 w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-[14px] transition-colors ${
            active === tab.value
              ? "bg-accent text-white"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          {tab.label}
          {typeof tab.count === "number" && (
            <span className="ml-1.5 opacity-70">{tab.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
