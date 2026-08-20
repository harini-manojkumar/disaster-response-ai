/**
 * Toggle — a labeled on/off switch, e.g. "Medical Emergency" / "Trapped"
 */
export default function Toggle({ label, description, checked, onChange, tone = "critical" }) {
  const toneMap = {
    critical: "bg-critical",
    brand: "bg-brand-500",
  };

  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-control border transition-colors ${
        checked ? "border-critical/30 bg-red-50" : "border-border bg-surface"
      }`}
    >
      <div className="text-left">
        <p className="text-sm font-semibold text-ink-900">{label}</p>
        {description && <p className="text-xs text-ink-400 mt-0.5">{description}</p>}
      </div>
      <span
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          checked ? toneMap[tone] : "bg-slate-200"
        }`}
      >
        <span
          className={`inline-block h-4.5 w-4.5 h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </span>
    </button>
  );
}
