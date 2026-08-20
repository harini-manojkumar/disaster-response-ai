import { useEffect, useState } from "react";

/**
 * useOfflineQueue — tracks whether the browser currently has a network
 * connection, and how many reports are "queued" waiting to sync.
 * Real offline support (service workers, local storage queue) can replace
 * the internals later without changing how components use this hook.
 */
export function useOfflineQueue() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedCount, setQueuedCount] = useState(0);

  useEffect(() => {
    function goOnline() {
      setIsOnline(true);
    }
    function goOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  function queueReport() {
    setQueuedCount((c) => c + 1);
  }

  return { isOnline, queuedCount, queueReport };
}
