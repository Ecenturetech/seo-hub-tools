import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tags, Search, AlertCircle } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface MetaData {
  title: string;
  description: string;
  h1Tags: string[];
  ogTags: Record<string, string>;
}

export default function MetaAnalyzer() {
  const { t } = useTranslation();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetaData | null>(null);

  const handleAnalyze = () => {
    if (!url) return;
    
    setLoading(true);
    
    // Simulate analysis with mock data
    setTimeout(() => {
      setResult({
        title: 'Example Website - Your Trusted Partner for Solutions',
        description: 'Discover high-quality products and services at Example Website. We provide innovative solutions for businesses and individuals worldwide.',
        h1Tags: ['Welcome to Example Website', 'Our Services'],
        ogTags: {
          'og:title': 'Example Website - Your Trusted Partner',
          'og:description': 'Innovative solutions for everyone',
          'og:image': 'https://example.com/og-image.jpg',
          'og:type': 'website',
        },
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <ToolLayout
      title={t('tools.metaAnalyzer.name')}
      description={t('tools.metaAnalyzer.description')}
      icon={Tags}
    >
      <div className="space-y-6">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {t('tools.metaAnalyzer.note')}
          </AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={t('tools.metaAnalyzer.urlPlaceholder')}
              className="input-highlight"
            />
          </div>
          <Button onClick={handleAnalyze} disabled={loading || !url}>
            {loading ? (
              <>
                <span className="animate-spin mr-2">⟳</span>
                {t('tools.metaAnalyzer.analyzing')}
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                {t('common.analyze')}
              </>
            )}
          </Button>
        </div>

        {result && (
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-in">
            <Card className="p-4">
              <Label className="text-primary font-semibold">{t('tools.metaAnalyzer.title')}</Label>
              <p className="mt-2 text-sm">{result.title}</p>
              <div className="text-xs text-muted-foreground mt-1">
                {result.title.length} {t('common.characters')}
              </div>
            </Card>

            <Card className="p-4">
              <Label className="text-primary font-semibold">{t('tools.metaAnalyzer.description')}</Label>
              <p className="mt-2 text-sm">{result.description}</p>
              <div className="text-xs text-muted-foreground mt-1">
                {result.description.length} {t('common.characters')}
              </div>
            </Card>

            <Card className="p-4">
              <Label className="text-primary font-semibold">{t('tools.metaAnalyzer.h1Tags')}</Label>
              <ul className="mt-2 space-y-1">
                {result.h1Tags.map((tag, index) => (
                  <li key={index} className="text-sm flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {tag}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-4">
              <Label className="text-primary font-semibold">{t('tools.metaAnalyzer.ogTags')}</Label>
              <div className="mt-2 space-y-2">
                {Object.entries(result.ogTags).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <span className="ml-2">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
