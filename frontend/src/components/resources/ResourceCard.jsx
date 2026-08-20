import Card from "../common/Card";
import Badge from "../common/Badge";

// A single resource line (vehicle, medical kit, supply stock) with
// quantity and availability — used on the Resource Management page.
export default function ResourceCard({ resource, onUpdate }) {
  return (
    <Card className="flex items-center justify-between">
      <div>
        <div className="text-sm font-semibold text-slate-100">{resource.name}</div>
        <div className="text-xs text-slate-500">{resource.type}</div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-slate-400">{resource.quantityLabel}</span>
        <Badge status={resource.status} />
      </div>
    </Card>
  );
}
