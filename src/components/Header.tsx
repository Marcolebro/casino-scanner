"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronRight, ShieldCheck, Star, Gift, BookOpen, Newspaper } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  {
    name: "Classement 2024",
    href: "/meilleurs-casinos",
    icon: Star,
    description: "Les meilleurs casinos testés"
  },
  {
    name: "Bonus",
    href: "/bonus",
    icon: Gift,
    description: "Offres exclusives et free spins"
  },
  {
    name: "Guides",
    href: "/guides",
    icon: BookOpen,
    description: "Stratégies et astuces de pro"
  },
  {
    name: "Actualités",
    href: "/actualites",
    icon: Newspaper,
    description: "Tendances et nouveaux jeux"
  }
]

const secondaryLinks = [
  { name: "Mentions Légales", href: "/mentions-legales" },
  { name: "Confidentialité", href: "/politique-de-confidentialite" }
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled 
          ? "bg-white/95 backdrop-blur-md py-3 border-slate-200 shadow-sm" 
          : "bg-white py-5 border-transparent"
      )}
    >
      <nav className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group"
          >
            <div className="bg-blue-600 p-1.5 rounded-lg transition-transform group-hover:scale-105">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Casino<span className="text-blue-600">Scanner</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation?.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-blue-600",
                  pathname === item.href ? "text-blue-600" : "text-slate-600"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/meilleurs-casinos"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200 active:scale-95"
            >
              Voir le Top 10
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={cn(
            "lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 transition-all duration-300 ease-in-out overflow-hidden",
            isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
          )}
        >
          <div className="p-4 space-y-4">
            <div className="grid gap-2">
              {navigation?.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-4 p-3 rounded-xl transition-colors",
                    pathname === item.href ? "bg-blue-50 text-blue-600" : "hover:bg-slate-50 text-slate-700"
                  )}
                >
                  <div className={cn(
                    "p-2 rounded-lg",
                    pathname === item.href ? "bg-blue-100" : "bg-slate-100"
                  )}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.description}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 ml-auto opacity-40" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100">
              <Link
                href="/meilleurs-casinos"
                className="flex items-center justify-center w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-100 mb-4"
              >
                Accéder au Classement 2024
              </Link>
              
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                {secondaryLinks?.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-xs text-slate-400 hover:text-slate-600"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}