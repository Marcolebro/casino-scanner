import { Metadata } from "next"
import { getAllProducts } from "@/lib/products"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { StarRating } from "@/components/StarRating"
import { AffiliateButton } from "@/components/AffiliateButton"
import { Badge } from "@/components/Badge"
import { Newsletter } from "@/components/Newsletter"
import { Check, X, Shield, Zap, Gift, Trophy, Filter, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Classement des Meilleurs Casinos en Ligne 2024 | Casino Scanner",
  description: "Découvrez notre classement impartial des meilleurs casinos en ligne fiables. Comparez les bonus, la sécurité, les méthodes de paiement et les avis d'experts.",
  alternates: {
    canonical: "/meilleurs-casinos",
  },
}

interface Product {
  name: string
  slug: string
  affiliate_slug: string
  url: string
  bonus: string
  rating: number
  pros: string[]
  cons: string[]
  category: string
}

export function RankingTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-sm">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-sm font-semibold text-slate-900">Rang</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-900">Casino</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-900">Bonus de Bienvenue</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-900">Note</th>
            <th className="px-6 py-4 text-sm font-semibold text-slate-900 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {products?.map((product, index) => (
            <tr key={product.slug} className="hover:bg-slate-50 transition-colors group">
              <td className="px-6 py-6">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                  index === 0 ? "bg-yellow-400 text-yellow-900" : 
                  index === 1 ? "bg-slate-300 text-slate-700" : 
                  index === 2 ? "bg-amber-600 text-white" : "bg-slate-100 text-slate-500"
                )}>
                  {index + 1}
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900 text-lg">{product.name}</span>
                  <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">{product.category}</span>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex flex-col">
                  <span className="text-emerald-600 font-bold">{product.bonus}</span>
                  <div className="flex gap-1 mt-1">
                    {product.pros?.slice(0, 1).map((pro, i) => (
                      <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-100">
                        {pro}
                      </span>
                    ))}
                  </div>
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex flex-col gap-1">
                  <StarRating rating={product.rating} />
                  <span className="text-sm font-medium text-slate-600">{product.rating}/5</span>
                </div>
              </td>
              <td className="px-6 py-6 text-right">
                <AffiliateButton 
                  slug={product.affiliate_slug} 
                  variant="primary"
                  className="w-full sm:w-auto"
                >
                  Visiter
                </AffiliateButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function ComparisonMatrix({ products }: { products: Product[] }) {
  const topProducts = products?.slice(0, 4) || []
  
  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
        <Shield className="w-6 h-6 text-blue-600" />
        Comparatif Technique Direct
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {topProducts.map((product) => (
          <div key={product.slug} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
            <div className="mb-4">
              <Badge variant="outline" className="mb-2">{product.category}</Badge>
              <h3 className="text-xl font-bold text-slate-900">{product.name}</h3>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div className="pb-4 border-b border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-1">Points Forts</p>
                <ul className="space-y-2">
                  {product.pros?.slice(0, 3).map((pro, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700 leading-tight">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="pb-4 border-b border-slate-100">
                <p className="text-xs text-slate-500 uppercase mb-1">Inconvénients</p>
                <ul className="space-y-2">
                  {product.cons?.slice(0, 2).map((con, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                      <span className="text-slate-600 leading-tight">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <AffiliateButton slug={product.affiliate_slug} className="w-full">
                Voir l'offre
              </AffiliateButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default async function RankingPage() {
  const products = await getAllProducts()
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products?.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "WebApplication",
        "name": product.name,
        "url": `https://casinoscanner.com/avis/${product.slug}`,
        "ratingValue": product.rating
      }
    }))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Classement 2024", href: "/meilleurs-casinos" }
            ]} 
          />
          <div className="mt-6 max-w-3xl">
            <Badge variant="primary" className="mb-4">Mise à jour : Octobre 2024</Badge>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-4">
              Classement des Meilleurs Casinos en Ligne 2024
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              Nos experts ont testé et comparé plus de 50 plateformes pour ne retenir que l'élite. 
              Sécurité, rapidité des retraits et générosité des bonus : tout est passé au crible.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Le Top 7 des Casinos les plus Fiables
            </h2>
            <div className="flex items-center gap-3 text-sm text-slate-500 bg-white px-4 py-2 rounded-lg border border-slate-200">
              <Filter className="w-4 h-4" />
              <span>Trié par : Note d'expert</span>
            </div>
          </div>
          
          <RankingTable products={products} />
        </section>

        <ComparisonMatrix products={products} />

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 my-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Comment nous classons les casinos ?</h2>
              <div className="prose prose-slate max-w-none">
                <p>
                  Le marché du jeu en ligne est vaste et parfois risqué. Chez <strong>Casino Scanner</strong>, nous appliquons une méthodologie stricte pour chaque revue. Un casino ne peut figurer dans notre top qu'après avoir validé les critères suivants :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Licence & Sécurité</h4>
                      <p className="text-sm text-slate-600">Vérification des licences (Curaçao, MGA) et du cryptage SSL des données.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Vitesse de Retrait</h4>
                      <p className="text-sm text-slate-600">Nous testons les délais réels. Un bon casino doit payer en moins de 48h.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <Gift className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Équité des Bonus</h4>
                      <p className="text-sm text-slate-600">Lecture des petites lignes : les conditions de mise (wager) doivent être honnêtes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">Catalogue de Jeux</h4>
                      <p className="text-sm text-slate-600">Présence des meilleurs fournisseurs comme Evolution Gaming, Pragmatic ou Hacksaw.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 text-white p-8 rounded-2xl overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4">Besoin d'un conseil personnalisé ?</h3>
                <p className="text-slate-300 mb-6 max-w-md">
                  Nos guides stratégiques vous aident à maximiser vos chances de gains sur vos jeux préférés.
                </p>
                <a href="/guides" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all">
                  Consulter les guides <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-3xl -mr-32 -mt-32 rounded-full" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-4">FAQ - Questions Fréquentes</h3>
              <div className="space-y-4">
                <details className="group border-b border-slate-100 pb-4" open>
                  <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                    Quel est le casino le plus fiable ?
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Actuellement, Stake et Cresus Casino dominent le marché en termes de fiabilité et de rapidité de paiement.
                  </p>
                </details>
                <details className="group border-b border-slate-100 pb-4">
                  <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                    Puis-je jouer en crypto ?
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    Oui, des plateformes comme Stake et BC.Game sont spécialisées dans les crypto-monnaies avec des retraits instantanés.
                  </p>
                </details>
                <details className="group border-b border-slate-100 pb-4">
                  <summary className="font-semibold text-slate-800 cursor-pointer list-none flex justify-between items-center">
                    C'est quoi un "Wager" ?
                    <span className="group-open:rotate-180 transition-transform">↓</span>
                  </summary>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                    C'est le nombre de fois que vous devez miser le montant du bonus avant de pouvoir retirer vos gains. Cresus propose des bonus sans wager.
                  </p>
                </details>
              </div>
            </div>
            
            <Newsletter />
          </div>
        </section>
      </main>
    </div>
  )
}