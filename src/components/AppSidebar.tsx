import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LanguageSelector } from './LanguageSelector';
import { ThemeToggle } from './ThemeToggle';
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
} from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const toolIcons: Record<string, React.ElementType> = {
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
};

const tools = [
  { id: 'serp-simulator', nameKey: 'tools.serpSimulator.name' },
  { id: 'schema-generator', nameKey: 'tools.schemaGenerator.name' },
  { id: 'robots-generator', nameKey: 'tools.robotsGenerator.name' },
  { id: 'word-counter', nameKey: 'tools.wordCounter.name' },
  { id: 'meta-analyzer', nameKey: 'tools.metaAnalyzer.name' },
  { id: 'sitemap-generator', nameKey: 'tools.sitemapGenerator.name' },
  { id: 'webp-converter', nameKey: 'tools.webpConverter.name' },
  { id: 'hreflang-generator', nameKey: 'tools.hreflangGenerator.name' },
  { id: 'link-validator', nameKey: 'tools.linkValidator.name' },
  { id: 'utm-generator', nameKey: 'tools.utmGenerator.name' },
];

export function AppSidebar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

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
          'fixed top-0 left-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 lg:translate-x-0 lg:static',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <Link
              to="/"
              className="flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Search className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-sidebar-foreground">
                  {t('common.appName')}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {t('common.tagline')}
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors mb-2',
                location.pathname === '/'
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              )}
            >
              <Home className="h-4 w-4" />
              {t('common.home')}
            </Link>

            <div className="mt-4 mb-2">
              <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t('common.tools')}
              </span>
            </div>

            <div className="space-y-1">
              {tools.map((tool) => {
                const Icon = toolIcons[tool.id];
                const isActive = location.pathname === `/tools/${tool.id}`;
                return (
                  <Link
                    key={tool.id}
                    to={`/tools/${tool.id}`}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="truncate">{t(tool.nameKey)}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border space-y-3">
            <div className="flex items-center justify-between">
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
