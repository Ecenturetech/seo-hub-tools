import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import {
  Search,
  Code2,
  FileText,
  BarChart3,
  Map,
  Image,
  Globe,
  Link2,
  Target,
  ArrowRight,
  Sparkles,
  ClipboardCheck,
  Mail,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdBanner } from '@/components/AdBanner';
import { toolRoutes, toolCategories, type ToolId, type LanguageCode } from '@/config/routes';

const toolIcons: Record<ToolId, React.ElementType> = {
  'serp-simulator': Search,
  'schema-generator': Code2,
  'robots-generator': FileText,
  'word-counter': BarChart3,
  'meta-analyzer': FileText,
  'sitemap-generator': Map,
  'webp-converter': Image,
  'hreflang-generator': Globe,
  'link-validator': Link2,
  'utm-generator': Target,
  'lsi-keywords': Sparkles,
  'seo-checklist': ClipboardCheck,
  'favicon-simulator': Image,
  'email-obfuscator': Mail,
  'diff-checker': FileText,
  'readability-analyzer': BookOpen,
};

const toolNameKeys: Record<ToolId, string> = {
  'serp-simulator': 'tools.serpSimulator',
  'schema-generator': 'tools.schemaGenerator',
  'robots-generator': 'tools.robotsGenerator',
  'word-counter': 'tools.wordCounter',
  'meta-analyzer': 'tools.metaAnalyzer',
  'sitemap-generator': 'tools.sitemapGenerator',
  'webp-converter': 'tools.webpConverter',
  'hreflang-generator': 'tools.hreflangGenerator',
  'link-validator': 'tools.linkValidator',
  'utm-generator': 'tools.utmGenerator',
  'lsi-keywords': 'tools.lsiKeywords',
  'seo-checklist': 'tools.seoChecklist',
  'favicon-simulator': 'tools.faviconSimulator',
  'email-obfuscator': 'tools.emailObfuscator',
  'diff-checker': 'tools.diffChecker',
  'readability-analyzer': 'tools.readabilityAnalyzer',
};

const toolColors: Record<ToolId, string> = {
  'serp-simulator': 'from-blue-500 to-indigo-600',
  'schema-generator': 'from-purple-500 to-violet-600',
  'robots-generator': 'from-emerald-500 to-teal-600',
  'word-counter': 'from-orange-500 to-amber-600',
  'meta-analyzer': 'from-pink-500 to-rose-600',
  'sitemap-generator': 'from-cyan-500 to-sky-600',
  'webp-converter': 'from-lime-500 to-green-600',
  'hreflang-generator': 'from-indigo-500 to-blue-600',
  'link-validator': 'from-red-500 to-rose-600',
  'utm-generator': 'from-violet-500 to-purple-600',
  'lsi-keywords': 'from-amber-500 to-orange-600',
  'seo-checklist': 'from-teal-500 to-emerald-600',
  'favicon-simulator': 'from-sky-500 to-cyan-600',
  'email-obfuscator': 'from-rose-500 to-pink-600',
  'diff-checker': 'from-slate-500 to-gray-600',
  'readability-analyzer': 'from-green-500 to-lime-600',
};

export default function Index() {
  const { t, i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  
  const currentLang = (lang || i18n.language || 'en') as LanguageCode;
  const getToolPath = (toolId: ToolId) => `/${currentLang}/${toolRoutes[toolId][currentLang]}`;

  const renderToolCard = (toolId: ToolId, index: number) => {
    if (toolId === 'meta-analyzer') return null; // Skip disabled tool
    const Icon = toolIcons[toolId];
    return (
      <Link
        key={toolId}
        to={getToolPath(toolId)}
        className="tool-card group animate-fade-in"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${toolColors[toolId]} mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
          {t(`${toolNameKeys[toolId]}.name`)}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t(`${toolNameKeys[toolId]}.description`)}
        </p>
        <div className="mt-4 flex items-center text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          {t('hero.cta').split(' ')[0]}
          <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </Link>
    );
  };

  const renderCategory = (title: string, tools: ToolId[]) => (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        {t(title)}
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((toolId, index) => renderToolCard(toolId, index))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-16 lg:py-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="h-4 w-4" />
            <span>16 {t('common.tools')} • 4 Languages</span>
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

      {/* Tools by Category */}
      <section id="tools" className="px-4 pb-16 lg:pb-24">
        <div className="max-w-6xl mx-auto">
          {renderCategory('categories.content', toolCategories.content)}
          
          <AdBanner className="my-8" />
          
          {renderCategory('categories.technical', toolCategories.technical)}
          
          {renderCategory('categories.image', toolCategories.image)}
        </div>
      </section>

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
