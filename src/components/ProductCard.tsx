import Link from "next/link";
import Image from "next/image";
import { ExternalLink, ArrowRight, Check, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Product {
  id: string;
  name: string;
  slug: string;
  affiliate_slug: string;
  logo: string;
  rating: number;
  bonus_text: string;
  bonus_secondary?: string;
  tags?: string[];
  pros?: string[];
  is_featured?: boolean;
  badge_text?: string;
}

interface ProductCardProps {
  product: Product;
  rank?: number;
}

export const ProductCard = ({ product, rank }: ProductCardProps) => {
  if (!product) return null;

  const {
    name,
    slug,
    affiliate_slug,
    logo,
    rating,
    bonus_text,
    bonus_secondary,
    tags,
    pros,
    is_featured,
    badge_text,
  } = product;

  return (
    <div className={cn(
      "relative flex flex-col md:flex-row items-center gap-6 p-5 md:p-6 bg-white dark:bg-slate-900 border rounded-2xl transition-all duration-300 hover:shadow-2xl group",
      is_featured 
        ? "border-blue-500 ring-1 ring-blue-500/20 shadow-blue-500/5" 
        : "border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600"
    )}>
      {/* Badge Flottant */}
      {(badge_text || is_featured) && (
        <div className="absolute -top-3 left-6 px-4 py-1 bg-blue-600 text-white text-[11px] font-black uppercase tracking-wider rounded-full shadow-lg z-10">
          {badge_text || "Meilleur Choix"}
        </div>
      )}

      {/* Classement (Rank) */}
      {rank !== undefined && (
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 hidden xl:flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 text-white font-bold text-lg border-4 border-white dark:border-slate-900 shadow-md">
          {rank}
        </div>
      )}

      {/* Logo Section */}
      <div className="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center p-4 group-hover:bg-white dark:group-hover:bg-slate-800/50 transition-colors">
        <Image
          src={logo || "/placeholder-casino.png"}
          alt={`Logo ${name}`}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 128px, 160px"
        />
      </div>

      {/* Info Section */}
      <div className="flex-grow flex flex-col gap-3 text-center md:text-left">
        <div>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
            {name}
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={cn(
                  "fill-current",
                  i < Math.floor(rating || 0) ? "text-yellow-400" : "text-slate-200 dark:text-slate-700"
                )}
              />
            ))}
            <span className="ml-2 text-sm font-bold text-slate-500">
              {(rating || 0).toFixed(1)}/5
            </span>
          </div>
        </div>

        {/* Bonus Highlight Box */}
        <div className="inline-block bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-xl p-4">
          <p className="text-emerald-700 dark:text-emerald-400 font-black text-xl leading-none mb-1">
            {bonus_text}
          </p>
          {bonus_secondary && (
            <p className="text-emerald-600/80 dark:text-emerald-400/80 text-xs font-bold uppercase tracking-wide">
              {bonus_secondary}
            </p>
          )}
        </div>

        {/* Points Forts (Pros) */}
        <div className="hidden lg:grid grid-cols-2 gap-x-4 gap-y-1">
          {(pros || []).slice(0, 4).map((pro, index) => (
            <div key={index} className="flex items-center gap-2 text-[13px] text-slate-600 dark:text-slate-400">
              <Check size={14} className="text-emerald-500 flex-shrink-0" />
              <span className="truncate">{pro}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col w-full md:w-64 gap-3">
        <Link
          href={`/go/${affiliate_slug}`}
          target="_blank"
          rel="nofollow sponsored"
          className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1 active:translate-y-0"
        >
          VISITER LE SITE
          <ExternalLink size={18} />
        </Link>
        
        <Link
          href={`/avis/${slug}`}
          className="flex items-center justify-center gap-2 w-full py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-colors text-sm"
        >
          NOTRE AVIS COMPLET
          <ArrowRight size={16} />
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mt-1">
          {(tags || []).slice(0, 3).map((tag) => (
            <span 
              key={tag} 
              className="px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800 text-[10px] font-bold text-slate-400 border border-slate-100 dark:border-slate-700 uppercase tracking-tighter"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};