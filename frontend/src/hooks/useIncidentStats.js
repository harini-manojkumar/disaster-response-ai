import { useMemo } from "react";
import { useNexus } from "../context/NexusContext";
import { priorityWeight } from "../data/mockNexusData";

// Small derived-data hook: takes the raw incident list from context
// and computes the numbers the dashboard cards need, so pages don't
// each re-implement the same counting/sorting logic.
export function useIncidentStats() {
  const { incidents, responders } = useNexus();

  return useMemo(() => {
    const active = incidents.filter((i) => i.status !== "resolved");
    const critical = incidents.filter((i) => i.priority === "critical").length;
    const high = incidents.filter((i) => i.priority === "high").length;
    const totalPeople = incidents.reduce((sum, i) => sum + i.peopleAffected, 0);
    const availableResponders = responders.filter(
      (r) => r.status === "available"
    ).length;

    const sortedByPriority = [...incidents].sort(
      (a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]
    );

    return {
      totalActive: active.length,
      critical,
      high,
      totalPeople,
      availableResponders,
      totalResponders: responders.length,
      sortedByPriority,
    };
  }, [incidents, responders]);
}
