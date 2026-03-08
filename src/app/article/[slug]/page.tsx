import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Share2, 
  Facebook, 
  Twitter, 
  Linkedin,
  List
} from "lucide-react";
import { getArticleBySlug, getAllArticles, getArticlesByCategory } from "@/lib/articles";
import { getAllProducts } from "@/lib/products";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Badge } from "@/components/Badge";
import { ArticleCard } from "@/components/ArticleCard";
import { Newsletter } from "@/components/Newsletter";
import { AffiliateButton } from "@/components/AffiliateButton";
import { cn, formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article non trouvé | Casino Scanner",
    };
  }

  return {
    title: `${article.meta.title} | Casino Scanner`,
    description: article.meta.meta_description,
    openGraph: {
      title: article.meta.title,
      description: article.meta.meta_description,
      type: "article",
      publishedTime: article.meta.date,
      authors: [article.meta.author],
      images: article.meta.image ? [{ url: article.meta.image }] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = (await getArticlesByCategory(article.meta.category))
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  const allProducts = await getAllProducts();
  const topProduct = allProducts?.[0];

  // Extraction simple des titres pour le sommaire (H2)
  const headings = article.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", "").trim());

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-12 pb-16 text-white">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Breadcrumbs 
              items={[
                { label: "Accueil", href: "/" },
                { label: article.meta.category, href: `/guides` },
                { label: article.meta.title, href: "#" }
              ]} 
            />
          </div>
          
          <div className="max-w-4xl">
            <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 text-white border-none">
              {article.meta.category}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {article.meta.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <User size={16} className="text-blue-400" />
                <span>Par {article.meta.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-blue-400" />
                <span>Mis à jour le {formatDate(article.meta.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-blue-400" />
                <span>8 min de lecture</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {article.meta.image && (
                <div className="aspect-video w-full relative overflow-hidden">
                  <img 
                    src={article.meta.image} 
                    alt={article.meta.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              
              <div className="p-6 md:p-10">
                <div className="prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
                  <MDXRenderer content={article.content} />
                </div>

                <hr className="my-12 border-gray-100" />
                
                <AuthorBox author={article.meta.author} />
                
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="font-semibold text-gray-900">Cet article vous a été utile ? Partagez-le :</span>
                  <div className="flex gap-3">
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:text-blue-600 transition-colors shadow-sm">
                      <Facebook size={18} />
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:text-blue-400 transition-colors shadow-sm">
                      <Twitter size={18} />
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:text-blue-700 transition-colors shadow-sm">
                      <Linkedin size={18} />
                    </button>
                    <button className="p-2 bg-white border border-gray-200 rounded-full hover:text-gray-600 transition-colors shadow-sm">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <RelatedArticles articles={relatedArticles} />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <TableOfContents headings={headings} />

            {topProduct && (
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white sticky top-28 shadow-xl border border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <Badge className="bg-emerald-500 text-white border-none">RECOMMANDÉ</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">Le meilleur casino de 2024</h3>
                <p className="text-slate-300 text-sm mb-6">
                  Rejoignez {topProduct.name} et profitez d'un bonus exclusif de {topProduct.bonus}.
                </p>
                <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{topProduct.name}</span>
                    <span className="text-emerald-400 font-bold">{topProduct.rating}/5</span>
                  </div>
                  <ul className="space-y-2">
                    {(topProduct.pros || []).slice(0, 3).map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <div className="mt-1 min-w-[12px] h-[12px] rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-emerald-500" />
                        </div>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <AffiliateButton 
                  slug={topProduct.affiliate_slug} 
                  variant="primary"
                  className="w-full py-4 text-lg shadow-lg shadow-blue-500/20"
                >
                  Profiter du bonus
                </AffiliateButton>
                <p className="text-[10px] text-center text-slate-500 mt-4 italic">
                  * Jouer comporte des risques. 18+
                </p>
              </div>
            )}

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <List size={20} className="text-blue-500" />
                Catégories populaires
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Stratégies", "Nouveaux Casinos", "Bonus Sans Dépôt", "Crypto", "Live Casino"].map((cat) => (
                  <a 
                    key={cat} 
                    href="/guides" 
                    className="px-3 py-1.5 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg text-sm transition-colors border border-gray-100"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-20">
        <Newsletter />
      </div>
    </main>
  );
}

function MDXRenderer({ content }: { content: string }) {
  return (
    <MDXRemote
      source={content}
      components={{
        h2: (props) => <h2 id={props.children?.toString().toLowerCase().replace(/\s+/g, '-')} {...props} />,
        h3: (props) => <h3 className="text-xl font-bold mt-8 mb-3" {...props} />,
        p: (props) => <p className="mb-4 text-gray-600" {...props} />,
        ul: (props) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
        li: (props) => <li className="text-gray-600" {...props} />,
        strong: (props) => <strong className="font-bold text-gray-900" {...props} />,
        blockquote: (props) => (
          <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-8 italic text-gray-700 bg-blue-50 rounded-r-lg" {...props} />
        ),
      }}
    />
  );
}

function TableOfContents({ headings }: { headings: string[] }) {
  if (headings.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <List size={20} className="text-blue-500" />
        Sommaire
      </h3>
      <nav className="space-y-1">
        {headings.map((heading, index) => {
          const id = heading.toLowerCase().replace(/\s+/g, '-');
          return (
            <a
              key={index}
              href={`#${id}`}
              className="flex items-center gap-2 py-2 text-gray-600 hover:text-blue-600 transition-colors text-sm group"
            >
              <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
              <span>{heading}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

function AuthorBox({ author }: { author: string }) {
  const authorData = {
    name: author,
    role: "Expert en Gambling & Casinos",
    bio: "Spécialiste de l'industrie iGaming depuis plus de 10 ans, j'analyse les plateformes pour vous offrir les meilleurs conseils et stratégies de jeu.",
    image: `https://ui-avatars.com/api/?name=${author}&background=3b82f6&color=fff`
  };

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl bg-gray-50 border border-gray-100">
      <img 
        src={authorData.image} 
        alt={authorData.name} 
        className="w-20 h-20 rounded-full shadow-md border-4 border-white"
      />
      <div>
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">À propos de l'auteur</div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{authorData.name}</h4>
        <p className="text-sm text-gray-500 font-medium mb-3">{authorData.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">
          {authorData.bio}
        </p>
      </div>
    </div>
  );
}

function RelatedArticles({ articles }: { articles: any[] }) {
  if (!articles || articles.length === 0) return null;

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Articles similaires</h2>
        <a href="/guides" className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 text-sm">
          Tout voir <ChevronRight size={16} />
        </a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}