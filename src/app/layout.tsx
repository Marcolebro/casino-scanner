import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Zap, BookOpen, Newspaper, Trophy, Gift, Info, Lock } from "lucide-react"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "Casino Scanner - Comparatif des Meilleurs Casinos en Ligne",
    template: "%s | Casino Scanner"
  },
  description: "Découvrez les meilleures plateformes de casino type Stake, nos avis d'experts et les bonus d'inscription les plus avantageux pour jouer en toute sécurité.",
  keywords: ["casino en ligne", "meilleurs bonus casino", "avis casino", "comparatif casino", "stake", "guides casino"],
  authors: [{ name: "Casino Scanner Team" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
}

interface NavLinkProps {
  href: string
  children: React.ReactNode
  icon?: React.ReactNode
}

export function NavLink({ href, children, icon }: NavLinkProps) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-blue-600"
    >
      {icon}
      <span>{children}</span>
    </Link>
  )
}

export function Header() {
  const navLinks = [
    { href: "/meilleurs-casinos", label: "Classement 2024", icon: <Trophy className="h-4 w-4" /> },
    { href: "/bonus", label: "Meilleurs Bonus", icon: <Gift className="h-4 w-4" /> },
    { href: "/guides", label: "Guides & Stratégies", icon: <BookOpen className="h-4 w-4" /> },
    { href: "/actualites", label: "Actualités", icon: <Newspaper className="h-4 w-4" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            Casino<span className="text-blue-600">Scanner</span>
          </span>
        </Link>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {(navLinks || []).map((link) => (
            <NavLink key={link.href} href={link.href} icon={link.icon}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/meilleurs-casinos"
            className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg md:block"
          >
            Voir le Top 10
          </Link>
          <button className="block p-2 text-slate-600 md:hidden" aria-label="Menu">
            <Zap className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  )
}

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-bold text-slate-900">CasinoScanner</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500">
              Votre guide de confiance pour naviguer dans l'univers des casinos en ligne. Nous analysons, testons et comparons les plateformes pour votre sécurité.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/meilleurs-casinos" className="text-sm text-slate-500 hover:text-blue-600">Classement 2024</Link></li>
              <li><Link href="/bonus" className="text-sm text-slate-500 hover:text-blue-600">Bonus de Bienvenue</Link></li>
              <li><Link href="/guides" className="text-sm text-slate-500 hover:text-blue-600">Guides Pratiques</Link></li>
              <li><Link href="/actualites" className="text-sm text-slate-500 hover:text-blue-600">Actualités Gambling</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Informations</h3>
            <ul className="space-y-2">
              <li><Link href="/mentions-legales" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"><Info className="h-3 w-3" /> Mentions Légales</Link></li>
              <li><Link href="/politique-de-confidentialite" className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600"><Lock className="h-3 w-3" /> Confidentialité</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-900">Jeu Responsable</h3>
            <p className="text-xs leading-relaxed text-slate-400">
              Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le 09 74 75 13 13 (appel non surtaxé). Interdit aux moins de 18 ans.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-slate-100 pt-8 text-center">
          <p className="text-sm text-slate-400">
            © {currentYear} Casino Scanner. Tous droits réservés. Le contenu de ce site est purement informatif.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} scroll-smooth`}>
      <body className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900">
        <Header />
        <main className="relative flex min-h-[calc(100vh-64px)] flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

export default RootLayout;