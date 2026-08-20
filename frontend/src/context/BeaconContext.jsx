import { createContext, useContext, useState } from "react";
import { submitReport } from "../services/reportService";

const BeaconContext = createContext(null);

/**
 * BeaconProvider — holds the citizen's in-progress / most recent report
 * so the Report page and the Status page can share it without a backend.
 * Later, ReportStatus can instead poll a real API by report ID.
 */
export function BeaconProvider({ children }) {
  const [currentReport, setCurrentReport] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function submit(formData) {
    setSubmitting(true);
    const result = await submitReport(formData);
    setCurrentReport(result);
    setSubmitting(false);
    return result;
  }

  return (
    <BeaconContext.Provider value={{ currentReport, submitting, submit }}>
      {children}
    </BeaconContext.Provider>
  );
}

export function useBeacon() {
  const ctx = useContext(BeaconContext);
  if (!ctx) throw new Error("useBeacon must be used inside BeaconProvider");
  return ctx;
}
