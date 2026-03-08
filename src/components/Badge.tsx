import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "accent" | "warning" | "danger" | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge = ({
  children,
  variant = "neutral",
  size = "md",
  className,
}: BadgeProps) => {
  const variantStyles = {
    primary: "bg-blue-50 text-blue-700 border-blue-200/50",
    accent: "bg-emerald-50 text-emerald-700 border-emerald-200/50",
    warning: "bg-amber-50 text-amber-700 border-amber-200/50",
    danger: "bg-red-50 text-red-700 border-red-200/50",
    neutral: "bg-slate-100 text-slate-600 border-slate-200/50",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
    md: "px-2.5 py-1 text-xs font-semibold",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border transition-all duration-200",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};