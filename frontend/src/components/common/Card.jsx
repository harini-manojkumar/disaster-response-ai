/**
 * Card — the base white rounded container used across the app.
 * padding: "none" | "sm" | "md" (default) | "lg"
 */
export default function Card({ children, className = "", padding = "md", onClick }) {
  const paddingMap = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      onClick={onClick}
      className={`bg-surface border border-border rounded-card shadow-soft ${paddingMap[padding]} ${
        onClick ? "cursor-pointer hover:shadow-raised transition-shadow duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
