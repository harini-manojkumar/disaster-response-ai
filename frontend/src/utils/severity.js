export const SEVERITY = {
  critical: {
    label: "Critical",
    text: "text-critical",
    bg: "bg-red-50",
    border: "border-red-200",
    dot: "bg-critical",
    hex: "#DC2626",
  },
  high: {
    label: "High",
    text: "text-high",
    bg: "bg-orange-50",
    border: "border-orange-200",
    dot: "bg-high",
    hex: "#EA580C",
  },
  medium: {
    label: "Medium",
    text: "text-medium",
    bg: "bg-amber-50",
    border: "border-amber-200",
    dot: "bg-medium",
    hex: "#D97706",
  },
  low: {
    label: "Low",
    text: "text-low",
    bg: "bg-green-50",
    border: "border-green-200",
    dot: "bg-low",
    hex: "#16A34A",
  },
};

export function getSeverity(level) {
  return SEVERITY[level] || SEVERITY.medium;
}

export function getStatusMeta(status) {
  const map = {
    available: {
      label: "Available",
      text: "text-low",
      bg: "bg-green-50",
      border: "border-green-200",
      dot: "bg-low",
    },
    active: {
      label: "Active",
      text: "text-high",
      bg: "bg-orange-50",
      border: "border-orange-200",
      dot: "bg-high",
    },
    busy: {
      label: "Busy",
      text: "text-high",
      bg: "bg-orange-50",
      border: "border-orange-200",
      dot: "bg-high",
    },
    offline: {
      label: "Offline",
      text: "text-ink-400",
      bg: "bg-slate-50",
      border: "border-border",
      dot: "bg-slate-400",
    },
  };

  return map[status] || map.offline;
}