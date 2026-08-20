import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Navigation2, AlertTriangle } from "lucide-react";
import { useMissions } from "../../hooks/useMissions";
import Tabs from "../../components/common/Tabs";
import MissionCard from "../../components/resources/MissionCard";
import Modal from "../../components/common/Modal";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";
import { MISSION_STATUSES } from "../../utils/constants";
import { formatEta } from "../../utils/formatters";

// Full mission list with status filter tabs. Tapping a card opens
// a detail modal (map + safety notes + status control) rather than
// navigating to a new route — keeps Relay at 4 top-level pages.
export default function AssignedMissions() {
  const { missions, setStatus, loading } = useMissions();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  if (loading) return <div className="text-sm text-slate-500">Loading…</div>;

  const filtered =
    filter === "all" ? missions : missions.filter((m) => m.status === filter);

  const tabs = [
    { value: "all", label: "All", count: missions.length },
    { value: "active", label: "Active", count: missions.filter((m) => m.status === "active").length },
    { value: "queued", label: "Queued", count: missions.filter((m) => m.status === "queued").length },
    { value: "resolved", label: "Resolved", count: missions.filter((m) => m.status === "resolved").length },
  ];

  const mapsUrl = selected
    ? `https://www.google.com/maps/search/?api=1&query=${selected.lat},${selected.lng}`
    : "#";

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-lg font-bold text-slate-100">Assigned Missions</h1>
        <Tabs tabs={tabs} active={filter} onChange={setFilter} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={AlertTriangle}
          title="No missions in this view"
          description="Try a different filter, or check back once Nexus dispatches a new mission."
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-3">
          <AnimatePresence>
            {filtered.map((m) => (
              <MissionCard key={m.id} mission={m} onOpen={setSelected} />
            ))}
          </AnimatePresence>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.type}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge severity={selected.priority} />
              <Badge status={selected.status} />
            </div>
            <div className="flex items-center gap-1.5 text-sm text-slate-300">
              <MapPin size={14} /> {selected.address}
            </div>
            <p className="text-sm text-slate-400">{selected.description}</p>
            <p className="text-xs text-slate-500">
              {selected.peopleAffected} people affected · ETA {formatEta(selected.etaMinutes)}
            </p>

            {selected.safetyNotes?.length > 0 && (
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-1.5">Safety Notes</div>
                <ul className="space-y-1 text-xs text-critical list-disc list-inside">
                  {selected.safetyNotes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            <a href={mapsUrl} target="_blank" rel="noreferrer" className="block">
              <Button variant="secondary" size="lg">
                <Navigation2 size={15} /> Open Navigation
              </Button>
            </a>

            <div>
              <div className="text-xs font-semibold text-slate-300 mb-1.5">Update Status</div>
              <div className="flex flex-wrap gap-2">
                {MISSION_STATUSES.map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatus(selected.id, s)}
                    className={`text-xs px-3 py-1.5 rounded-full border capitalize transition-colors ${
                      selected.status === s
                        ? "bg-accent text-white border-accent"
                        : "border-navy-500 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
