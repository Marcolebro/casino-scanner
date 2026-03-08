import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'
import { cn } from "@/lib/utils"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Accueil",
        "item": "https://casino-scanner.com"
      },
      ...(items || []).map((item, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": item.label,
        "item": item.href ? `https://casino-scanner.com${item.href}` : undefined
      }))
    ]
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className={cn("flex mb-6 overflow-x-auto no-scrollbar py-1", className)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ol className="flex items-center space-x-2 text-sm text-slate-500 whitespace-nowrap">
        <li className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center hover:text-blue-600 transition-colors"
            title="Retour à l'accueil"
          >
            <Home className="w-4 h-4" />
            <span className="sr-only">Accueil</span>
          </Link>
        </li>

        {(items || []).map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
              {isLast || !item.href ? (
                <span 
                  className={cn(
                    "font-medium",
                    isLast ? "text-slate-900" : "text-slate-500"
                  )}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}