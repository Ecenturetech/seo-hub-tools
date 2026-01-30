import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Map, Copy, Check, Download } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export default function SitemapGenerator() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [urls, setUrls] = useState('');
  const [changeFreq, setChangeFreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');

  const generateSitemap = () => {
    const urlList = urls
      .split('\n')
      .map((url) => url.trim())
      .filter((url) => url.length > 0 && url.startsWith('http'));

    if (urlList.length === 0) {
      return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Add URLs above to generate sitemap -->
</urlset>`;
    }

    const urlEntries = urlList
      .map(
        (url) => `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  };

  const sitemap = generateSitemap();

  const handleCopy = () => {
    navigator.clipboard.writeText(sitemap);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([sitemap], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title={t('tools.sitemapGenerator.name')}
      description={t('tools.sitemapGenerator.description')}
      icon={Map}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="urls" className="mb-2 block">URLs</Label>
            <Textarea
              id="urls"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
              placeholder={t('tools.sitemapGenerator.urlsPlaceholder')}
              className="input-highlight min-h-[200px] font-mono text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>{t('tools.sitemapGenerator.changeFreq')}</Label>
              <Select value={changeFreq} onValueChange={setChangeFreq}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">{t('tools.sitemapGenerator.daily')}</SelectItem>
                  <SelectItem value="weekly">{t('tools.sitemapGenerator.weekly')}</SelectItem>
                  <SelectItem value="monthly">{t('tools.sitemapGenerator.monthly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t('tools.sitemapGenerator.priority')}</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.0">1.0</SelectItem>
                  <SelectItem value="0.8">0.8</SelectItem>
                  <SelectItem value="0.6">0.6</SelectItem>
                  <SelectItem value="0.4">0.4</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label>{t('common.result')}</Label>
            <div className="flex gap-2">
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
              <Button variant="default" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                {t('common.download')}
              </Button>
            </div>
          </div>
          <Card className="code-block max-h-[400px] overflow-y-auto">
            <pre className="text-xs lg:text-sm whitespace-pre-wrap">{sitemap}</pre>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
