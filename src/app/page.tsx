import { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { ProductCard } from "@/components/ProductCard";
import { ArticleCard } from "@/components/ArticleCard";
import { AffiliateButton } from "@/components/AffiliateButton";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/Badge";
import { 
  Trophy, 
  ShieldCheck, 
  Zap, 
  Gift, 
  ChevronRight, 
  HelpCircle, 
  Star, 
  Gamepad2, 
  Smartphone, 
  Globe,
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Casino Scanner - Comparatif des Meilleurs Casinos en Ligne 2024",
  description: "Découvrez les meilleures plateformes de casino type Stake, nos avis d'experts et les bonus d'inscription les plus avantageux pour jouer en toute sécurité.",
  alternates: {
    canonical: "https://casino-scanner.com",
  },
};

export default function Home() {
  const products = getAllProducts() || [];
  const articles = getAllArticles() || [];
  const topProducts = products.slice(0, 5);
  const featuredBonuses = products.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Casino Scanner",
    "url": "https://casino-scanner.com",
    "description": "Comparatif des meilleurs casinos en ligne et bonus de bienvenue.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://casino-scanner.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <main className="flex flex-col gap-16 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]" />
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Badge className="mb-6 bg-blue-500/10 text-blue-400 border-blue-500/20 px-4 py-1">
            🔥 Comparatif Mis à Jour - Octobre 2024
          </Badge>
          <h1 className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl">
            Trouvez le <span className="text-[#3b82f6]">Casino en Ligne</span> Idéal pour Votre Jeu
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-400 md:text-xl">
            Casino Scanner analyse, teste et compare les meilleures plateformes pour vous garantir une expérience sécurisée avec les bonus les plus généreux.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/meilleurs-casinos" 
              className="inline-flex items-center justify-center rounded-xl bg-[#3b82f6] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-600 hover:scale-105"
            >
              Voir le Classement 2024
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/bonus" 
              className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-slate-800"
            >
              Meilleurs Bonus
            </Link>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#10b981]" />
              <span className="text-sm font-medium">Sites 100% Vérifiés</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-[#10b981]" />
              <span className="text-sm font-medium">Retraits Instantanés</span>
            </div>
            <div className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-[#10b981]" />
              <span className="text-sm font-medium">Bonus Exclusifs</span>
            </div>
          </div>
        </div>
      </section>

      {/* TOP RANKING TABLE */}
      <section className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-1 shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="px-6 py-5 text-sm font-semibold text-slate-400">Rang</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-400">Casino</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-400">Note Experts</th>
                  <th className="px-6 py-5 text-sm font-semibold text-slate-400">Bonus de Bienvenue</th>
                  <th className="px-6 py-5 text-right text-sm font-semibold text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topProducts?.map((product, index) => (
                  <tr key={product.slug} className="group transition-colors hover:bg-slate-800/30">
                    <td className="px-6 py-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 font-bold text-white group-hover:bg-[#3b82f6]">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <Link href={`/avis/${product.slug}`} className="text-lg font-bold text-white hover:text-[#3b82f6]">
                          {product.name}
                        </Link>
                        <span className="text-xs text-slate-500 uppercase tracking-wider">{product.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <StarRating rating={product.rating} />
                        <span className="text-xs font-medium text-slate-400">{product.rating}/5.0</span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#10b981]">{product.bonus}</span>
                        <div className="mt-1 flex gap-2">
                          {product.pros?.slice(0, 1).map((pro, i) => (
                            <span key={i} className="text-[10px] text-slate-500 flex items-center gap-1">
                              <CheckCircle2 className="h-3 w-3" /> {pro}
                            </span>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <Link 
                          href={`/avis/${product.slug}`}
                          className="hidden text-sm font-medium text-slate-400 hover:text-white lg:block"
                        >
                          Lire l'avis
                        </Link>
                        <AffiliateButton 
                          slug={product.affiliate_slug} 
                          variant="primary"
                          className="px-6 py-2.5 text-sm"
                        >
                          Visiter
                        </AffiliateButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FEATURED BONUSES */}
      <section className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Bonus à ne pas manquer</h2>
            <p className="text-slate-400">Sélection exclusive des offres les plus rentables du moment.</p>
          </div>
          <Link href="/bonus" className="flex items-center text-[#3b82f6] font-semibold hover:underline">
            Voir tous les bonus <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBonuses?.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* HOME CATEGORIES */}
      <section className="bg-slate-900/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Explorez par Catégorie</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Crypto Casinos", icon: Globe, href: "/meilleurs-casinos?cat=crypto" },
              { name: "Mini-Jeux", icon: Gamepad2, href: "/meilleurs-casinos?cat=mini-jeux" },
              { name: "Casino Mobile", icon: Smartphone, href: "/meilleurs-casinos?cat=mobile" },
              { name: "Top Bonus", icon: Trophy, href: "/bonus" },
            ].map((cat) => (
              <Link 
                key={cat.name} 
                href={cat.href}
                className="group flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-950 p-8 transition-all hover:border-[#3b82f6] hover:bg-slate-900"
              >
                <cat.icon className="mb-4 h-10 w-10 text-slate-500 transition-colors group-hover:text-[#3b82f6]" />
                <span className="font-bold text-white">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Guides & Actualités</h2>
            <p className="text-slate-400">Apprenez à maximiser vos chances et restez informé.</p>
          </div>
          <Link href="/guides" className="flex items-center text-[#3b82f6] font-semibold hover:underline">
            Lire tous les guides <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles?.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="container mx-auto max-w-4xl px-4 py-10">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Foire Aux Questions</h2>
          <p className="text-slate-400">Tout ce que vous devez savoir avant de commencer à jouer.</p>
        </div>
        <div className="space-y-4">
          {[
            {
              q: "Comment choisir le meilleur casino en ligne ?",
              a: "Le choix dépend de vos priorités : sécurité (licence), variété des jeux, rapidité des retraits et générosité des bonus. Notre classement prend en compte tous ces critères pour vous proposer une sélection fiable."
            },
            {
              q: "Est-il sûr de jouer sur un crypto casino ?",
              a: "Oui, si la plateforme possède une licence (comme Curaçao). Les crypto casinos comme Stake offrent l'avantage de transactions anonymes, rapides et sans limites bancaires traditionnelles."
            },
            {
              q: "Qu'est-ce qu'un wager sur un bonus ?",
              a: "Le wager (ou condition de mise) correspond au nombre de fois que vous devez miser le montant du bonus avant de pouvoir retirer vos gains. Un bonus 'sans wager' est l'idéal."
            },
            {
              q: "Quels sont les délais de retrait habituels ?",
              a: "Sur les casinos crypto, les retraits sont souvent instantanés. Sur les casinos traditionnels, comptez entre 24h et 72h pour la validation de vos gains par le service financier."
            },
            {
              q: "Les jeux de casino en ligne sont-ils truqués ?",
              a: "Non, les casinos licenciés utilisent des générateurs de nombres aléatoires (RNG) ou la technologie Provably Fair (en crypto) pour garantir l'équité totale de chaque tirage."
            }
          ].map((item, i) => (
            <details key={i} className="group rounded-2xl border border-slate-800 bg-slate-900 p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <h3 className="text-lg font-bold text-white">{item.q}</h3>
                <HelpCircle className="h-5 w-5 text-slate-500 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-4 text-slate-400 leading-relaxed">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* NEWSLETTER CTA */}
      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-[#3b82f6]/20 to-emerald-500/10 border border-slate-800 p-8 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ne manquez plus aucun bonus exclusif</h2>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto">
            Rejoignez notre communauté de plus de 5 000 joueurs et recevez chaque semaine les meilleures offres négociées directement avec les casinos.
          </p>
          <div className="max-w-md mx-auto">
            {/* Newsletter component from shared components */}
            <div className="bg-slate-900 rounded-xl p-2 border border-slate-700">
                <form action="/api/newsletter" method="POST" className="flex flex-col sm:flex-row gap-2">
                    <input 
                        type="email" 
                        name="email"
                        placeholder="votre@email.com" 
                        required
                        className="flex-1 bg-transparent px-4 py-3 text-white outline-none"
                    />
                    <button 
                        type="submit"
                        className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
                    >
                        S'inscrire
                    </button>
                </form>
            </div>
          </div>
          <p className="mt-4 text-xs text-slate-500">Pas de spam. Désinscription possible à tout moment.</p>
        </div>
      </section>
    </main>
  );
}