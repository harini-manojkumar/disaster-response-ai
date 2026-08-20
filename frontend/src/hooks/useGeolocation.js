import { useState } from "react";

/**
 * useGeolocation — wraps the browser's built-in GPS API.
 * Call requestLocation() from a button tap (browsers require a user
 * gesture before showing the permission prompt).
 */
export function useGeolocation() {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | locating | success | error
  const [error, setError] = useState(null);

  function requestLocation() {
    if (!navigator.geolocation) {
      setStatus("error");
      setError("Location is not supported on this device.");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("success");
      },
      (err) => {
        setStatus("error");
        setError(err.message || "Could not get your location.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return { coords, status, error, requestLocation, setCoords };
}
