import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { getResourceInventory, updateResourceStatus } from "../../services/resourceService";
import ResourceCard from "../../components/resources/ResourceCard";
import EmptyState from "../../components/common/EmptyState";

// Equipment/supplies this provider tracks — vehicles, medical kits,
// rescue gear, consumables. Status can be nudged directly from here
// (e.g. marking something "limited" once stock runs low).
export default function ResourceManagement() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResourceInventory().then((data) => {
      setResources(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-sm text-slate-500">Loading…</div>;

  return (
    <div className="space-y-5">
      <h1 className="text-lg font-bold text-slate-100">Resource Management</h1>

      {resources.length === 0 ? (
        <EmptyState icon={Package} title="No resources tracked yet" />
      ) : (
        <div className="space-y-2.5">
          {resources.map((r) => (
            <ResourceCard key={r.id} resource={r} />
          ))}
        </div>
      )}
    </div>
  );
}
