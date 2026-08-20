import { useNavigate } from "react-router-dom";
import { AlertTriangle, Users, Package, Navigation } from "lucide-react";
import { useMissions } from "../../hooks/useMissions";
import StatCard from "../../components/common/StatCard";
import MissionCard from "../../components/resources/MissionCard";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import EmptyState from "../../components/common/EmptyState";

// Landing page: provider profile, top-line stats, and the single most
// urgent mission front and center — the thing a responder needs to
// see in the first two seconds of opening the app.
export default function ProviderDashboard() {
  const { missions, provider, loading } = useMissions();
  const navigate = useNavigate();

  if (loading) return <div className="text-sm text-slate-500">Loading…</div>;

  const active = missions.filter((m) => m.status !== "resolved");
  const critical = missions.filter((m) => m.priority === "critical").length;
  const priorityMission =
    missions.find((m) => m.status === "active") ||
    missions.find((m) => m.status === "queued") ||
    null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-100">{provider.name}</h1>
          <p className="text-xs text-slate-500">{provider.capability} · {provider.members} members · {provider.vehicle}</p>
        </div>
        <Badge status={provider.status} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <StatCard label="Active Missions" value={active.length} icon={AlertTriangle} />
        <StatCard label="Critical" value={critical} icon={AlertTriangle} tone="text-critical" />
        <StatCard label="Team Members" value={provider.members} icon={Users} />
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-300 mb-3">Priority Mission</h2>
        {priorityMission ? (
          <MissionCard mission={priorityMission} onOpen={() => navigate("/relay/missions")} />
        ) : (
          <EmptyState
            icon={Package}
            title="No active mission right now"
            description="Nexus will push a new mission here the moment one comes in."
          />
        )}
      </div>

      <Card className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Navigation size={16} className="text-accent" />
          View all missions and team status
        </div>
        <button
          onClick={() => navigate("/relay/missions")}
          className="text-xs font-semibold text-accent"
        >
          Open Missions →
        </button>
      </Card>
    </div>
  );
}
