import { Metadata } from "next"
import { getAllArticles } from "@/lib/articles"
import { ArticleCard } from "@/components/ArticleCard"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Newsletter } from "@/components/Newsletter"
import { TrendingUp, Newspaper, Zap, Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Actualités du Gambling & Casino en Ligne | Casino Scanner",
  description: "Suivez les dernières tendances, nouveaux jeux et régulations du secteur des casinos en ligne. Restez informé des nouveautés du iGaming en France.",
  openGraph: {
    title: "Actualités du Gambling & Casino en Ligne | Casino Scanner",
    description: "Toutes les news du monde du casino : régulation, nouveaux jeux et tendances.",
    type: "website",
  },
}

interface Article {
  slug: string
  title: string
  date: string
  category: string
  meta_description: string
  image?: string
  author?: string
  tags?: string[]
}

function TrendingSidebar() {
  const trends = [
    {
      title: "Régulation ANJ 2024",
      description: "Les nouvelles directives sur la publicité des jeux d'argent.",
      icon: <Scale className="w-5 h-5 text-blue-500" />,
    },
    {
      title: "Explosion des Crash Games",
      description: "Pourquoi des jeux comme Aviator dominent le marché actuel.",
      icon: <Zap className="w-5 h-5 text-yellow-500" />,
    },
    {
      title: "Adoption Crypto",
      description: "L'Ethereum devient la méthode préférée des gros joueurs.",
      icon: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    },
  ]

  return (
    <aside className="space-y-8">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          Sujets Brûlants
        </h3>
        <div className="space-y-6">
          {trends.map((trend, index) => (
            <div key={index} className="group cursor-default">
              <div className="flex items-start gap-3">
                <div className="mt-1">{trend.icon}</div>
                <div>
                  <h4 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {trend.title}
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {trend.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg">
        <h3 className="text-lg font-bold mb-4">Alerte Info</h3>
        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Ne manquez aucune mise à jour sur les licences de casino et les nouveaux bonus exclusifs.
        </p>
        <Newsletter />
      </div>
    </aside>
  )
}

function ArticleGrid({ articles }: { articles: Article[] }) {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
        <Newspaper className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Aucun article n'est disponible pour le moment.</p>
        <p className="text-sm text-slate-500">Revenez très bientôt pour les dernières news !</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  )
}

export default async function ActualitesPage() {
  const allArticles = await getAllArticles()
  
  // Filtrer pour n'avoir que les articles de la catégorie "Actualités"
  // Si aucune catégorie n'est spécifiée ou si on veut tout afficher sur cette page :
  const newsArticles = (allArticles || [])
    .filter((article) => article.category === "Actualités" || article.category === "News")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Actualités du Gambling - Casino Scanner",
    "description": "Suivez les dernières tendances, nouveaux jeux et régulations du secteur des casinos en ligne.",
    "publisher": {
      "@type": "Organization",
      "name": "Casino Scanner"
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="container mx-auto px-4">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Actualités", href: "/actualites" }
            ]} 
          />
          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
              Actualités du <span className="text-blue-600">Gambling</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Restez à la pointe de l&apos;industrie iGaming. Nous décryptons pour vous les régulations, les sorties de machines à sous et les évolutions technologiques des casinos en ligne.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-6 h-6 text-blue-600" />
                Derniers Articles
              </h2>
              <div className="h-px flex-1 bg-slate-200 ml-6 hidden sm:block"></div>
            </div>
            
            <ArticleGrid articles={newsArticles} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <TrendingSidebar />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section className="container mx-auto px-4 mt-20">
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Vous voulez en savoir plus sur les stratégies ?</h2>
            <p className="text-blue-100 mb-8 text-lg">
              Consultez nos guides complets pour améliorer vos chances de gains sur vos jeux préférés.
            </p>
            <a 
              href="/guides" 
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Découvrir nos Guides
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}