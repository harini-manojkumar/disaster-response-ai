import { useState, useEffect, useCallback } from "react";
import { getMissionsForProvider, updateMissionStatus } from "../services/incidentService";
import { getCurrentProvider } from "../services/resourceService";

// Relay pages call this hook instead of touching services/ directly
// from inside components — keeps data-fetching + local state together.
export function useMissions() {
  const [missions, setMissions] = useState([]);
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMissionsForProvider(), getCurrentProvider()]).then(
      ([m, p]) => {
        setMissions(m);
        setProvider(p);
        setLoading(false);
      }
    );
  }, []);

  const setStatus = useCallback(async (id, status) => {
    const updated = await updateMissionStatus(id, status);
    setMissions((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  }, []);

  return { missions, provider, loading, setStatus };
}
