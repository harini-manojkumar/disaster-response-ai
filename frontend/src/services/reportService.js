// ── reportService ───────────────────────────────────────────────
// Today: generates a realistic mock AI response locally.
// Later: replace submitReport's body with a POST to the real backend,
// which will run the actual urgency/credibility/matching models.
// -------------------------------------------------------------------

const PROVIDERS_BY_TYPE = {
  Flood: { team: "Coimbatore Water Rescue Unit 2", eta: "11 minutes" },
  Fire: { team: "Fire & Rescue Station 4", eta: "8 minutes" },
  "Building Collapse": { team: "Search & Rescue Team Alpha", eta: "13 minutes" },
  Landslide: { team: "Disaster Response Unit 1", eta: "20 minutes" },
  "Medical Emergency": { team: "City Ambulance Services", eta: "7 minutes" },
  "Road Accident": { team: "Traffic Response Unit", eta: "9 minutes" },
  "Storm Damage": { team: "Rapid Assessment Team", eta: "16 minutes" },
  "Water Rescue": { team: "Coimbatore Water Rescue Unit 1", eta: "10 minutes" },
};

function computePriority(form) {
  let score = 30;
  if (form.trapped) score += 30;
  if (form.medicalEmergency) score += 25;
  if (form.vulnerable.children > 0 || form.vulnerable.elderly > 0) score += 15;
  if (form.peopleAffected > 5) score += 10;
  if (form.isSOS) score += 20;

  if (score >= 75) return "critical";
  if (score >= 55) return "high";
  if (score >= 35) return "medium";
  return "low";
}

export async function submitReport(form) {
  // simulate network + AI processing latency
  await new Promise((r) => setTimeout(r, 900));

  const priority = computePriority(form);
  const providerInfo = PROVIDERS_BY_TYPE[form.disasterType] || {
    team: "General Response Unit",
    eta: "15 minutes",
  };

  return {
    id: `INC-${Math.floor(2000 + Math.random() * 900)}`,
    ...form,
    priority,
    status: "AI Analyzed",
    credibilityScore: form.coords ? 82 : 61,
    assignedTeam: providerInfo.team,
    eta: providerInfo.eta,
    submittedAt: new Date().toISOString(),
  };
}
