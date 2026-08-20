import { motion } from "framer-motion";
import { MapPin, Users, Clock } from "lucide-react";
import Badge from "../common/Badge";
import Card from "../common/Card";
import { formatEta } from "../../utils/formatters";

// One mission in the Relay provider's assigned list. This is Relay's
// view model of an incident — reshaped from Nexus's incident object
// by services/incidentService.js, not the same shape as Nexus uses.
export default function MissionCard({ mission, onOpen }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Card onClick={() => onOpen(mission)} className="space-y-2.5">
        <div className="flex items-center justify-between">
          <Badge severity={mission.priority} />
          <Badge status={mission.status} />
        </div>
        <div className="text-sm font-semibold text-slate-100">{mission.type}</div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <MapPin size={13} />
          {mission.address}
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 border-t border-navy-600">
          <span className="flex items-center gap-1">
            <Users size={12} /> {mission.peopleAffected}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {formatEta(mission.etaMinutes)}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}
