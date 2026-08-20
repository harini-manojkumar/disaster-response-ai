// Missions assigned to the current provider. Shaped like Nexus's
// incidents but with fields Relay actually needs on the ground
// (address, etaMinutes, safetyNotes) rather than Nexus's AI-analysis fields.
export const mockMissions = [
  {
    id: "INC-1001",
    type: "Flood",
    priority: "critical",
    status: "active",
    lat: 11.0168,
    lng: 76.9558,
    address: "Riverside Colony, 4th Cross Street",
    peopleAffected: 42,
    reportedAt: "2026-08-20T05:12:00Z",
    etaMinutes: 8,
    description:
      "Water rising fast near riverside colony, several families trapped on rooftops.",
    safetyNotes: [
      "Strong current reported near the bridge — approach from the north road.",
      "At least 2 elderly residents among those trapped, may need assisted evacuation.",
      "Power lines down near the colony entrance — avoid standing water there.",
    ],
  },
  {
    id: "INC-1006",
    type: "Flood",
    priority: "medium",
    status: "queued",
    lat: 11.021,
    lng: 76.952,
    address: "Lakeview Apartments, Block C",
    peopleAffected: 6,
    reportedAt: "2026-08-20T05:50:00Z",
    etaMinutes: null,
    description:
      "Ground floor flooding, residents moved to upper floors but requesting evacuation.",
    safetyNotes: ["Basement parking is fully submerged — do not enter."],
  },
  {
    id: "INC-0994",
    type: "Flood",
    priority: "low",
    status: "resolved",
    lat: 11.009,
    lng: 76.961,
    address: "Market Street Underpass",
    peopleAffected: 0,
    reportedAt: "2026-08-20T02:40:00Z",
    etaMinutes: null,
    description: "Minor waterlogging, cleared after drainage was manually opened.",
    safetyNotes: [],
  },
];
