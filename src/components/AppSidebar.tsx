import { useTranslation } from 'react-i18next';
import { Link, useLocation, useParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
import { Logo } from './Logo';
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
  Home,
  Menu,
  X,
  Sparkles,
  ClipboardCheck,
  Mail,
  BookOpen,
  Bot,
  Network,
  Mic,
  Info,
  Shield,
  MessageSquare,
  Newspaper,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { toolRoutes, toolCategories, type ToolId, type LanguageCode } from '@/config/routes';

const toolIcons: Record<ToolId, React.ElementType> = {
  'serp-simulator': Search,
  'schema-generator': Code2,
  'robots-generator': FileText,
  'word-counter': BarChart3,
  'meta-analyzer': Tags,
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
  'alt-text-generator': Image,
  'llms-txt-generator': Bot,
  'entity-builder': Network,
  'speakable-schema': Mic,
};

const toolNameKeys: Record<ToolId, string> = {
  'serp-simulator': 'tools.serpSimulator.name',
  'schema-generator': 'tools.schemaGenerator.name',
  'robots-generator': 'tools.robotsGenerator.name',
  'word-counter': 'tools.wordCounter.name',
  'meta-analyzer': 'tools.metaAnalyzer.name',
  'sitemap-generator': 'tools.sitemapGenerator.name',
  'webp-converter': 'tools.webpConverter.name',
  'hreflang-generator': 'tools.hreflangGenerator.name',
  'link-validator': 'tools.linkValidator.name',
  'utm-generator': 'tools.utmGenerator.name',
  'lsi-keywords': 'tools.lsiKeywords.name',
  'seo-checklist': 'tools.seoChecklist.name',
  'favicon-simulator': 'tools.faviconSimulator.name',
  'email-obfuscator': 'tools.emailObfuscator.name',
  'diff-checker': 'tools.diffChecker.name',
  'readability-analyzer': 'tools.readabilityAnalyzer.name',
  'alt-text-generator': 'tools.altTextGenerator.name',
  'llms-txt-generator': 'tools.llmsTxtGenerator.name',
  'entity-builder': 'tools.entityBuilder.name',
  'speakable-schema': 'tools.speakableSchema.name',
};

const categoryLabels = {
  content: 'categories.content',
  technical: 'categories.technical',
  image: 'categories.image',
  aio: 'categories.aio',
} as const;

export function AppSidebar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = (lang || i18n.language || 'en') as LanguageCode;

  const getToolPath = (toolId: ToolId) => `/${currentLang}/${toolRoutes[toolId][currentLang]}`;
  const getHomePath = () => `/${currentLang}`;

  const isToolActive = (toolId: ToolId) => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    if (pathParts.length >= 2) {
      const currentSlug = pathParts[1];
      return (Object.values(toolRoutes[toolId]) as string[]).includes(currentSlug);
    }
    return false;
  };

  const isHomeActive = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    return pathParts.length <= 1;
  };

  const renderToolLink = (toolId: ToolId) => {
    // Skip meta-analyzer as it's disabled
    if (toolId === 'meta-analyzer') return null;
    
    const Icon = toolIcons[toolId];
    const isActive = isToolActive(toolId);
    return (
      <Link
        key={toolId}
        to={getToolPath(toolId)}
        onClick={() => setIsOpen(false)}
        className={cn(
          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
          isActive
            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
            : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="truncate">{t(toolNameKeys[toolId])}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-40 min-h-screen h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 lg:sticky',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <Link
              to={getHomePath()}
              className="block"
              onClick={() => setIsOpen(false)}
            >
              <Logo size="md" />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <Link
              to={getHomePath()}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-4',
                isHomeActive()
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <Home className="h-4 w-4" />
              {t('common.home')}
            </Link>

            {/* Content Category */}
            <div className="mb-4">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t(categoryLabels.content)}
              </span>
              <div className="mt-2 space-y-1">
                {toolCategories.content.map(renderToolLink)}
              </div>
            </div>

            {/* Technical Category */}
            <div className="mb-4">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t(categoryLabels.technical)}
              </span>
              <div className="mt-2 space-y-1">
                {toolCategories.technical.map(renderToolLink)}
              </div>
            </div>

            {/* Image Category */}
            <div className="mb-4">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t(categoryLabels.image)}
              </span>
              <div className="mt-2 space-y-1">
                {toolCategories.image.map(renderToolLink)}
              </div>
            </div>

            {/* AI Optimization Category */}
            <div className="mb-4">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t(categoryLabels.aio)}
              </span>
              <div className="mt-2 space-y-1">
                {toolCategories.aio.map(renderToolLink)}
              </div>
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border space-y-3">
            {/* About, Contact & Privacy Links */}
            <div className="flex flex-col gap-1">
              <Link
                to={`/${currentLang}/blog`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <Newspaper className="h-4 w-4" />
                Blog
              </Link>
              <Link
                to={`/${currentLang}/about`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <Info className="h-4 w-4" />
                {t('footer.about')}
              </Link>
              <Link
                to={`/${currentLang}/contact`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                {t('footer.contact')}
              </Link>
              <Link
                to={`/${currentLang}/privacy`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground hover:bg-sidebar-accent/50 transition-colors"
              >
                <Shield className="h-4 w-4" />
                {t('footer.privacy')}
              </Link>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-sidebar-border">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
