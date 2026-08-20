import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Siren,
  MapPin,
  Mic,
  Square,
  Image as ImageIcon,
  X,
  Users,
  ChevronDown,
  ChevronUp,
  WifiOff,
} from "lucide-react";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Badge from "../../components/common/Badge";
import Textarea from "../../components/common/Textarea";
import Toggle from "../../components/common/Toggle";
import LocationPicker from "../../components/map/LocationPicker";
import { DISASTER_TYPES } from "../../utils/constants";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useOfflineQueue } from "../../hooks/useOfflineQueue";
import { useBeacon } from "../../context/BeaconContext";

const initialForm = {
  disasterType: "",
  textReport: "",
  voiceNoteRecorded: false,
  images: [],
  coords: null,
  peopleAffected: 1,
  vulnerable: { children: 0, elderly: 0 },
  medicalEmergency: false,
  trapped: false,
  isSOS: false,
};

export default function ReportEmergency() {
  const navigate = useNavigate();
  const { submit, submitting } = useBeacon();
  const { isOnline, queueReport } = useOfflineQueue();
  const geo = useGeolocation();

  const [form, setForm] = useState(initialForm);
  const [showDetails, setShowDetails] = useState(false);
  const [recording, setRecording] = useState(false);

  function update(patch) {
    setForm((f) => ({ ...f, ...patch }));
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files || []).slice(0, 3);
    const previews = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    update({ images: [...form.images, ...previews].slice(0, 3) });
  }

  function removeImage(idx) {
    update({ images: form.images.filter((_, i) => i !== idx) });
  }

  function toggleRecording() {
    if (recording) {
      setRecording(false);
      update({ voiceNoteRecorded: true });
    } else {
      setRecording(true);
      setTimeout(() => {
        setRecording(false);
        update({ voiceNoteRecorded: true });
      }, 3000);
    }
  }

  async function handleSubmit(isSOS = false) {
    const payload = {
      ...form,
      isSOS,
      coords: form.coords || geo.coords,
      disasterType: form.disasterType || (isSOS ? "Medical Emergency" : form.disasterType),
    };

    if (!isOnline) queueReport();

    const result = await submit(payload);
    navigate("/beacon/status", { state: { report: result } });
  }

  return (
    <div className="space-y-5 pb-10">
      {!isOnline && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium rounded-control px-3 py-2">
          <WifiOff size={14} />
          You're offline. Your report will be queued and sent automatically once connected.
        </div>
      )}

      <Card padding="lg" className="text-center border-critical/20">
        <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">
          In immediate danger?
        </p>
        <button
          onClick={() => handleSubmit(true)}
          disabled={submitting}
          className="w-40 h-40 mx-auto rounded-full bg-critical text-white flex flex-col items-center justify-center gap-1.5 shadow-raised active:scale-95 transition-transform disabled:opacity-60"
        >
          <Siren size={34} />
          <span className="text-lg font-bold">SEND SOS</span>
        </button>
        <p className="text-xs text-ink-400 mt-4">
          Sends your location instantly. Add details below if you can.
        </p>
      </Card>

      <Card padding="none">
        <button
          onClick={() => setShowDetails((s) => !s)}
          className="w-full flex items-center justify-between px-5 py-4"
        >
          <span className="text-sm font-semibold text-ink-900">Add report details</span>
          {showDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showDetails && (
          <div className="px-5 pb-5 space-y-5 border-t border-border pt-5">
            <div>
              <p className="text-sm font-medium text-ink-900 mb-2">What's happening?</p>
              <div className="grid grid-cols-2 gap-2">
                {DISASTER_TYPES.map((type) => (
                  <button
                    key={type}
                    onClick={() => update({ disasterType: type })}
                    className={`px-3 py-2.5 rounded-control text-sm font-medium border text-left transition-colors ${
                      form.disasterType === type
                        ? "bg-navy-900 text-white border-navy-900"
                        : "bg-surface text-ink-600 border-border hover:bg-canvas"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <Textarea
              label="Describe the situation"
              placeholder="e.g. water entering ground floor, 3 people including a child, need boat"
              value={form.textReport}
              onChange={(e) => update({ textReport: e.target.value })}
            />

            <div>
              <p className="text-sm font-medium text-ink-900 mb-2">Voice report</p>
              <button
                onClick={toggleRecording}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-control border text-sm font-semibold transition-colors ${
                  recording
                    ? "bg-red-50 border-critical/30 text-critical"
                    : form.voiceNoteRecorded
                    ? "bg-green-50 border-low/30 text-low"
                    : "bg-surface border-border text-ink-600"
                }`}
              >
                {recording ? (
                  <>
                    <Square size={15} /> Recording... tap to stop
                  </>
                ) : form.voiceNoteRecorded ? (
                  <>
                    <Mic size={15} /> Voice note recorded
                  </>
                ) : (
                  <>
                    <Mic size={15} /> Tap to record
                  </>
                )}
              </button>
            </div>

            <div>
              <p className="text-sm font-medium text-ink-900 mb-2">Photos (optional)</p>
              <div className="flex gap-2 flex-wrap">
                {form.images.map((img, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-control overflow-hidden border border-border">
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 text-white flex items-center justify-center"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
                {form.images.length < 3 && (
                  <label className="w-16 h-16 rounded-control border border-dashed border-border flex items-center justify-center cursor-pointer text-ink-400 hover:text-ink-600">
                    <ImageIcon size={18} />
                    <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
                  </label>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-ink-900">Location</p>
                <button
                  onClick={geo.requestLocation}
                  className="flex items-center gap-1 text-xs font-semibold text-brand-500"
                >
                  <MapPin size={13} />
                  {geo.status === "locating" ? "Locating..." : "Use my GPS location"}
                </button>
              </div>
              <LocationPicker
                coords={form.coords || geo.coords}
                onChange={(c) => update({ coords: c })}
              />
              <p className="text-xs text-ink-400 mt-1.5">Tap the map to adjust your pin.</p>
            </div>

            <div>
              <p className="text-sm font-medium text-ink-900 mb-2 flex items-center gap-1.5">
                <Users size={14} /> Number of people affected
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => update({ peopleAffected: Math.max(1, form.peopleAffected - 1) })}
                  className="w-9 h-9 rounded-control border border-border font-bold text-ink-600"
                >
                  −
                </button>
                <span className="text-lg font-bold w-8 text-center">{form.peopleAffected}</span>
                <button
                  onClick={() => update({ peopleAffected: form.peopleAffected + 1 })}
                  className="w-9 h-9 rounded-control border border-border font-bold text-ink-600"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-medium text-ink-600 mb-1.5">Children</p>
                <input
                  type="number"
                  min={0}
                  value={form.vulnerable.children}
                  onChange={(e) =>
                    update({ vulnerable: { ...form.vulnerable, children: Number(e.target.value) } })
                  }
                  className="w-full rounded-control border border-border px-3 py-2 text-sm"
                />
              </div>
              <div>
                <p className="text-xs font-medium text-ink-600 mb-1.5">Elderly</p>
                <input
                  type="number"
                  min={0}
                  value={form.vulnerable.elderly}
                  onChange={(e) =>
                    update({ vulnerable: { ...form.vulnerable, elderly: Number(e.target.value) } })
                  }
                  className="w-full rounded-control border border-border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Toggle
                label="Medical emergency"
                description="Someone needs urgent medical attention"
                checked={form.medicalEmergency}
                onChange={(v) => update({ medicalEmergency: v })}
              />
              <Toggle
                label="Trapped / unable to move"
                description="Someone is physically trapped or stuck"
                checked={form.trapped}
                onChange={(v) => update({ trapped: v })}
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => handleSubmit(false)}
              disabled={submitting || !form.disasterType}
            >
              {submitting ? "Submitting..." : "Submit report"}
            </Button>
            {!form.disasterType && (
              <p className="text-xs text-ink-400 text-center -mt-3">
                Select what's happening above to submit.
              </p>
            )}
          </div>
        )}
      </Card>

      <div className="text-center">
        <Badge tone="bg-slate-50 text-ink-400 border-border">
          All reports are analyzed by AI within seconds
        </Badge>
      </div>
    </div>
  );
}
