import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  className?: string;
  size?: number;
  showScore?: boolean;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  className,
  size = 18,
  showScore = false,
}: StarRatingProps) => {
  // Sécurisation des valeurs pour éviter les erreurs de boucle
  const normalizedRating = Math.min(Math.max(rating, 0), maxRating);
  const fullStars = Math.floor(normalizedRating);
  const hasHalfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = Math.max(0, maxRating - fullStars - (hasHalfStar ? 1 : 0));

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Note de ${rating} sur ${maxRating}`}>
        {/* Étoiles pleines */}
        {(Array.from({ length: fullStars }) || []).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-yellow-400 text-yellow-400 transition-transform hover:scale-110"
          />
        ))}

        {/* Demi-étoile */}
        {hasHalfStar && (
          <div className="relative inline-block transition-transform hover:scale-110">
            <Star size={size} className="text-gray-200 fill-gray-200" />
            <div 
              className="absolute inset-0 overflow-hidden" 
              style={{ width: "50%" }}
            >
              <Star size={size} className="fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        )}

        {/* Étoiles vides */}
        {(Array.from({ length: emptyStars }) || []).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-gray-200 fill-gray-200 transition-transform hover:scale-110"
          />
        ))}
      </div>

      {showScore && (
        <span className="text-sm font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
          {normalizedRating.toFixed(1)}<span className="text-slate-400 font-medium">/{maxRating}</span>
        </span>
      )}
    </div>
  );
};