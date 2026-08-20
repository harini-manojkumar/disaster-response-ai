import { Outlet } from "react-router-dom";
import { Radio } from "lucide-react";
import { BeaconProvider } from "../context/BeaconContext";

/**
 * BeaconLayout — deliberately minimal.
 * No sidebar, no login, no navigation chrome.
 * A citizen in an emergency should see the report form immediately.
 */
export default function BeaconLayout() {
  return (
    <BeaconProvider>
      <div className="min-h-screen bg-canvas flex flex-col">
        <header className="border-b border-border bg-surface px-5 py-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-control bg-navy-900 flex items-center justify-center">
            <Radio size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-ink-900 leading-none">ResQ Beacon</p>
            <p className="text-[11px] text-ink-400 leading-none mt-0.5">Emergency Reporting</p>
          </div>
        </header>

        <main className="flex-1 max-w-lg w-full mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </BeaconProvider>
  );
}
