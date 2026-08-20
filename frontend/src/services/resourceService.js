// Wraps resource/inventory + team roster mock data. Same rule as
// incidentService: components never import data/* directly.
import { mockResourceInventory } from "../data/mockResourceInventory";
import { mockTeamMembers } from "../data/mockResponders";
import { currentProvider } from "../data/mockProviders";

export function getCurrentProvider() {
  return Promise.resolve(currentProvider);
}

export function getTeamMembers() {
  return Promise.resolve(mockTeamMembers);
}

export function getResourceInventory() {
  return Promise.resolve(mockResourceInventory);
}

export function updateResourceStatus(id, status) {
  const item = mockResourceInventory.find((r) => r.id === id);
  if (item) item.status = status;
  return Promise.resolve(item);
}
