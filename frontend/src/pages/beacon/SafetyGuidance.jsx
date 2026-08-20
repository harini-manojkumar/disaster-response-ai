import { useLocation } from "react-router-dom";
import { Droplets, Flame, Building2, Mountain, HeartPulse, ShieldAlert } from "lucide-react";
import Card from "../../components/common/Card";

const GUIDANCE = {
  Flood: {
    icon: Droplets,
    tips: [
      "Move to the highest available floor or roof.",
      "Avoid contact with flood water — it may be electrically charged or contaminated.",
      "Do not attempt to walk or drive through moving water.",
      "Keep your phone charged and visible for rescue teams.",
    ],
  },
  Fire: {
    icon: Flame,
    tips: [
      "Stay low to the ground to avoid smoke inhalation.",
      "Feel doors before opening — do not open if hot.",
      "Move to the nearest safe exit or window.",
      "If trapped, seal gaps under doors with cloth.",
    ],
  },
  "Building Collapse": {
    icon: Building2,
    tips: [
      "Stay still and avoid moving debris if trapped.",
      "Cover your mouth and nose to avoid dust.",
      "Tap on a pipe or wall to signal your location periodically.",
      "Conserve phone battery — use it only to signal or call.",
    ],
  },
  Landslide: {
    icon: Mountain,
    tips: [
      "Move away from the path of the slide, not directly downhill.",
      "Head to higher, stable ground.",
      "Watch for secondary slides in the same area.",
    ],
  },
  "Medical Emergency": {
    icon: HeartPulse,
    tips: [
      "Keep the person still and calm.",
      "Do not give food or water if they are unconscious.",
      "Note the time symptoms started — responders will ask.",
      "Keep the line open in case the ambulance team calls back.",
    ],
  },
};

const DEFAULT_TIPS = {
  icon: ShieldAlert,
  tips: [
    "Stay in a safe, visible location.",
    "Keep your phone charged and nearby.",
    "Do not attempt risky actions to help others — wait for trained responders.",
    "Update your report if the situation changes.",
  ],
};

export default function SafetyGuidance() {
  const location = useLocation();
  const disasterType = location.state?.report?.disasterType;
  const guidance = GUIDANCE[disasterType] || DEFAULT_TIPS;
  const Icon = guidance.icon;

  return (
    <div className="space-y-4 pb-10">
      <Card padding="lg">
        <div className="w-11 h-11 rounded-control bg-navy-900 flex items-center justify-center mb-3">
          <Icon size={20} className="text-white" />
        </div>
        <h2 className="text-lg font-bold text-ink-900">
          {disasterType ? `${disasterType} — Safety Guidance` : "Safety Guidance"}
        </h2>
        <p className="text-sm text-ink-400 mt-1">While your rescue team is on the way:</p>
      </Card>

      <Card padding="md">
        <ul className="space-y-3">
          {guidance.tips.map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-brand-500/10 text-brand-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <span className="text-sm text-ink-900">{tip}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
