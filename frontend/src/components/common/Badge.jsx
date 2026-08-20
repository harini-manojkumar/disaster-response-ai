import { getSeverity } from "../../utils/severity";

/**
 * Badge — a small colored pill.
 * Two modes:
 *  - severity="critical" | "high" | "medium" | "low"  -> auto-colored
 *  - or pass your own `tone` classes for neutral badges
 */
export default function Badge({ children, severity, tone }) {
  if (severity) {
    const s = getSeverity(severity);
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${s.bg} ${s.text} ${s.border}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
        {s.label}
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
        tone || "bg-slate-50 text-ink-600 border-border"
      }`}
    >
      {children}
    </span>
  );
}
