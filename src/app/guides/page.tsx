import { Metadata } from "next"
import { getAllArticles } from "@/lib/articles"
import { ArticleCard } from "@/components/ArticleCard"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Newsletter } from "@/components/Newsletter"
import { BookOpen, GraduationCap, Target, Wallet, ChevronRight } from "lucide-react"

export const metadata: Metadata = {
  title: "Guides & Stratégies Casino : Apprenez à jouer comme un Pro | Casino Scanner",
  description: "Découvrez nos guides complets sur la roulette, le blackjack et la gestion de bankroll. Optimisez vos chances de gains avec nos stratégies d'experts.",
  openGraph: {
    title: "Guides & Stratégies Casino | Casino Scanner",
    description: "Apprenez les meilleures stratégies de casino en ligne pour maximiser vos gains.",
    type: "website",
  },
}

interface CategoryFilterProps {
  categories: string[]
  activeCategory?: string
}

function CategoryFilters({ categories }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <button className="px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium transition-colors hover:bg-blue-700">
        Tous les guides
      </button>
      {categories?.map((category) => (
        <button
          key={category}
          className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-slate-600 font-medium transition-all hover:border-blue-400 hover:text-blue-600 shadow-sm"
        >
          {category}
        </button>
      ))}
    </div>
  )
}

function ArticleGrid({ articles }: { articles: any[] }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
        <p className="text-slate-500 font-medium">Aucun guide disponible pour le moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}

export async function GuidesPage() {
  const allArticles = await getAllArticles()
  
  // Filtrer uniquement les articles de type guides ou stratégies
  const guides = allArticles?.filter(article => 
    article.category?.toLowerCase().includes("guide") || 
    article.category?.toLowerCase().includes("stratégie") ||
    article.tags?.some((t: string) => t.toLowerCase().includes("stratégie"))
  ) || []

  const categories = Array.from(new Set(guides.map(a => a.category))).filter(Boolean) as string[]

  const featuredGuides = [
    {
      title: "Stratégies Roulette",
      desc: "De la Martingale au système d'Alembert, maîtrisez le tapis.",
      icon: <Target className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50"
    },
    {
      title: "Blackjack Master",
      desc: "Apprenez le tableau des probabilités et réduisez l'avantage de la banque.",
      icon: <GraduationCap className="w-6 h-6 text-emerald-600" />,
      color: "bg-emerald-50"
    },
    {
      title: "Gestion de Bankroll",
      desc: "La règle d'or pour jouer longtemps et ne jamais se mettre en danger.",
      icon: <Wallet className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-50"
    }
  ]

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative bg-slate-900 pt-16 pb-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Guides & Stratégies", href: "/guides" }
            ]} 
          />
          
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Apprenez à jouer comme <span className="text-blue-400">un professionnel</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Le casino n'est pas qu'une question de chance. Découvrez les systèmes mathématiques, 
              les probabilités et les astuces de gestion qui séparent les amateurs des joueurs avertis.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Quick Links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((item, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-xl border border-slate-100 flex items-start gap-4 hover:translate-y-[-4px] transition-transform cursor-pointer">
              <div className={`p-3 rounded-lg ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 ml-auto self-center" />
            </div>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Bibliothèque de Guides</h2>
            <p className="text-slate-600">Explorez nos articles détaillés par catégorie.</p>
          </div>
        </div>

        <CategoryFilters categories={categories} />
        
        <ArticleGrid articles={guides} />
      </section>

      {/* Strategy Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-3xl p-8 md:p-12 overflow-hidden relative">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold mb-6 border border-blue-500/30">
                Conseil d'Expert
              </span>
              <h2 className="text-3xl font-bold text-white mb-6">La règle des 1% : Gérez votre Bankroll</h2>
              <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
                La stratégie la plus efficace au casino n'est pas sur le tapis, mais dans votre portefeuille. 
                Ne misez jamais plus de 1% de votre capital total sur un seul tour ou une seule main. 
                C'est le secret de la longévité des plus grands joueurs.
              </p>
              <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
                Lire le guide complet
              </button>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="space-y-4">
                  {[
                    { label: "Discipline", val: 95 },
                    { label: "Analyse Mathématique", val: 88 },
                    { label: "Gestion Émotionnelle", val: 92 }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-blue-200 mb-1">
                        <span>{stat.label}</span>
                        <span>{stat.val}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500 rounded-full" 
                          style={{ width: `${stat.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Newsletter */}
      <section className="mt-24">
        <Newsletter />
      </section>
    </main>
  )
}

export default GuidesPage