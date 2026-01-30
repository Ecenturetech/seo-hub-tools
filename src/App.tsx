import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { LanguageProvider } from "@/components/LanguageProvider";
import "@/i18n";

// Pages
import Index from "./pages/Index";
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
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirect root to default language */}
          <Route path="/" element={<Navigate to={`/${getDefaultLang()}`} replace />} />
          
          {/* Language routes */}
          {['en', 'pt', 'es', 'fr'].map((lang) => (
            <Route key={lang} path={`/${lang}`} element={<LanguageProvider lang={lang}><MainLayout><Index /></MainLayout></LanguageProvider>} />
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
