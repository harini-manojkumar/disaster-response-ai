import { useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Circle,
  Popup,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useNexus } from "../../context/NexusContext";

// Color coding used across the whole Nexus UI — keep this in sync with
// the CSS classes in nexus.css (.badge-critical, .badge-high, etc).
const PRIORITY_COLORS = {
  critical: "#e11d48",
  high: "#f97316",
  medium: "#eab308",
  low: "#22c55e",
};

const RESPONDER_COLOR = "#2563eb";
const ZONE_COLORS = { high: "#f97316", medium: "#eab308", low: "#22c55e" };

export default function LiveMap({ height = "520px" }) {
  const {
    incidents,
    predictedZones,
    responders,
    resourceProviders,
    selectedIncidentId,
    selectIncident,
  } = useNexus();

  // Center the map on the average of all incident coordinates so it
  // frames the action automatically, wherever your city is.
  const center = useMemo(() => {
    if (incidents.length === 0) return [11.0168, 76.9558];
    const lat =
      incidents.reduce((s, i) => s + i.lat, 0) / incidents.length;
    const lng =
      incidents.reduce((s, i) => s + i.lng, 0) / incidents.length;
    return [lat, lng];
  }, [incidents]);

  return (
    <div className="nexus-map-wrapper" style={{ height }}>
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Predicted risk zones — drawn first so markers sit on top */}
        {predictedZones.map((zone) => (
          <Circle
            key={zone.id}
            center={[zone.lat, zone.lng]}
            radius={zone.radiusMeters}
            pathOptions={{
              color: ZONE_COLORS[zone.riskLevel] || "#94a3b8",
              fillOpacity: 0.12,
              weight: 1.5,
              dashArray: "6 6",
            }}
          >
            <Tooltip sticky>
              <strong>{zone.label}</strong>
              <br />
              {zone.reason}
            </Tooltip>
          </Circle>
        ))}

        {/* Incident markers */}
        {incidents.map((incident) => (
          <CircleMarker
            key={incident.id}
            center={[incident.lat, incident.lng]}
            radius={selectedIncidentId === incident.id ? 14 : 10}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: PRIORITY_COLORS[incident.priority] || "#64748b",
              fillOpacity: 0.9,
            }}
            eventHandlers={{
              click: () => selectIncident(incident.id),
            }}
          >
            <Popup>
              <div style={{ minWidth: "180px" }}>
                <strong>
                  {incident.type} — {incident.id}
                </strong>
                <p style={{ margin: "4px 0" }}>{incident.description}</p>
                <div>Priority: {incident.priority}</div>
                <div>People affected: {incident.peopleAffected}</div>
                <div>Team: {incident.assignedTeam}</div>
                <div>ETA: {incident.eta}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Responder markers */}
        {responders.map((r) => (
          <CircleMarker
            key={r.id}
            center={[r.lat, r.lng]}
            radius={7}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: RESPONDER_COLOR,
              fillOpacity: 0.85,
            }}
          >
            <Tooltip>
              {r.name} — {r.type} ({r.status})
            </Tooltip>
          </CircleMarker>
        ))}

        {/* Resource providers (hospitals, shelters, depots) */}
        {resourceProviders.map((p) => (
          <CircleMarker
            key={p.id}
            center={[p.lat, p.lng]}
            radius={6}
            pathOptions={{
              color: "#fff",
              weight: 2,
              fillColor: "#7c3aed",
              fillOpacity: 0.8,
            }}
          >
            <Tooltip>
              {p.name} ({p.type}) — {p.capacity}
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
