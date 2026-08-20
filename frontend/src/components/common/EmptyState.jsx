// Shown when a list has nothing to display. Per your interface-voice
// guidance: explain the state plainly, treat it as an invitation, not
// a dead end.
export default function EmptyState({ icon: Icon, title, description }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-14 px-6 border border-dashed border-navy-600 rounded-card">
      {Icon && (
        <div className="w-11 h-11 rounded-full bg-navy-700 flex items-center justify-center mb-3">
          <Icon size={20} className="text-slate-400" />
        </div>
      )}
      <div className="text-sm font-semibold text-slate-200">{title}</div>
      {description && (
        <p className="text-xs text-slate-500 mt-1 max-w-xs">{description}</p>
      )}
    </div>
  );
}
