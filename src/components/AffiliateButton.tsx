import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  slug: string;
  label?: string;
  variant?: "primary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  showIcon?: boolean;
  fullWidth?: boolean;
}

export const AffiliateButton = ({
  slug,
  label = "Voir l'offre",
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
  fullWidth = false,
}: AffiliateButtonProps) => {
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20",
    accent: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700",
  };

  const sizeStyles = {
    sm: "px-4 py-2 text-sm font-semibold",
    md: "px-6 py-3 text-base font-bold",
    lg: "px-8 py-4 text-lg font-extrabold uppercase tracking-tight",
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <Link
      href={`/go/${slug}`}
      target="_blank"
      rel="nofollow sponsored"
      className={cn(
        "group inline-flex items-center justify-center rounded-xl transition-all duration-300 ease-out active:scale-[0.97]",
        fullWidth ? "w-full" : "w-fit",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      <span className="relative z-10">{label}</span>
      {showIcon && (
        <ExternalLink
          className={cn(
            "ml-2 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            iconSizes[size]
          )}
        />
      )}
    </Link>
  );
};