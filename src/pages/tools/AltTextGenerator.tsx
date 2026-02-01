import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Image as ImageIcon, Copy, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function AltTextGenerator() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const storageKey = `alt-text-generator_${lang || 'en'}`;
  
  const [formData, setFormData] = useLocalStorage(storageKey, {
    mainObject: '',
    sceneContext: '',
    imageIntent: '',
  });
  const [generatedAlt, setGeneratedAlt] = useState('');
  const [copied, setCopied] = useState(false);

  const generateAltText = () => {
    const { mainObject, sceneContext, imageIntent } = formData;
    if (!mainObject) return;

    let alt = mainObject;
    
    if (sceneContext) {
      alt += ` ${sceneContext}`;
    }
    
    if (imageIntent) {
      const intentPhrases: Record<string, Record<string, string>> = {
        informative: {
          en: 'demonstrating',
          pt: 'demonstrando',
          es: 'demostrando',
          fr: 'démontrant',
        },
        decorative: {
          en: 'featuring',
          pt: 'apresentando',
          es: 'presentando',
          fr: 'présentant',
        },
        functional: {
          en: 'showing',
          pt: 'mostrando',
          es: 'mostrando',
          fr: 'montrant',
        },
      };
      
      alt += ` - ${imageIntent}`;
    }
    
    // Clean up and format
    alt = alt.trim().replace(/\s+/g, ' ');
    
    // Add semantic descriptors for AI
    const semanticAlt = `${alt}. Visual context for AI: ${mainObject}${sceneContext ? `, set in ${sceneContext}` : ''}${imageIntent ? `, purpose: ${imageIntent}` : ''}.`;
    
    setGeneratedAlt(semanticAlt);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedAlt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setFormData({ mainObject: '', sceneContext: '', imageIntent: '' });
    setGeneratedAlt('');
  };

  return (
    <>
      <SEO
        titleKey="tools.altTextGenerator.metaTitle"
        descriptionKey="tools.altTextGenerator.metaDescription"
      />
      <ToolLayout
        title={t('tools.altTextGenerator.name')}
        description={t('tools.altTextGenerator.description')}
        icon={ImageIcon}
        toolKey="altTextGenerator"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={handleClear} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                {t('tools.altTextGenerator.inputTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="mainObject">{t('tools.altTextGenerator.mainObject')}</Label>
                <Input
                  id="mainObject"
                  value={formData.mainObject}
                  onChange={(e) => setFormData({ ...formData, mainObject: e.target.value })}
                  placeholder={t('tools.altTextGenerator.mainObjectPlaceholder')}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="sceneContext">{t('tools.altTextGenerator.sceneContext')}</Label>
                <Textarea
                  id="sceneContext"
                  value={formData.sceneContext}
                  onChange={(e) => setFormData({ ...formData, sceneContext: e.target.value })}
                  placeholder={t('tools.altTextGenerator.sceneContextPlaceholder')}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="imageIntent">{t('tools.altTextGenerator.imageIntent')}</Label>
                <Input
                  id="imageIntent"
                  value={formData.imageIntent}
                  onChange={(e) => setFormData({ ...formData, imageIntent: e.target.value })}
                  placeholder={t('tools.altTextGenerator.imageIntentPlaceholder')}
                  className="mt-1"
                />
              </div>

              <Button onClick={generateAltText} className="w-full">
                {t('common.generate')}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('tools.altTextGenerator.resultTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedAlt ? (
                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <code className="text-sm break-words">
                      alt="{generatedAlt}"
                    </code>
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('tools.altTextGenerator.aiNote')}
                    </p>
                  </div>

                  <Button onClick={handleCopy} variant="outline" className="w-full">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? t('common.copied') : t('common.copy')}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  {t('tools.altTextGenerator.emptyState')}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
