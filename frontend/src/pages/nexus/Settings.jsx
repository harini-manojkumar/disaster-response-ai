import { useNexus } from "../../context/NexusContext";

// Placeholder settings page — connect this to real config/auth later.
export default function Settings() {
  const { networkStatus } = useNexus();

  return (
    <div>
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">System configuration and connection status.</p>

      <div className="priority-queue" style={{ maxWidth: 480 }}>
        <div className="panel-header"><h3>System Health</h3></div>
        <p style={{ fontSize: 13, color: "#cbd5e1" }}>
          Overall status: <strong>{networkStatus.overallHealth}</strong>
        </p>
        <p style={{ fontSize: 13, color: "#cbd5e1" }}>
          Responders connected: {networkStatus.connectedResponders}/{networkStatus.totalResponders}
        </p>
        <p style={{ fontSize: 13, color: "#cbd5e1" }}>
          Sensors active: {networkStatus.activeSensors}/{networkStatus.totalSensors}
        </p>
        <p style={{ fontSize: 12, color: "#64748b", marginTop: 12 }}>
          This page is a placeholder — wire it up to your real backend config,
          user roles, and notification preferences when ready.
        </p>
      </div>
    </div>
  );
}
