// Mock data for ResQ Nexus command center.
// Replace these with real API calls once your backend is ready.
// Coordinates below are centered around a sample city for demo purposes —
// swap in your own city's lat/lng if you want the map to feel local.

export const mockIncidents = [
  {
    id: "INC-1001",
    type: "Flood",
    priority: "critical",
    status: "active",
    lat: 11.0168,
    lng: 76.9558,
    peopleAffected: 42,
    reportedAt: "2026-08-20T05:12:00Z",
    source: "Beacon SOS",
    description: "Water rising fast near riverside colony, several families trapped on rooftops.",
    aiConfidence: 0.94,
    assignedTeam: "Team Alpha-3",
    eta: "8 min",
  },
  {
    id: "INC-1002",
    type: "Building Collapse",
    priority: "critical",
    status: "active",
    lat: 11.0041,
    lng: 76.9615,
    peopleAffected: 15,
    reportedAt: "2026-08-20T05:20:00Z",
    source: "Beacon Report",
    description: "Partial collapse of a 3-story residential building after heavy rain.",
    aiConfidence: 0.89,
    assignedTeam: "Team Bravo-1",
    eta: "12 min",
  },
  {
    id: "INC-1003",
    type: "Medical Emergency",
    priority: "high",
    status: "en-route",
    lat: 11.0271,
    lng: 76.9412,
    peopleAffected: 3,
    reportedAt: "2026-08-20T05:31:00Z",
    source: "Beacon SOS",
    description: "Elderly residents stranded without medication access, one requires insulin.",
    aiConfidence: 0.81,
    assignedTeam: "Team Charlie-2",
    eta: "5 min",
  },
  {
    id: "INC-1004",
    type: "Fire",
    priority: "medium",
    status: "monitoring",
    lat: 10.995,
    lng: 76.975,
    peopleAffected: 0,
    reportedAt: "2026-08-20T04:58:00Z",
    source: "Sensor Network",
    description: "Small electrical fire reported, contained by local response, monitoring for flare-up.",
    aiConfidence: 0.67,
    assignedTeam: "Unassigned",
    eta: "-",
  },
  {
    id: "INC-1005",
    type: "Landslide",
    priority: "high",
    status: "active",
    lat: 11.035,
    lng: 76.985,
    peopleAffected: 8,
    reportedAt: "2026-08-20T05:40:00Z",
    source: "Beacon Report",
    description: "Hillside road blocked, two vehicles reported buried, access road compromised.",
    aiConfidence: 0.86,
    assignedTeam: "Team Delta-1",
    eta: "18 min",
  },
];

export const mockPredictedZones = [
  {
    id: "ZONE-1",
    label: "High flood risk — next 6h",
    lat: 11.02,
    lng: 76.95,
    radiusMeters: 1800,
    riskLevel: "high",
    reason: "Rainfall trend + river level sensors + historical flood pattern",
  },
  {
    id: "ZONE-2",
    label: "Moderate landslide risk — next 12h",
    lat: 11.04,
    lng: 76.99,
    radiusMeters: 1200,
    riskLevel: "medium",
    reason: "Soil saturation levels rising on slopes above 20 degrees",
  },
];

export const mockResponders = [
  { id: "R-01", name: "Team Alpha-3", type: "Water Rescue", lat: 11.012, lng: 76.95, status: "en-route", incidentId: "INC-1001" },
  { id: "R-02", name: "Team Bravo-1", type: "Structural / USAR", lat: 11.0, lng: 76.958, status: "en-route", incidentId: "INC-1002" },
  { id: "R-03", name: "Team Charlie-2", type: "Medical", lat: 11.025, lng: 76.945, status: "en-route", incidentId: "INC-1003" },
  { id: "R-04", name: "Team Delta-1", type: "Landslide / Heavy Equipment", lat: 11.03, lng: 76.98, status: "dispatched", incidentId: "INC-1005" },
  { id: "R-05", name: "Team Echo-4", type: "General Response", lat: 11.008, lng: 76.965, status: "available", incidentId: null },
  { id: "R-06", name: "Team Foxtrot-2", type: "Medical", lat: 11.018, lng: 76.972, status: "available", incidentId: null },
];

export const mockResourceProviders = [
  { id: "P-01", name: "City General Hospital", type: "Medical", lat: 11.015, lng: 76.96, capacity: "62/80 beds", status: "available" },
  { id: "P-02", name: "Community Relief Shelter — Ward 4", type: "Shelter", lat: 11.02, lng: 76.94, capacity: "120/300 spots", status: "available" },
  { id: "P-03", name: "District Fire & Rescue HQ", type: "Fire/Rescue", lat: 11.005, lng: 76.97, capacity: "6/10 units", status: "limited" },
  { id: "P-04", name: "Red Cross Supply Depot", type: "Supplies", lat: 11.03, lng: 76.965, capacity: "Stocked", status: "available" },
];

export const mockNetworkStatus = {
  connectedResponders: 18,
  totalResponders: 24,
  activeSensors: 142,
  totalSensors: 150,
  lastSyncSeconds: 4,
  overallHealth: "good",
};

export const priorityWeight = { critical: 3, high: 2, medium: 1, low: 0 };
