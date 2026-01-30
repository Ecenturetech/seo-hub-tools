import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Target, Copy, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function UtmGenerator() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  const generatedUrl = useMemo(() => {
    if (!baseUrl) return '';

    const params = new URLSearchParams();
    if (source) params.append('utm_source', source);
    if (medium) params.append('utm_medium', medium);
    if (campaign) params.append('utm_campaign', campaign);
    if (term) params.append('utm_term', term);
    if (content) params.append('utm_content', content);

    const paramString = params.toString();
    if (!paramString) return baseUrl;

    const separator = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${separator}${paramString}`;
  }, [baseUrl, source, medium, campaign, term, content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title={t('tools.utmGenerator.name')}
      description={t('tools.utmGenerator.description')}
      icon={Target}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="baseUrl">{t('tools.utmGenerator.baseUrl')} *</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder={t('tools.utmGenerator.urlPlaceholder')}
              className="input-highlight mt-2"
            />
          </div>

          <div>
            <Label htmlFor="source">{t('tools.utmGenerator.source')} *</Label>
            <Input
              id="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder={t('tools.utmGenerator.sourcePlaceholder')}
              className="input-highlight mt-2"
            />
          </div>

          <div>
            <Label htmlFor="medium">{t('tools.utmGenerator.medium')} *</Label>
            <Input
              id="medium"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder={t('tools.utmGenerator.mediumPlaceholder')}
              className="input-highlight mt-2"
            />
          </div>

          <div>
            <Label htmlFor="campaign">{t('tools.utmGenerator.campaign')} *</Label>
            <Input
              id="campaign"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value)}
              placeholder={t('tools.utmGenerator.campaignPlaceholder')}
              className="input-highlight mt-2"
            />
          </div>

          <div>
            <Label htmlFor="term">{t('tools.utmGenerator.term')}</Label>
            <Input
              id="term"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder={t('tools.utmGenerator.termPlaceholder')}
              className="input-highlight mt-2"
            />
          </div>

          <div>
            <Label htmlFor="content">{t('tools.utmGenerator.content')}</Label>
            <Input
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('tools.utmGenerator.contentPlaceholder')}
              className="input-highlight mt-2"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>{t('common.result')}</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!generatedUrl}
            >
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
          <Card className="p-4 break-all">
            <code className="text-sm">
              {generatedUrl || (
                <span className="text-muted-foreground">
                  {t('tools.utmGenerator.urlPlaceholder')}
                </span>
              )}
            </code>
          </Card>

          {/* Preview breakdown */}
          {generatedUrl && (source || medium || campaign) && (
            <Card className="mt-4 p-4 space-y-2">
              <h4 className="font-medium text-sm mb-3">UTM Parameters</h4>
              {source && (
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-32">utm_source</span>
                  <span className="text-primary font-medium">{source}</span>
                </div>
              )}
              {medium && (
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-32">utm_medium</span>
                  <span className="text-primary font-medium">{medium}</span>
                </div>
              )}
              {campaign && (
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-32">utm_campaign</span>
                  <span className="text-primary font-medium">{campaign}</span>
                </div>
              )}
              {term && (
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-32">utm_term</span>
                  <span className="text-primary font-medium">{term}</span>
                </div>
              )}
              {content && (
                <div className="flex text-sm">
                  <span className="text-muted-foreground w-32">utm_content</span>
                  <span className="text-primary font-medium">{content}</span>
                </div>
              )}
            </Card>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
