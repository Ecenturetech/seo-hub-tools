import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Plus, Trash2, Copy, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface LanguageEntry {
  id: string;
  code: string;
  url: string;
}

export default function HreflangGenerator() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('https://example.com');
  const [includeXDefault, setIncludeXDefault] = useState(true);
  const [languages, setLanguages] = useState<LanguageEntry[]>([
    { id: '1', code: 'en', url: 'https://example.com/en/' },
    { id: '2', code: 'es', url: 'https://example.com/es/' },
  ]);

  const addLanguage = () => {
    setLanguages([
      ...languages,
      { id: Date.now().toString(), code: '', url: '' },
    ]);
  };

  const removeLanguage = (id: string) => {
    setLanguages(languages.filter((lang) => lang.id !== id));
  };

  const updateLanguage = (id: string, field: 'code' | 'url', value: string) => {
    setLanguages(
      languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  const generateHreflang = () => {
    const validLanguages = languages.filter((lang) => lang.code && lang.url);
    
    let tags = validLanguages
      .map((lang) => `<link rel="alternate" hreflang="${lang.code}" href="${lang.url}" />`)
      .join('\n');

    if (includeXDefault && baseUrl) {
      tags += `\n<link rel="alternate" hreflang="x-default" href="${baseUrl}" />`;
    }

    return tags || '<!-- Add languages to generate hreflang tags -->';
  };

  const hreflangTags = generateHreflang();

  const handleCopy = () => {
    navigator.clipboard.writeText(hreflangTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        titleKey="tools.hreflangGenerator.metaTitle"
        descriptionKey="tools.hreflangGenerator.metaDescription"
      />
      <ToolLayout
        title={t('tools.hreflangGenerator.name')}
        description={t('tools.hreflangGenerator.description')}
        icon={Globe}
      >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label htmlFor="baseUrl">{t('tools.hreflangGenerator.baseUrl')}</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              className="input-highlight mt-2"
            />
          </div>

          <div className="flex items-center gap-3">
            <Checkbox
              id="xDefault"
              checked={includeXDefault}
              onCheckedChange={(checked) => setIncludeXDefault(checked as boolean)}
            />
            <label htmlFor="xDefault" className="text-sm cursor-pointer">
              {t('tools.hreflangGenerator.xDefault')}
            </label>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>{t('tools.hreflangGenerator.languages')}</Label>
              <Button variant="outline" size="sm" onClick={addLanguage}>
                <Plus className="h-4 w-4 mr-2" />
                {t('tools.hreflangGenerator.addLanguage')}
              </Button>
            </div>

            {languages.map((lang) => (
              <div key={lang.id} className="flex gap-2 items-start">
                <div className="w-24">
                  <Input
                    value={lang.code}
                    onChange={(e) => updateLanguage(lang.id, 'code', e.target.value)}
                    placeholder="en-US"
                    className="input-highlight text-sm"
                  />
                </div>
                <div className="flex-1">
                  <Input
                    value={lang.url}
                    onChange={(e) => updateLanguage(lang.id, 'url', e.target.value)}
                    placeholder="https://example.com/en/"
                    className="input-highlight text-sm"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeLanguage(lang.id)}
                  className="shrink-0"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>{t('common.result')}</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  {t('common.copied')}
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  {t('common.copy')}
                </>
              )}
            </Button>
          </div>
          <Card className="code-block">
            <pre className="text-xs lg:text-sm whitespace-pre-wrap">{hreflangTags}</pre>
          </Card>
        </div>
      </div>
      </ToolLayout>
    </>
  );
}
