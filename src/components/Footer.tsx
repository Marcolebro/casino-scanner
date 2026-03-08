import Link from "next/link";
import { ShieldCheck, Twitter, Youtube, Mail, ExternalLink, Facebook, Github } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-blue-600 p-1.5 rounded-lg group-hover:bg-blue-500 transition-colors">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Casino<span className="text-blue-500">Scanner</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Casino Scanner est votre guide de référence pour comparer les meilleures plateformes de casino en ligne. Nous analysons la sécurité, les bonus et la fiabilité pour vous offrir une expérience de jeu optimale et sécurisée.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white transition-all duration-300" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-slate-900 hover:bg-red-600 hover:text-white transition-all duration-300" aria-label="Youtube">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="mailto:contact@casinoscanner.com" className="p-2 rounded-full bg-slate-900 hover:bg-emerald-600 hover:text-white transition-all duration-300" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/meilleurs-casinos" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Classement 2024
                </Link>
              </li>
              <li>
                <Link href="/bonus" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Meilleurs Bonus
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Guides & Stratégies
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Actualités
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Informations</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/mentions-legales" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Mentions Légales
                </Link>
              </li>
              <li>
                <Link href="/politique-de-confidentialite" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Nous contacter
                </Link>
              </li>
            </ul>
          </div>

          {/* Responsible Gaming Section */}
          <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-emerald-500 font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Jeu Responsable
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Le jeu doit rester un plaisir. Jouer comporte des risques : endettement, isolement, dépendance. Pour être aidé, appelez le :
            </p>
            <div className="text-lg font-bold text-white mb-2">09 74 75 13 13</div>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Appel non surtaxé (France)</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-700 text-slate-500 font-bold text-sm">18+</span>
            <p className="text-sm text-slate-500">
              © {currentYear} Casino Scanner. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> Site sécurisé SSL
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Comparateur Indépendant
            </span>
          </div>
        </div>

        {/* Disclaimer alert */}
        <div className="mt-8 p-4 bg-red-950/20 border border-red-900/30 rounded-lg">
          <p className="text-[11px] text-center text-slate-500 leading-relaxed">
            Avertissement : Les informations sur Casino Scanner sont fournies à titre indicatif. Nous percevons des commissions de la part des partenaires listés. Assurez-vous de respecter la législation en vigueur dans votre pays de résidence avant de vous inscrire sur une plateforme de jeu en ligne.
          </p>
        </div>
      </div>
    </footer>
  );
};