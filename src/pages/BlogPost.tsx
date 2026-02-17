import { useParams, Navigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { MainLayout } from '@/components/MainLayout';
import { getBlogPostBySlug } from '@/config/blogPosts';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const currentLang = i18n.language || 'en';

  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to={`/${currentLang}/blog`} replace />;
  }

  const title = post.title[currentLang] || post.title.en;
  const summary = post.summary[currentLang] || post.summary.en;
  const content = post.content[currentLang] || post.content.en;

  const backLabel = currentLang === 'pt' ? 'Voltar ao Blog' :
    currentLang === 'es' ? 'Volver al Blog' :
    currentLang === 'fr' ? 'Retour au Blog' : 'Back to Blog';

  return (
    <MainLayout>
      <Helmet>
        <title>{title} | SeoLayer Studio</title>
        <meta name="description" content={summary} />
        <link rel="canonical" href={`https://seolayer.studio/${currentLang}/blog/${post.slug[currentLang]}`} />
      </Helmet>

      <article className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
        <Link
          to={`/${currentLang}/blog`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>

        <header className="mb-8">
          <time className="text-sm text-muted-foreground">{post.date}</time>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mt-2 leading-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground mt-4">{summary}</p>
        </header>

        <div className="rounded-xl overflow-hidden mb-10">
          <img
            src={post.image}
            alt={title}
            className="w-full aspect-video object-cover"
          />
        </div>

        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:text-foreground prose-p:text-muted-foreground
            prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
            prose-p:leading-relaxed prose-p:mb-4"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    </MainLayout>
  );
}
