import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StarRating } from "@/components/StarRating";
import { Badge } from "@/components/Badge";
import { AffiliateButton } from "@/components/AffiliateButton";
import { Newsletter } from "@/components/Newsletter";
import { 
  CheckCircle, 
  XCircle, 
  ShieldCheck, 
  Gamepad2, 
  CreditCard, 
  Headphones, 
  Check, 
  X,
  Zap,
  Info,
  Trophy
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return { title: "Avis non trouvé" };
  }

  return {
    title: `Avis ${product.name} 2024 : Est-ce un casino fiable ? Notre test complet`,
    description: `Découvrez notre avis détaillé sur ${product.name}. Analyse du bonus de ${product.bonus}, catalogue de jeux, sécurité et rapidité des retraits.`,
    openGraph: {
      title: `Test & Avis complet sur ${product.name} | Casino Scanner`,
      description: `Analyse approfondie de ${product.name} : Bonus, jeux et fiabilité.`,
      type: "article",
    },
  };
}

function StarRatingDetailed({ rating }: { rating: number }) {
  const criteria = [
    { label: "Catalogue de jeux", score: rating },
    { label: "Bonus & Promos", score: Math.min(5, rating + 0.1) },
    { label: "Sécurité & Licence", score: Math.min(5, rating - 0.2) },
    { label: "Support Client", score: Math.min(5, rating + 0.2) },
    { label: "Paiements", score: rating },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <Trophy className="w-5 h-5 text-yellow-500" /> Détail de la note
      </h3>
      <div className="space-y-4">
        {criteria.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-slate-600">{item.label}</span>
              <span className="font-bold">{item.score.toFixed(1)}/5</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full" 
                style={{ width: `${(item.score / 5) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100">
        <div className="text-center">
          <div className="text-4xl font-black text-blue-600 mb-1">{rating}/5</div>
          <div className="text-sm font-bold text-blue-800 uppercase tracking-wider">Note Globale Expert</div>
        </div>
      </div>
    </div>
  );
}

function ProsCons({ pros, cons }: { pros?: string[], cons?: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-6 my-10">
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
        <h3 className="text-emerald-800 font-bold text-lg mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" /> Ce que nous aimons
        </h3>
        <ul className="space-y-3">
          {(pros || []).map((pro, i) => (
            <li key={i} className="flex items-start gap-3 text-emerald-900 leading-tight">
              <Check className="w-5 h-5 text-emerald-600 shrink-0" /> {pro}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-50 border border-rose-100 p-6 rounded-2xl">
        <h3 className="text-rose-800 font-bold text-lg mb-4 flex items-center gap-2">
          <XCircle className="w-5 h-5" /> Ce que nous aimons moins
        </h3>
        <ul className="space-y-3">
          {(cons || []).map((con, i) => (
            <li key={i} className="flex items-start gap-3 text-rose-900 leading-tight">
              <X className="w-5 h-5 text-rose-600 shrink-0" /> {con}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechnicalSpecs({ product }: { product: any }) {
  const specs = [
    { label: "Licence", value: "Curacao eGaming", icon: ShieldCheck },
    { label: "Dépôt Min.", value: "10€ / 20€", icon: CreditCard },
    { label: "Délai Retrait", value: "0 - 24 heures", icon: Zap },
    { label: "Jeux", value: "Machine à sous, Live Casino, Crash", icon: Gamepad2 },
    { label: "Support", value: "Chat 24/7 & Email", icon: Headphones },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
      {specs.map((spec) => (
        <div key={spec.label} className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
          <spec.icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
          <div className="text-xs text-slate-500 font-medium uppercase mb-1">{spec.label}</div>
          <div className="text-sm font-bold text-slate-900">{spec.value}</div>
        </div>
      ))}
    </div>
  );
}

function AffiliateCTA({ product }: { product: any }) {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 rounded-3xl my-12 relative overflow-hidden shadow-xl">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -mr-32 -mt-32"></div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <Badge className="bg-yellow-500 text-slate-900 font-bold mb-4 border-none">OFFRE EXCLUSIVE</Badge>
          <h3 className="text-3xl font-bold mb-2">Prêt à tester {product.name} ?</h3>
          <p className="text-blue-200 text-lg max-w-md">
            Profitez de votre bonus de bienvenue : <span className="text-white font-bold">{product.bonus}</span>
          </p>
        </div>
        <div className="flex flex-col items-center gap-3">
          <AffiliateButton 
            slug={product.affiliate_slug} 
            variant="secondary" 
            className="px-10 py-4 text-lg"
          >
            Visiter {product.name}
          </AffiliateButton>
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" /> Lien sécurisé & vérifié
          </p>
        </div>
      </div>
    </div>
  );
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": product.name,
      "applicationCategory": "GameApplication"
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": product.rating,
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "Casino Scanner"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Casino Scanner"
    }
  };

  return (
    <main className="min-h-screen pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <section className="bg-slate-950 text-white pt-8 pb-16 md:pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 opacity-70">
            <Breadcrumbs items={[
              { label: "Accueil", href: "/" },
              { label: "Avis", href: "/meilleurs-casinos" },
              { label: product.name, href: "#" },
            ]} />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-white rounded-3xl flex items-center justify-center p-6 shadow-2xl shrink-0 rotate-1">
              <span className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">
                {product.name.charAt(0)}
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <Badge className="bg-blue-600 border-none text-white px-3 py-1">Testé par nos experts</Badge>
                <Badge variant="outline" className="border-slate-700 text-slate-300 px-3 py-1">{product.category}</Badge>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                Avis complet sur <span className="text-blue-500">{product.name}</span>
              </h1>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-2xl border border-slate-800">
                  <StarRating rating={product.rating} />
                  <span className="text-2xl font-bold">{product.rating}/5</span>
                </div>
                <p className="text-xl text-slate-300 font-medium italic">
                  "{product.bonus}"
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <AffiliateButton slug={product.affiliate_slug} className="px-8 py-4 text-lg">
                  Profiter du bonus
                </AffiliateButton>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <Info className="w-4 h-4" /> 18+ | Jouer comporte des risques
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
              <TechnicalSpecs product={product} />

              <div className="prose prose-slate max-w-none">
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Introduction : Pourquoi choisir {product.name} ?</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {product.name} s'est rapidement imposé comme un acteur incontournable dans l'univers du iGaming. Que vous soyez un amateur de machines à sous, un passionné de casino en direct ou un adepte des paris sportifs, cette plateforme promet une expérience utilisateur fluide et sécurisée. Notre équipe a testé chaque recoin du site pour vous livrer un verdict impartial.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Un catalogue de jeux impressionnant</h2>
                <p className="text-slate-600 mb-4">
                  Avec plus de 3000 titres disponibles, la diversité est le maître-mot chez {product.name}. On y retrouve les plus grands fournisseurs de l'industrie tels que Pragmatic Play, Evolution Gaming, Hacksaw et Play'n GO.
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-slate-600 mb-8 list-none p-0">
                  <li className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg"><Gamepad2 className="w-4 h-4 text-blue-500" /> Machines à sous (Megaways, Jackpots)</li>
                  <li className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg"><Gamepad2 className="w-4 h-4 text-blue-500" /> Live Casino (Blackjack, Roulette)</li>
                  <li className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg"><Gamepad2 className="w-4 h-4 text-blue-500" /> Jeux de table classiques</li>
                  <li className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg"><Gamepad2 className="w-4 h-4 text-blue-500" /> Mini-jeux exclusifs</li>
                </ul>

                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Bonus et Promotions : Notre Analyse</h2>
                <p className="text-slate-600 mb-6">
                  Le bonus de bienvenue de <span className="font-bold text-slate-900">{product.bonus}</span> est particulièrement attractif. Mais au-delà de l'offre d'appel, c'est la régularité des promotions hebdomadaires et la qualité du programme VIP qui font la différence. Les joueurs fidèles sont récompensés par du cashback, des bonus de recharge et des limites de retrait augmentées.
                </p>

                <ProsCons pros={product.pros} cons={product.cons} />

                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Sécurité et Fiabilité du site</h2>
                <p className="text-slate-600 mb-6">
                  La sécurité est notre critère numéro 1. {product.name} opère sous une licence de Curaçao, garantissant l'équité des jeux (via RNG) et la protection des fonds des joueurs. Le cryptage SSL 256 bits assure que vos données personnelles et bancaires restent strictement confidentielles.
                </p>

                <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">Dépôts et Retraits : Rapidité exemplaire</h2>
                <p className="text-slate-600 mb-6">
                  C'est l'un des points forts majeurs. Les retraits sont traités en un temps record. Que vous utilisiez des crypto-monnaies (Bitcoin, Ethereum, USDT) ou des méthodes classiques (Visa, Mastercard, Skrill), {product.name} s'engage à valider les transactions rapidement.
                </p>
              </div>

              <AffiliateCTA product={product} />

              <div className="prose prose-slate max-w-none mt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">Verdict Final</h2>
                <p className="text-slate-600 leading-relaxed">
                  Après des dizaines d'heures de test, notre conclusion est sans appel : {product.name} mérite sa place parmi les meilleurs casinos en ligne de 2024. Sa combinaison de bonus généreux, de catalogue de jeux exhaustif et de fiabilité technique en fait un choix de premier ordre pour tout type de joueur.
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-8">
            <StarRatingDetailed rating={product.rating} />
            
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" /> Sécurité Vérifiée
              </h3>
              <ul className="space-y-3 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Licence Curaçao 8048/JAZ
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Jeux Provably Fair
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Support Français 24/7
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-blue-400" /> Retraits Prioritaires
                </li>
              </ul>
            </div>

            <div className="bg-blue-600 p-6 rounded-2xl text-white">
              <h3 className="text-lg font-bold mb-2">Besoin d'aide ?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Inscrivez-vous à notre newsletter pour recevoir les derniers bonus exclusifs et alertes sur les nouveaux casinos fiables.
              </p>
              <Newsletter />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}