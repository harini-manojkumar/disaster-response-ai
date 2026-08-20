import { CircleMarker, Tooltip } from "react-leaflet";
import { getStatusMeta } from "../../utils/severity";

const STATUS_DOT_COLOR = {
  available: "#22c55e",
  dispatched: "#eab308",
  "en-route": "#3b82f6",
  "on-scene": "#22c55e",
  "off-duty": "#64748b",
};

// A responder/team's live position on the map, color-coded by status.
export default function ResponderMarker({ responder }) {
  const color = STATUS_DOT_COLOR[responder.status] || "#64748b";
  const meta = getStatusMeta(responder.status);

  return (
    <CircleMarker
      center={[responder.lat, responder.lng]}
      radius={8}
      pathOptions={{ color: "#fff", weight: 2, fillColor: color, fillOpacity: 0.9 }}
    >
      <Tooltip>
        {responder.name} — {meta.label}
      </Tooltip>
    </CircleMarker>
  );
}
