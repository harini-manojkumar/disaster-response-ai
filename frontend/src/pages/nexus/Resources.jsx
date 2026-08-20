import ResourcePanel from "../../components/nexus/ResourcePanel";
import LiveMap from "../../components/nexus/LiveMap";

// Hospitals, shelters, fire HQs, and supply depots — capacity at a glance.
export default function Resources() {
  return (
    <div>
      <h1 className="page-title">Resources</h1>
      <p className="page-subtitle">Capacity and availability across hospitals, shelters, and supply points.</p>
      <div className="nexus-grid">
        <LiveMap height="500px" />
        <ResourcePanel />
      </div>
    </div>
  );
}
