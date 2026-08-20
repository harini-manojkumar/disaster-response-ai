import { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { CheckCircle2, Circle, Clock, ShieldCheck, ArrowRight, Radio } from "lucide-react";
import Card from "../../components/common/Card";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";

const AI_STEPS = [
  "Report received",
  "Language & content analyzed",
  "Urgency classified",
  "Nearest response team matched",
];

export default function ReportStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const report = location.state?.report;

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!report) return;
    if (stepIndex >= AI_STEPS.length) return;
    const t = setTimeout(() => setStepIndex((s) => s + 1), 700);
    return () => clearTimeout(t);
  }, [stepIndex, report]);

  if (!report) {
    return (
      <Card padding="lg" className="text-center">
        <p className="text-sm font-semibold text-ink-900">No active report</p>
        <p className="text-xs text-ink-400 mt-1 mb-4">
          You haven't submitted a report yet in this session.
        </p>
        <Button variant="primary" onClick={() => navigate("/beacon")}>
          Go to report screen
        </Button>
      </Card>
    );
  }

  const done = stepIndex >= AI_STEPS.length;

  return (
    <div className="space-y-5 pb-10">
      <Card padding="lg">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide">
            Report {report.id}
          </p>
          {done && <Badge severity={report.priority} />}
        </div>
        <h2 className="text-lg font-bold text-ink-900">
          {report.isSOS ? "SOS Alert Sent" : report.disasterType || "Report Submitted"}
        </h2>
        <p className="text-xs text-ink-400 mt-1">
          Submitted {new Date(report.submittedAt).toLocaleTimeString()}
        </p>
      </Card>

      {/* AI processing animation */}
      <Card padding="md">
        <p className="text-xs font-semibold text-ink-400 uppercase tracking-wide mb-3">
          AI Analysis
        </p>
        <div className="space-y-3">
          {AI_STEPS.map((step, idx) => {
            const complete = idx < stepIndex;
            const active = idx === stepIndex;
            return (
              <div key={step} className="flex items-center gap-2.5">
                {complete ? (
                  <CheckCircle2 size={17} className="text-low shrink-0" />
                ) : active ? (
                  <span className="relative flex h-4 w-4 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-60" />
                    <Circle size={17} className="text-brand-500 relative" />
                  </span>
                ) : (
                  <Circle size={17} className="text-ink-400/40 shrink-0" />
                )}
                <span className={`text-sm ${complete || active ? "text-ink-900 font-medium" : "text-ink-400"}`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Result: priority + assigned team */}
      {done && (
        <>
          <Card padding="md" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-navy-900 flex items-center justify-center shrink-0">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink-900">{report.assignedTeam}</p>
              <p className="text-xs text-ink-400">has been assigned to your report</p>
            </div>
          </Card>

          <Card padding="md" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-control bg-brand-500/10 flex items-center justify-center shrink-0">
              <Clock size={18} className="text-brand-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-ink-900">Estimated arrival: {report.eta}</p>
              <p className="text-xs text-ink-400">Stay in a safe, visible location if possible</p>
            </div>
          </Card>

          <Link
            to="/beacon/safety"
            className="flex items-center justify-between bg-navy-900 text-white rounded-card px-5 py-4"
          >
            <div className="flex items-center gap-2.5">
              <Radio size={17} />
              <span className="text-sm font-semibold">View safety guidance while you wait</span>
            </div>
            <ArrowRight size={16} />
          </Link>
        </>
      )}
    </div>
  );
}
