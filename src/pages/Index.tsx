import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
  Search,
  Code2,
  FileText,
  BarChart3,
  Tags,
  Map,
  Image,
  Globe,
  Link2,
  Target,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toolRoutes, type ToolId, type LanguageCode } from '@/config/routes';

const tools: { id: ToolId; nameKey: string; descKey: string; icon: React.ElementType; color: string }[] = [
  { id: 'serp-simulator', nameKey: 'tools.serpSimulator.name', descKey: 'tools.serpSimulator.description', icon: Search, color: 'from-blue-500 to-indigo-600' },
  { id: 'schema-generator', nameKey: 'tools.schemaGenerator.name', descKey: 'tools.schemaGenerator.description', icon: Code2, color: 'from-purple-500 to-violet-600' },
  { id: 'robots-generator', nameKey: 'tools.robotsGenerator.name', descKey: 'tools.robotsGenerator.description', icon: FileText, color: 'from-emerald-500 to-teal-600' },
  { id: 'word-counter', nameKey: 'tools.wordCounter.name', descKey: 'tools.wordCounter.description', icon: BarChart3, color: 'from-orange-500 to-amber-600' },
  { id: 'meta-analyzer', nameKey: 'tools.metaAnalyzer.name', descKey: 'tools.metaAnalyzer.description', icon: Tags, color: 'from-pink-500 to-rose-600' },
  { id: 'sitemap-generator', nameKey: 'tools.sitemapGenerator.name', descKey: 'tools.sitemapGenerator.description', icon: Map, color: 'from-cyan-500 to-sky-600' },
  { id: 'webp-converter', nameKey: 'tools.webpConverter.name', descKey: 'tools.webpConverter.description', icon: Image, color: 'from-lime-500 to-green-600' },
  { id: 'hreflang-generator', nameKey: 'tools.hreflangGenerator.name', descKey: 'tools.hreflangGenerator.description', icon: Globe, color: 'from-indigo-500 to-blue-600' },
  { id: 'link-validator', nameKey: 'tools.linkValidator.name', descKey: 'tools.linkValidator.description', icon: Link2, color: 'from-red-500 to-rose-600' },
  { id: 'utm-generator', nameKey: 'tools.utmGenerator.name', descKey: 'tools.utmGenerator.description', icon: Target, color: 'from-violet-500 to-purple-600' },
];

export default function Index() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  
  const currentLang = (lang || i18n.language || 'en') as LanguageCode;
  const getToolPath = (toolId: ToolId) => `/${currentLang}/${toolRoutes[toolId][currentLang]}`;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 lg:py-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>10 {t('common.tools')} • 4 Languages</span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 animate-slide-up-lcp">
            <span className="gradient-text">{t('hero.title')}</span>
          </h1>

          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            {t('hero.subtitle')}
          </p>

          <p className="text-sm text-muted-foreground/70 mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            {t('common.slogan')}
          </p>

          <Button size="lg" className="animate-slide-up" style={{ animationDelay: '0.2s' }} asChild>
            <a href="#tools">
              {t('hero.cta')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Ad placeholder */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="ad-placeholder py-6">
          <p>{t('common.adPlaceholder')}</p>
          <p className="text-xs mt-1">728 x 90</p>
        </div>
      </div>

      {/* Tools Grid */}
      <section id="tools" className="px-4 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  to={getToolPath(tool.id)}
                  className="tool-card group animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${tool.color} mb-4`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {t(tool.nameKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(tool.descKey)}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {t('hero.cta').split(' ')[0]}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ad placeholder */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="ad-placeholder py-6">
          <p>{t('common.adPlaceholder')}</p>
          <p className="text-xs mt-1">728 x 90</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            {t('footer.madeWith')} ❤️ {t('footer.for')}
          </p>
        </div>
      </footer>
    </div>
  );
}
