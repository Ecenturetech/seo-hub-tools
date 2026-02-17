import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/MainLayout';
import { blogPosts } from '@/config/blogPosts';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const blogLabels: Record<string, { title: string; metaDesc: string; searchPlaceholder: string }> = {
  pt: {
    title: 'Blog SeoLayer Studio',
    metaDesc: 'Artigos sobre SEO, AIO, performance web e privacidade de dados. Dicas técnicas para desenvolvedores e profissionais de marketing.',
    searchPlaceholder: 'Filtrar por título...',
  },
  en: {
    title: 'SeoLayer Studio Blog',
    metaDesc: 'Articles about SEO, AIO, web performance and data privacy. Technical tips for developers and marketing professionals.',
    searchPlaceholder: 'Filter by title...',
  },
  es: {
    title: 'Blog SeoLayer Studio',
    metaDesc: 'Artículos sobre SEO, AIO, rendimiento web y privacidad de datos. Consejos técnicos para desarrolladores y profesionales de marketing.',
    searchPlaceholder: 'Filtrar por título...',
  },
  fr: {
    title: 'Blog SeoLayer Studio',
    metaDesc: 'Articles sur le SEO, l\'AIO, la performance web et la confidentialité des données. Conseils techniques pour développeurs et professionnels du marketing.',
    searchPlaceholder: 'Filtrer par titre...',
  },
};

export default function Blog() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';
  const labels = blogLabels[currentLang] || blogLabels.en;
  const [filter, setFilter] = useState('');

  const filteredPosts = blogPosts.filter((post) => {
    const title = post.title[currentLang] || post.title.en;
    return title.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <MainLayout>
      <Helmet>
        <title>{labels.title}</title>
        <meta name="description" content={labels.metaDesc} />
        <link rel="canonical" href={`https://seolayer.studio/${currentLang}/blog`} />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">{labels.title}</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={labels.searchPlaceholder}
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/${currentLang}/blog/${post.slug[currentLang] || post.slug.en}`}
              className="group rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title[currentLang] || post.title.en}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <time className="text-xs text-muted-foreground">{post.date}</time>
                <h2 className="text-lg font-semibold text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title[currentLang] || post.title.en}
                </h2>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                  {post.summary[currentLang] || post.summary.en}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="text-center text-muted-foreground py-12">
            {currentLang === 'pt' ? 'Nenhum post encontrado.' :
             currentLang === 'es' ? 'No se encontraron posts.' :
             currentLang === 'fr' ? 'Aucun article trouvé.' :
             'No posts found.'}
          </p>
        )}
      </div>
    </MainLayout>
  );
}
