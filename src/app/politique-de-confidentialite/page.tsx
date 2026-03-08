import { Metadata } from "next"
import { Breadcrumbs } from "@/components/Breadcrumbs"
import { Newsletter } from "@/components/Newsletter"
import { ShieldCheck, Lock, Eye, FileText, Bell, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Casino Scanner",
  description: "Découvrez comment Casino Scanner protège vos données personnelles et respecte votre vie privée. Notre engagement pour une navigation sécurisée.",
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
}

interface PolicySectionProps {
  title: string
  icon: any
  children: React.ReactNode
}

function PolicySection({ title, icon: Icon, children }: PolicySectionProps) {
  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      </div>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export function PolitiqueConfidentialitePage() {
  const lastUpdate = "15 Mai 2024"

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 py-12">
          <Breadcrumbs 
            items={[
              { label: "Accueil", href: "/" },
              { label: "Politique de Confidentialité", href: "/politique-de-confidentialite" }
            ]} 
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-6 mb-4">
            Politique de Confidentialité
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Chez Casino Scanner, nous accordons une importance capitale à la protection de vos données personnelles et à la transparence de nos pratiques.
          </p>
          <p className="text-sm text-slate-400 mt-4 italic">
            Dernière mise à jour : {lastUpdate}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          
          <PolicySection title="Introduction" icon={ShieldCheck}>
            <p>
              La présente Politique de Confidentialité décrit la manière dont <strong>Casino Scanner</strong> ("nous", "notre") collecte, utilise et protège les informations que vous nous fournissez lorsque vous utilisez ce site web. Nous nous engageons à garantir que votre vie privée est protégée conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>
          </PolicySection>

          <PolicySection title="Collecte des Informations" icon={Eye}>
            <p className="mb-4">
              Nous pouvons collecter les types d'informations suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Données d'identification :</strong> Si vous vous inscrivez à notre newsletter, nous collectons votre adresse e-mail.</li>
              <li><strong>Données de navigation :</strong> Adresse IP, type de navigateur, temps passé sur les pages, et pages consultées via des outils d'analyse comme Google Analytics.</li>
              <li><strong>Données de cookies :</strong> Informations sur vos préférences et votre parcours sur le site pour améliorer votre expérience utilisateur.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Utilisation des Données" icon={Lock}>
            <p className="mb-4">
              Les informations collectées nous permettent de :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personnaliser votre expérience sur le site et répondre à vos besoins individuels.</li>
              <li>Améliorer la qualité de nos comparatifs et de nos guides.</li>
              <li>Vous envoyer des newsletters périodiques sur les meilleurs bonus et actualités (uniquement avec votre consentement).</li>
              <li>Détecter et prévenir d'éventuelles activités frauduleuses ou abusives.</li>
            </ul>
          </PolicySection>

          <PolicySection title="Cookies et Affiliation" icon={FileText}>
            <p className="mb-4">
              Casino Scanner utilise des cookies pour analyser le trafic et optimiser les performances. En tant que site d'affiliation, certains cookies sont utilisés pour :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Suivre les clics vers nos partenaires (Stake, MyStake, etc.) afin de valider les bonus que vous recevez.</li>
              <li>Mesurer l'efficacité de nos recommandations.</li>
            </ul>
            <p className="mt-4 italic">
              Vous pouvez configurer votre navigateur pour refuser les cookies, bien que cela puisse affecter certaines fonctionnalités du site.
            </p>
          </PolicySection>

          <PolicySection title="Partage avec des Tiers" icon={Bell}>
            <p>
              Nous ne vendons, n'échangeons, ni ne transférons vos informations personnelles identifiables à des tiers. Cela n'inclut pas les tierce parties de confiance qui nous aident à exploiter notre site web, tant que ces parties conviennent de garder ces informations confidentielles.
            </p>
            <p className="mt-4">
              Cependant, veuillez noter que les casinos partenaires vers lesquels nous redirigeons (via les liens /go/) ont leurs propres politiques de confidentialité. Nous n'assumons aucune responsabilité quant au contenu et aux activités de ces sites.
            </p>
          </PolicySection>

          <PolicySection title="Vos Droits (RGPD)" icon={ShieldCheck}>
            <p className="mb-4">
              Conformément à la réglementation européenne, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Droit d'accès :</strong> Obtenir une copie de vos données.</li>
              <li><strong>Droit de rectification :</strong> Corriger des données inexactes.</li>
              <li><strong>Droit à l'effacement :</strong> Demander la suppression de vos données (ex: désinscription newsletter).</li>
              <li><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données pour des raisons légitimes.</li>
            </ul>
          </PolicySection>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mt-16">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="p-4 rounded-full bg-blue-600 text-white">
                <Mail className="w-8 h-8" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Une question sur vos données ?</h3>
                <p className="text-slate-600">
                  Pour toute demande concernant vos données personnelles ou pour exercer vos droits, contactez notre délégué à la protection des données à l'adresse suivante :
                  <span className="block font-semibold text-blue-600 mt-1">privacy@casino-scanner.com</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-4">
          <Newsletter />
        </div>
      </section>
    </main>
  )
}

export default PolitiqueConfidentialitePage;