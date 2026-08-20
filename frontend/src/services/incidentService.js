import { mockIncidents } from "../data/mockIncidents";
import { mockMissions } from "../data/mockMissions";

export async function getIncidents() {
  await new Promise((r) => setTimeout(r, 200));
  return mockIncidents;
}

export async function getIncidentById(id) {
  await new Promise((r) => setTimeout(r, 150));
  return mockIncidents.find((i) => i.id === id) || null;
}

export async function getMissionsForProvider() {
  await new Promise((r) => setTimeout(r, 200));
  return mockMissions;
}

export async function updateMissionStatus(id, status) {
  await new Promise((r) => setTimeout(r, 150));

  const mission = mockMissions.find((m) => m.id === id);

  if (!mission) {
    return { id, status };
  }

  return {
    ...mission,
    status,
  };
}