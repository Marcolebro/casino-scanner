import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions Légales | Casino Scanner",
  description: "Consultez les mentions légales de Casino Scanner. Informations sur l'éditeur, l'hébergement, la propriété intellectuelle et notre engagement pour le jeu responsable.",
  robots: "noindex, follow",
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function Section({ title, children, className }: SectionProps) {
  return (
    <section className={cn("mb-10", className)}>
      <h2 className="text-2xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
        {title}
      </h2>
      <div className="text-gray-700 leading-relaxed space-y-4">
        {children}
      </div>
    </section>
  );
}

export function MentionsLegalesPage() {
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Mentions Légales", href: "/mentions-legales" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mentions Légales - Casino Scanner",
    "description": "Informations légales concernant le site Casino Scanner.",
    "publisher": {
      "@type": "Organization",
      "name": "Casino Scanner Media"
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <Breadcrumbs items={breadcrumbItems} />
        
        <header className="mt-8 mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Mentions Légales
          </h1>
          <p className="text-lg text-gray-600 italic">
            Dernière mise à jour : 24 Mai 2024
          </p>
        </header>

        <div className="prose prose-blue max-w-none">
          <Section title="1. Éditeur du site">
            <p>
              Le site <strong>Casino Scanner</strong> est édité par la société Casino Scanner Media Ltd, société à responsabilité limitée immatriculée au registre du commerce et des sociétés sous le numéro international 883-992-102.
            </p>
            <p>
              <strong>Siège social :</strong> 45 Business Center, Tower Road, Sliema, Malte.<br />
              <strong>Directeur de la publication :</strong> Marc L. (Contact via le formulaire de contact).<br />
              <strong>Contact :</strong> contact@casino-scanner.com
            </p>
          </Section>

          <Section title="2. Hébergement">
            <p>
              Le site est hébergé par la société <strong>Vercel Inc.</strong>, située au 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis.
            </p>
            <p>
              La maintenance technique et le stockage des données sont assurés par les infrastructures de Vercel, garantissant une haute disponibilité et une sécurité optimale des contenus diffusés.
            </p>
          </Section>

          <Section title="3. Nature des services et Affiliation">
            <p>
              Casino Scanner est un portail d'information indépendant spécialisé dans le comparatif de plateformes de jeux en ligne (casinos, paris sportifs). Notre mission est de fournir des avis objectifs, des guides stratégiques et de recenser les meilleurs bonus du marché.
            </p>
            <p className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <strong>Note importante :</strong> Casino Scanner n'est pas un opérateur de jeux d'argent. Nous ne proposons aucun jeu de hasard directement sur notre site. Le site participe à des programmes d'affiliation : nous percevons une rémunération lorsque vous cliquez sur certains liens sortants (CTA) vers nos partenaires. Cela n'impacte pas l'objectivité de nos tests.
            </p>
          </Section>

          <Section title="4. Propriété intellectuelle">
            <p>
              L'ensemble du contenu présent sur ce site, incluant les textes, graphismes, logos, icônes, images et codes sources, est la propriété exclusive de Casino Scanner Media, sauf mention contraire.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </Section>

          <Section title="5. Limitation de responsabilité">
            <p>
              Malgré tout le soin apporté à la vérification des informations, Casino Scanner ne peut être tenu responsable des erreurs, omissions ou résultats obtenus par l'usage des informations diffusées. L'utilisateur est seul responsable de ses décisions de jeu.
            </p>
            <p>
              Nous déclinons toute responsabilité quant au contenu des sites tiers vers lesquels pointent nos liens d'affiliation. Les conditions générales de vente et d'utilisation de ces sites s'appliquent dès que l'utilisateur quitte notre plateforme.
            </p>
          </Section>

          <Section title="6. Jeu Responsable" className="bg-red-50 p-6 rounded-xl border border-red-100">
            <h3 className="text-red-800 font-bold text-xl mb-3">Attention : Le jeu comporte des risques</h3>
            <p className="text-red-900">
              Les jeux d'argent et de hasard sont interdits aux mineurs. Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le <strong>09 74 75 13 13</strong> (appel non surtaxé pour la France) ou rendez-vous sur le site de l'ANJ ou Info Service Joueurs.
            </p>
            <p className="text-red-900 mt-2">
              Ne misez jamais d'argent que vous ne pouvez pas vous permettre de perdre. Le casino doit rester un divertissement.
            </p>
          </Section>

          <Section title="7. Droit applicable">
            <p>
              Tout litige en relation avec l'utilisation du site Casino Scanner est soumis au droit international. Les tribunaux compétents seront ceux du ressort du siège social de l'éditeur, sauf disposition légale impérative contraire.
            </p>
          </Section>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-500 text-sm">
            Pour toute question concernant ces mentions légales, merci de nous contacter à l'adresse suivante : legal@casino-scanner.com
          </p>
        </div>
      </div>
    </main>
  );
}

export default MentionsLegalesPage;