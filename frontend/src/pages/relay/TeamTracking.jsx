import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { getTeamMembers } from "../../services/resourceService";
import MapContainer from "../../components/map/MapContainer";
import ResponderMarker from "../../components/map/ResponderMarker";
import MapLegend from "../../components/map/MapLegend";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import EmptyState from "../../components/common/EmptyState";

const LEGEND_ITEMS = [
  { label: "Available", color: "#22c55e" },
  { label: "En Route", color: "#3b82f6" },
  { label: "Off Duty", color: "#64748b" },
];

// Live map + roster of this provider's own team members — distinct
// from Nexus's citywide responder map, this is scoped to "my people."
export default function TeamTracking() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTeamMembers().then((data) => {
      setTeam(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="text-sm text-slate-500">Loading…</div>;

  const center = team.length
    ? [team[0].lat, team[0].lng]
    : [11.0168, 76.9558];

  return (
    <div className="space-y-5">
      <h1 className="text-lg font-bold text-slate-100">Team Tracking</h1>

      <div>
        <MapContainer center={center} height="360px">
          {team.map((member) => (
            <ResponderMarker key={member.id} responder={member} />
          ))}
        </MapContainer>
        <MapLegend items={LEGEND_ITEMS} />
      </div>

      <div className="space-y-2.5">
        {team.length === 0 ? (
          <EmptyState icon={Users} title="No team members on record" />
        ) : (
          team.map((member) => (
            <Card key={member.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-100">{member.name}</div>
                <div className="text-xs text-slate-500">{member.role}</div>
              </div>
              <Badge status={member.status} />
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
