import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText, Download, Copy, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export default function RobotsGenerator() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [userAgent, setUserAgent] = useState('*');
  const [allowAll, setAllowAll] = useState(true);
  const [disallowAdmin, setDisallowAdmin] = useState(false);
  const [disallowPrivate, setDisallowPrivate] = useState(false);
  const [disallowApi, setDisallowApi] = useState(false);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');

  const generateRobotsTxt = () => {
    let content = `User-agent: ${userAgent}\n`;
    
    if (allowAll) {
      content += 'Allow: /\n';
    }
    if (disallowAdmin) {
      content += 'Disallow: /admin/\n';
    }
    if (disallowPrivate) {
      content += 'Disallow: /private/\n';
    }
    if (disallowApi) {
      content += 'Disallow: /api/\n';
    }
    
    if (crawlDelay) {
      content += `Crawl-delay: ${crawlDelay}\n`;
    }
    
    if (sitemapUrl) {
      content += `\nSitemap: ${sitemapUrl}`;
    }
    
    return content;
  };

  const robotsTxt = generateRobotsTxt();

  const handleCopy = () => {
    navigator.clipboard.writeText(robotsTxt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([robotsTxt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title={t('tools.robotsGenerator.name')}
      description={t('tools.robotsGenerator.description')}
      icon={FileText}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div>
            <Label htmlFor="userAgent">{t('tools.robotsGenerator.userAgent')}</Label>
            <Select value={userAgent} onValueChange={setUserAgent}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="*">{t('tools.robotsGenerator.allBots')} (*)</SelectItem>
                <SelectItem value="Googlebot">{t('tools.robotsGenerator.googlebot')}</SelectItem>
                <SelectItem value="Bingbot">{t('tools.robotsGenerator.bingbot')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>{t('tools.robotsGenerator.rules')}</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="allowAll"
                  checked={allowAll}
                  onCheckedChange={(checked) => setAllowAll(checked as boolean)}
                />
                <label htmlFor="allowAll" className="text-sm cursor-pointer">
                  {t('tools.robotsGenerator.allowAll')}
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="disallowAdmin"
                  checked={disallowAdmin}
                  onCheckedChange={(checked) => setDisallowAdmin(checked as boolean)}
                />
                <label htmlFor="disallowAdmin" className="text-sm cursor-pointer">
                  {t('tools.robotsGenerator.disallowAdmin')}
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="disallowPrivate"
                  checked={disallowPrivate}
                  onCheckedChange={(checked) => setDisallowPrivate(checked as boolean)}
                />
                <label htmlFor="disallowPrivate" className="text-sm cursor-pointer">
                  {t('tools.robotsGenerator.disallowPrivate')}
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="disallowApi"
                  checked={disallowApi}
                  onCheckedChange={(checked) => setDisallowApi(checked as boolean)}
                />
                <label htmlFor="disallowApi" className="text-sm cursor-pointer">
                  {t('tools.robotsGenerator.disallowApi')}
                </label>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="sitemapUrl">{t('tools.robotsGenerator.sitemapUrl')}</Label>
            <Input
              id="sitemapUrl"
              value={sitemapUrl}
              onChange={(e) => setSitemapUrl(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="input-highlight mt-2"
            />
          </div>

          <div>
            <Label htmlFor="crawlDelay">{t('tools.robotsGenerator.crawlDelay')}</Label>
            <Input
              id="crawlDelay"
              type="number"
              min="0"
              value={crawlDelay}
              onChange={(e) => setCrawlDelay(e.target.value)}
              placeholder="10"
              className="input-highlight mt-2"
            />
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
          <Card className="code-block">
            <pre className="text-sm whitespace-pre-wrap">{robotsTxt}</pre>
          </Card>
        </div>
      </div>
    </ToolLayout>
  );
}
