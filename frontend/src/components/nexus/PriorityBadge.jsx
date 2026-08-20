// Renders a small colored pill for an incident's priority level.
// Reused everywhere an incident is listed (queue, detail page, cards).
export default function PriorityBadge({ priority }) {
  return <span className={`badge badge-${priority}`}>{priority}</span>;
}
