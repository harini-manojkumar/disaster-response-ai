import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Base Leaflet wrapper shared by Nexus and Relay maps. Both apps
// compose their own markers as children, so styling and tile source
// stay centralized in one place.
export default function MapContainer({ center, zoom = 13, height = "320px", children }) {
  return (
    <div
      className="rounded-card overflow-hidden border border-navy-600"
      style={{ height }}
    >
      <LeafletMap
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        {children}
      </LeafletMap>
    </div>
  );
}
