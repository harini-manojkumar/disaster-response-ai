// Displays the AI's read on an incident: confidence score, priority
// reasoning, and suggested next action. Purely presentational —
// swap the `incident.aiConfidence` field for a real model output later.
export default function AIAnalysisWidget({ incident }) {
  if (!incident) {
    return (
      <div className="ai-widget ai-widget-empty">
        Select an incident to see AI analysis.
      </div>
    );
  }

  const confidencePct = Math.round(incident.aiConfidence * 100);

  return (
    <div className="ai-widget">
      <div className="ai-widget-header">
        <span className="ai-dot" />
        AI Analysis — {incident.id}
      </div>
      <div className="ai-confidence-row">
        <span>Confidence</span>
        <div className="ai-confidence-bar">
          <div
            className="ai-confidence-fill"
            style={{ width: `${confidencePct}%` }}
          />
        </div>
        <span>{confidencePct}%</span>
      </div>
      <ul className="ai-notes">
        <li>Classified as <strong>{incident.type}</strong> from report text/imagery signals.</li>
        <li>Priority set to <strong>{incident.priority}</strong> based on people affected ({incident.peopleAffected}) and severity keywords.</li>
        <li>Nearest capable responder: <strong>{incident.assignedTeam}</strong>, ETA {incident.eta}.</li>
      </ul>
    </div>
  );
}
