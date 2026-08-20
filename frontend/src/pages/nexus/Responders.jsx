import ResponderPanel from "../../components/nexus/ResponderPanel";
import LiveMap from "../../components/nexus/LiveMap";

// Full responder roster + a map showing where every team currently is.
export default function Responders() {
  return (
    <div>
      <h1 className="page-title">Response Teams</h1>
      <p className="page-subtitle">Live locations and status of every responder unit.</p>
      <div className="nexus-grid">
        <LiveMap height="500px" />
        <ResponderPanel />
      </div>
    </div>
  );
}
