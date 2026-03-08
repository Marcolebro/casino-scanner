import Link from "next/image"
import LinkNext from "next/link"
import { Calendar, ArrowRight, User } from "lucide-react"
import { cn, formatDate } from "@/lib/utils"
import type { ArticleMeta } from "@/lib/articles"

interface ArticleCardProps {
  article: ArticleMeta
  className?: string
}

export const ArticleCard = ({ article, className }: ArticleCardProps) => {
  if (!article) return null

  const {
    title,
    date,
    category,
    meta_description,
    author,
    image,
    slug
  } = article

  return (
    <article 
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900",
        className
      )}
    >
      {/* Image Container */}
      <LinkNext 
        href={`/article/${slug}`}
        className="relative aspect-video overflow-hidden"
      >
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800">
            <span className="text-slate-400">Casino Scanner</span>
          </div>
        )}
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
              {category}
            </span>
          </div>
        )}
      </LinkNext>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          {date && (
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={date}>{formatDate(date)}</time>
            </div>
          )}
          {author && (
            <div className="flex items-center gap-1">
              <User className="h-3.5 w-3.5" />
              <span>{author}</span>
            </div>
          )}
        </div>

        <LinkNext href={`/article/${slug}`} className="group-hover:text-blue-600 transition-colors">
          <h3 className="mb-3 line-clamp-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            {title}
          </h3>
        </LinkNext>

        <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {meta_description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
          <LinkNext 
            href={`/article/${slug}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition-colors hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Lire l'article
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </LinkNext>
        </div>
      </div>
    </article>
  )
}