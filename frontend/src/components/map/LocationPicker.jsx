import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Leaflet's default marker icons are broken by bundlers unless we
// point them at the right assets manually.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ClickToSetMarker({ onPick }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

/**
 * LocationPicker — tap anywhere on the map to set your location.
 * Falls back center: Coimbatore, since that's this deployment's region.
 */
export default function LocationPicker({ coords, onChange, height = "220px" }) {
  const center = coords || { lat: 11.0168, lng: 76.9558 };

  return (
    <div style={{ height }} className="rounded-control overflow-hidden border border-border">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={14}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickToSetMarker onPick={onChange} />
        {coords && <Marker position={[coords.lat, coords.lng]} icon={markerIcon} />}
      </MapContainer>
    </div>
  );
}
