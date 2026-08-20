import { Link } from "react-router-dom";
import { Radio, ShieldHalf, Truck, ArrowRight } from "lucide-react";

const APPS = [
  {
    to: "/beacon",
    icon: Radio,
    name: "ResQ Beacon",
    tag: "For Citizens",
    desc: "Report an emergency in seconds. No sign-up required.",
    tone: "bg-critical",
  },
  {
    to: "/nexus",
    icon: ShieldHalf,
    name: "ResQ Nexus",
    tag: "For Command Authorities",
    desc: "AI-powered disaster intelligence and coordination workspace.",
    tone: "bg-navy-900",
  },
  {
    to: "/relay",
    icon: Truck,
    name: "ResQ Relay",
    tag: "For Response Providers",
    desc: "Receive missions, track teams, manage resources.",
    tone: "bg-brand-500",
  },
];

export default function LandingSelector() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center px-6">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-widest text-brand-500 uppercase mb-2">
          ResQNet
        </p>
        <h1 className="text-3xl font-bold text-ink-900">Understand. Predict. Respond.</h1>
        <p className="text-ink-400 mt-2 max-w-md">
          AI-powered disaster response coordination platform.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 max-w-4xl w-full">
        {APPS.map(({ to, icon: Icon, name, tag, desc, tone }) => (
          <Link
            key={to}
            to={to}
            className="group bg-surface border border-border rounded-card shadow-soft hover:shadow-raised transition-shadow p-6 flex flex-col"
          >
            <div className={`w-10 h-10 rounded-control ${tone} flex items-center justify-center mb-4`}>
              <Icon size={19} className="text-white" />
            </div>
            <p className="text-[11px] font-semibold text-ink-400 uppercase tracking-wide">{tag}</p>
            <p className="text-lg font-bold text-ink-900 mt-1">{name}</p>
            <p className="text-sm text-ink-600 mt-2 flex-1">{desc}</p>
            <div className="flex items-center gap-1 text-sm font-semibold text-navy-900 mt-4 group-hover:gap-2 transition-all">
              Open <ArrowRight size={15} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
