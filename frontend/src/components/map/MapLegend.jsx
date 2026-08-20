// Small legend explaining marker colors — kept generic so both Nexus
// and Relay maps can reuse it with their own item list.
export default function MapLegend({ items }) {
  return (
    <div className="flex flex-wrap gap-3 mt-2 text-[11px] text-slate-400">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          {item.label}
        </div>
      ))}
    </div>
  );
}
