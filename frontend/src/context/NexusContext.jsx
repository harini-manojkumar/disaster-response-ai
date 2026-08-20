import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  mockIncidents,
  mockPredictedZones,
  mockResponders,
  mockResourceProviders,
  mockNetworkStatus,
} from "../data/mockNexusData";

// NexusContext is the shared "brain" for the whole command center.
// Every Nexus page reads from here instead of holding its own copy of the data,
// so an update (e.g. selecting an incident) is instantly visible everywhere.

const NexusContext = createContext(null);

export function NexusProvider({ children }) {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [predictedZones] = useState(mockPredictedZones);
  const [responders, setResponders] = useState(mockResponders);
  const [resourceProviders] = useState(mockResourceProviders);
  const [networkStatus, setNetworkStatus] = useState(mockNetworkStatus);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);

  // Simulates a live feed by nudging the "last sync" counter down.
  // Swap this out for a real WebSocket / polling call to your backend later.
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStatus((prev) => ({
        ...prev,
        lastSyncSeconds: Math.floor(Math.random() * 8) + 1,
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const selectIncident = useCallback((id) => setSelectedIncidentId(id), []);

  const updateIncidentStatus = useCallback((id, status) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === id ? { ...inc, status } : inc))
    );
  }, []);

  const assignResponder = useCallback((incidentId, responderId) => {
    setResponders((prev) =>
      prev.map((r) =>
        r.id === responderId ? { ...r, incidentId, status: "dispatched" } : r
      )
    );
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              assignedTeam:
                prev.find((r) => r.id === responderId)?.name || inc.assignedTeam,
            }
          : inc
      )
    );
  }, []);

  // Add a brand-new incident, e.g. one pushed in live from Beacon.
  const addIncident = useCallback((incident) => {
    setIncidents((prev) => [incident, ...prev]);
  }, []);

  const selectedIncident =
    incidents.find((inc) => inc.id === selectedIncidentId) || null;

  const value = {
    incidents,
    predictedZones,
    responders,
    resourceProviders,
    networkStatus,
    selectedIncidentId,
    selectedIncident,
    selectIncident,
    updateIncidentStatus,
    assignResponder,
    addIncident,
  };

  return (
    <NexusContext.Provider value={value}>{children}</NexusContext.Provider>
  );
}

export function useNexus() {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error("useNexus must be used inside a <NexusProvider>");
  }
  return ctx;
}
