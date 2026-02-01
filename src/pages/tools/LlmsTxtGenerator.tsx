import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { FileText, Copy, Check, Download, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function LlmsTxtGenerator() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const storageKey = `llms-txt-generator_${lang || 'en'}`;
  
  const [formData, setFormData] = useLocalStorage(storageKey, {
    brandName: '',
    brandSummary: '',
    criticalInfo: '',
    mainLinks: '',
    contactInfo: '',
    lastUpdated: new Date().toISOString().split('T')[0],
  });
  const [copied, setCopied] = useState(false);

  const generateLlmsTxt = () => {
    const { brandName, brandSummary, criticalInfo, mainLinks, contactInfo, lastUpdated } = formData;
    
    let output = `# ${brandName || 'Brand Name'}\n\n`;
    output += `> Last Updated: ${lastUpdated}\n\n`;
    
    if (brandSummary) {
      output += `## Summary\n\n${brandSummary}\n\n`;
    }
    
    if (criticalInfo) {
      output += `## Critical Information\n\n${criticalInfo}\n\n`;
    }
    
    if (mainLinks) {
      output += `## Main Links\n\n`;
      mainLinks.split('\n').filter(Boolean).forEach(link => {
        output += `- ${link.trim()}\n`;
      });
      output += '\n';
    }
    
    if (contactInfo) {
      output += `## Contact\n\n${contactInfo}\n\n`;
    }
    
    output += `---\n\n`;
    output += `> This file follows the llms.txt standard for AI crawlers.\n`;
    output += `> Learn more at https://llmstxt.org\n`;
    
    return output;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generateLlmsTxt());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = generateLlmsTxt();
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'llms.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setFormData({
      brandName: '',
      brandSummary: '',
      criticalInfo: '',
      mainLinks: '',
      contactInfo: '',
      lastUpdated: new Date().toISOString().split('T')[0],
    });
  };

  return (
    <>
      <SEO
        titleKey="tools.llmsTxtGenerator.metaTitle"
        descriptionKey="tools.llmsTxtGenerator.metaDescription"
      />
      <ToolLayout
        title={t('tools.llmsTxtGenerator.name')}
        description={t('tools.llmsTxtGenerator.description')}
        icon={Bot}
        toolKey="llmsTxtGenerator"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={handleClear} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t('tools.llmsTxtGenerator.inputTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="brandName">{t('tools.llmsTxtGenerator.brandName')}</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder={t('tools.llmsTxtGenerator.brandNamePlaceholder')}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="brandSummary">{t('tools.llmsTxtGenerator.brandSummary')}</Label>
                <Textarea
                  id="brandSummary"
                  value={formData.brandSummary}
                  onChange={(e) => setFormData({ ...formData, brandSummary: e.target.value })}
                  placeholder={t('tools.llmsTxtGenerator.brandSummaryPlaceholder')}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="criticalInfo">{t('tools.llmsTxtGenerator.criticalInfo')}</Label>
                <Textarea
                  id="criticalInfo"
                  value={formData.criticalInfo}
                  onChange={(e) => setFormData({ ...formData, criticalInfo: e.target.value })}
                  placeholder={t('tools.llmsTxtGenerator.criticalInfoPlaceholder')}
                  className="mt-1"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="mainLinks">{t('tools.llmsTxtGenerator.mainLinks')}</Label>
                <Textarea
                  id="mainLinks"
                  value={formData.mainLinks}
                  onChange={(e) => setFormData({ ...formData, mainLinks: e.target.value })}
                  placeholder={t('tools.llmsTxtGenerator.mainLinksPlaceholder')}
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contactInfo">{t('tools.llmsTxtGenerator.contactInfo')}</Label>
                <Input
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                  placeholder={t('tools.llmsTxtGenerator.contactInfoPlaceholder')}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('tools.llmsTxtGenerator.resultTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg font-mono text-sm max-h-96 overflow-y-auto whitespace-pre-wrap">
                  {generateLlmsTxt()}
                </div>
                
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {t('tools.llmsTxtGenerator.aiNote')}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleCopy} variant="outline" className="flex-1">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? t('common.copied') : t('common.copy')}
                  </Button>
                  <Button onClick={handleDownload} className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    {t('common.download')}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
