import { useNexus } from "../../context/NexusContext";

// Thin status strip shown at the top of every Nexus page — gives
// operators a quick "is the system healthy right now" glance.
export default function NetworkStatusBar() {
  const { networkStatus } = useNexus();
  const {
    connectedResponders,
    totalResponders,
    activeSensors,
    totalSensors,
    lastSyncSeconds,
    overallHealth,
  } = networkStatus;

  return (
    <div className={`network-status-bar health-${overallHealth}`}>
      <span className="network-dot" />
      <span>
        Responders online: <strong>{connectedResponders}/{totalResponders}</strong>
      </span>
      <span className="divider">|</span>
      <span>
        Sensors active: <strong>{activeSensors}/{totalSensors}</strong>
      </span>
      <span className="divider">|</span>
      <span>Synced {lastSyncSeconds}s ago</span>
    </div>
  );
}
