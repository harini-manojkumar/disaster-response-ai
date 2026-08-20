/**
 * Button — variants: "primary" (navy), "danger" (SOS red), "secondary" (outline), "ghost"
 * size: "md" (default) | "lg" | "sm"
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-control transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-navy-900 text-white hover:bg-navy-800",
    danger: "bg-critical text-white hover:bg-red-700",
    secondary: "bg-white text-navy-900 border border-border hover:bg-canvas",
    ghost: "bg-transparent text-ink-600 hover:bg-canvas",
  };

  const sizes = {
    sm: "text-sm px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-6 py-3.5",
  };

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon size={size === "lg" ? 20 : 16} />}
      {children}
    </button>
  );
}
