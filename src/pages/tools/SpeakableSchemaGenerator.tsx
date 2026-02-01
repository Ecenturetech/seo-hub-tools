import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Mic, Copy, Check, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function SpeakableSchemaGenerator() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const storageKey = `speakable-schema_${lang || 'en'}`;
  
  const [formData, setFormData] = useLocalStorage(storageKey, {
    pageUrl: '',
    pageTitle: '',
    speakableHeadline: '',
    speakableSummary: '',
    cssSelectors: '#headline, #summary',
  });
  const [copied, setCopied] = useState(false);

  const generateSchema = () => {
    const { pageUrl, pageTitle, speakableHeadline, speakableSummary, cssSelectors } = formData;
    
    const selectors = cssSelectors.split(',').map(s => s.trim()).filter(Boolean);
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": pageTitle || "Page Title",
      "url": pageUrl || "https://example.com/page",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": selectors.length > 0 ? selectors : ["#headline", "#summary"]
      },
      "mainEntity": {
        "@type": "Article",
        "headline": speakableHeadline || "Article Headline",
        "description": speakableSummary || "Brief summary optimized for voice reading"
      }
    };

    return JSON.stringify(schema, null, 2);
  };

  const generateSGESchema = () => {
    const { pageUrl, pageTitle, speakableHeadline, speakableSummary } = formData;
    
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": speakableHeadline || "Article Headline",
      "description": speakableSummary || "Brief summary for AI summaries",
      "url": pageUrl || "https://example.com/page",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl || "https://example.com/page"
      },
      "isAccessibleForFree": true,
      "hasPart": {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": ".article-content"
      }
    };

    return JSON.stringify(schema, null, 2);
  };

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFormData({
      pageUrl: '',
      pageTitle: '',
      speakableHeadline: '',
      speakableSummary: '',
      cssSelectors: '#headline, #summary',
    });
  };

  return (
    <>
      <SEO
        titleKey="tools.speakableSchema.metaTitle"
        descriptionKey="tools.speakableSchema.metaDescription"
      />
      <ToolLayout
        title={t('tools.speakableSchema.name')}
        description={t('tools.speakableSchema.description')}
        icon={Mic}
        toolKey="speakableSchema"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={handleClear} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Volume2 className="h-5 w-5 text-primary" />
                {t('tools.speakableSchema.inputTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="pageUrl">{t('tools.speakableSchema.pageUrl')}</Label>
                <Input
                  id="pageUrl"
                  value={formData.pageUrl}
                  onChange={(e) => setFormData({ ...formData, pageUrl: e.target.value })}
                  placeholder="https://example.com/article"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="pageTitle">{t('tools.speakableSchema.pageTitle')}</Label>
                <Input
                  id="pageTitle"
                  value={formData.pageTitle}
                  onChange={(e) => setFormData({ ...formData, pageTitle: e.target.value })}
                  placeholder={t('tools.speakableSchema.pageTitlePlaceholder')}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="speakableHeadline">{t('tools.speakableSchema.headline')}</Label>
                <Input
                  id="speakableHeadline"
                  value={formData.speakableHeadline}
                  onChange={(e) => setFormData({ ...formData, speakableHeadline: e.target.value })}
                  placeholder={t('tools.speakableSchema.headlinePlaceholder')}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="speakableSummary">{t('tools.speakableSchema.summary')}</Label>
                <Textarea
                  id="speakableSummary"
                  value={formData.speakableSummary}
                  onChange={(e) => setFormData({ ...formData, speakableSummary: e.target.value })}
                  placeholder={t('tools.speakableSchema.summaryPlaceholder')}
                  className="mt-1"
                  rows={3}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {t('tools.speakableSchema.summaryTip')}
                </p>
              </div>

              <div>
                <Label htmlFor="cssSelectors">{t('tools.speakableSchema.cssSelectors')}</Label>
                <Input
                  id="cssSelectors"
                  value={formData.cssSelectors}
                  onChange={(e) => setFormData({ ...formData, cssSelectors: e.target.value })}
                  placeholder="#headline, #summary, .main-content"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('tools.speakableSchema.speakableTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-muted rounded-lg font-mono text-xs max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {generateSchema()}
                </div>
                <Button 
                  onClick={() => handleCopy(generateSchema())} 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-3"
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {t('common.copy')} Speakable Schema
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">{t('tools.speakableSchema.sgeTitle')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-3 bg-muted rounded-lg font-mono text-xs max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {generateSGESchema()}
                </div>
                <Button 
                  onClick={() => handleCopy(generateSGESchema())} 
                  variant="outline" 
                  size="sm"
                  className="w-full mt-3"
                >
                  {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  {t('common.copy')} SGE Schema
                </Button>
              </CardContent>
            </Card>

            <div className="p-3 bg-primary/10 rounded-lg">
              <p className="text-sm text-muted-foreground">
                {t('tools.speakableSchema.aiNote')}
              </p>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
