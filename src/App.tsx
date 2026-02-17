import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { LanguageProvider } from "@/components/LanguageProvider";
import { usePageTracking } from "@/hooks/usePageTracking";
import "@/i18n";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";

// Tool Pages
import SerpSimulator from "./pages/tools/SerpSimulator";
import SchemaGenerator from "./pages/tools/SchemaGenerator";
import RobotsGenerator from "./pages/tools/RobotsGenerator";
import WordCounter from "./pages/tools/WordCounter";
import MetaAnalyzer from "./pages/tools/MetaAnalyzer";
import SitemapGenerator from "./pages/tools/SitemapGenerator";
import WebpConverter from "./pages/tools/WebpConverter";
import HreflangGenerator from "./pages/tools/HreflangGenerator";
import LinkValidator from "./pages/tools/LinkValidator";
import UtmGenerator from "./pages/tools/UtmGenerator";
import LsiKeywords from "./pages/tools/LsiKeywords";
import SeoChecklist from "./pages/tools/SeoChecklist";
import FaviconSimulator from "./pages/tools/FaviconSimulator";
import EmailObfuscator from "./pages/tools/EmailObfuscator";
import DiffChecker from "./pages/tools/DiffChecker";
import ReadabilityAnalyzer from "./pages/tools/ReadabilityAnalyzer";
import AltTextGenerator from "./pages/tools/AltTextGenerator";
import LlmsTxtGenerator from "./pages/tools/LlmsTxtGenerator";
import EntityBuilder from "./pages/tools/EntityBuilder";
import SpeakableSchemaGenerator from "./pages/tools/SpeakableSchemaGenerator";

// Route config
import { toolRoutes } from "@/config/routes";

const queryClient = new QueryClient();

// Helper to get default language
const getDefaultLang = () => {
  const saved = localStorage.getItem('language');
  if (saved && ['en', 'pt', 'es', 'fr'].includes(saved)) {
    return saved;
  }
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'pt', 'es', 'fr'].includes(browserLang)) {
    return browserLang;
  }
  return 'en';
};

const toolComponents: Record<string, React.ComponentType> = {
  'serp-simulator': SerpSimulator,
  'schema-generator': SchemaGenerator,
  'robots-generator': RobotsGenerator,
  'word-counter': WordCounter,
  'meta-analyzer': MetaAnalyzer,
  'sitemap-generator': SitemapGenerator,
  'webp-converter': WebpConverter,
  'hreflang-generator': HreflangGenerator,
  'link-validator': LinkValidator,
  'utm-generator': UtmGenerator,
  'lsi-keywords': LsiKeywords,
  'seo-checklist': SeoChecklist,
  'favicon-simulator': FaviconSimulator,
  'email-obfuscator': EmailObfuscator,
  'diff-checker': DiffChecker,
  'readability-analyzer': ReadabilityAnalyzer,
  'alt-text-generator': AltTextGenerator,
  'llms-txt-generator': LlmsTxtGenerator,
  'entity-builder': EntityBuilder,
  'speakable-schema': SpeakableSchemaGenerator,
};

// Component that tracks page views
function AppRoutes() {
  usePageTracking();
  
  return (
    <Routes>
      {/* Redirect root to default language */}
      <Route path="/" element={<Navigate to={`/${getDefaultLang()}`} replace />} />
      
      {/* Language routes */}
      {['en', 'pt', 'es', 'fr'].map((lang) => (
        <Route key={lang} path={`/${lang}`} element={<LanguageProvider lang={lang}><MainLayout><Index /></MainLayout></LanguageProvider>} />
      ))}

      {/* About page routes */}
      {['en', 'pt', 'es', 'fr'].map((lang) => (
        <Route key={`${lang}-about`} path={`/${lang}/about`} element={<LanguageProvider lang={lang}><About /></LanguageProvider>} />
      ))}

      {/* Privacy page routes */}
      {['en', 'pt', 'es', 'fr'].map((lang) => (
        <Route key={`${lang}-privacy`} path={`/${lang}/privacy`} element={<LanguageProvider lang={lang}><Privacy /></LanguageProvider>} />
      ))}

      {/* Contact page routes */}
      {['en', 'pt', 'es', 'fr'].map((lang) => (
        <Route key={`${lang}-contact`} path={`/${lang}/contact`} element={<LanguageProvider lang={lang}><Contact /></LanguageProvider>} />
      ))}

      {/* Blog routes */}
      {['en', 'pt', 'es', 'fr'].map((lang) => (
        <Route key={`${lang}-blog`} path={`/${lang}/blog`} element={<LanguageProvider lang={lang}><Blog /></LanguageProvider>} />
      ))}
      {['en', 'pt', 'es', 'fr'].map((lang) => (
        <Route key={`${lang}-blog-post`} path={`/${lang}/blog/:slug`} element={<LanguageProvider lang={lang}><BlogPost /></LanguageProvider>} />
      ))}

      {/* Tool routes for each language */}
      {Object.entries(toolRoutes).map(([toolId, slugs]) => {
        const ToolComponent = toolComponents[toolId];
        return Object.entries(slugs).map(([lang, slug]) => (
          <Route
            key={`${lang}-${toolId}`}
            path={`/${lang}/${slug}`}
            element={
              <LanguageProvider lang={lang}>
                <MainLayout>
                  <ToolComponent />
                </MainLayout>
              </LanguageProvider>
            }
          />
        ));
      })}

      {/* Legacy routes redirect to localized versions */}
      <Route path="/tools/:toolSlug" element={<LegacyToolRedirect />} />
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Component to handle legacy /tools/* redirects
function LegacyToolRedirect() {
  const defaultLang = getDefaultLang();
  return <Navigate to={`/${defaultLang}`} replace />;
}

export default App;
