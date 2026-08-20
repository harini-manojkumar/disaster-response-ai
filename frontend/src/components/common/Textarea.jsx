export default function Textarea({ label, ...props }) {
  return (
    <label className="block">
      {label && <span className="text-sm font-medium text-ink-900 mb-1.5 block">{label}</span>}
      <textarea
        className="w-full rounded-control border border-border bg-surface px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 resize-none"
        rows={4}
        {...props}
      />
    </label>
  );
}
