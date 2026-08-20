/**
 * LiveIndicator — a small pulsing dot + label, e.g. "Live" or "Connected"
 */
export default function LiveIndicator({ label = "Live", active = true }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex h-2 w-2">
        {active && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-low opacity-75" />
        )}
        <span
          className={`relative inline-flex rounded-full h-2 w-2 ${active ? "bg-low" : "bg-ink-400"}`}
        />
      </span>
      <span className="text-xs font-medium text-ink-600">{label}</span>
    </div>
  );
}
