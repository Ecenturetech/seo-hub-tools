import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tools/serp-simulator" element={<SerpSimulator />} />
            <Route path="/tools/schema-generator" element={<SchemaGenerator />} />
            <Route path="/tools/robots-generator" element={<RobotsGenerator />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/meta-analyzer" element={<MetaAnalyzer />} />
            <Route path="/tools/sitemap-generator" element={<SitemapGenerator />} />
            <Route path="/tools/webp-converter" element={<WebpConverter />} />
            <Route path="/tools/hreflang-generator" element={<HreflangGenerator />} />
            <Route path="/tools/link-validator" element={<LinkValidator />} />
            <Route path="/tools/utm-generator" element={<UtmGenerator />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
