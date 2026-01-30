import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link2, ExternalLink, ArrowUpRight } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { SEO } from '@/components/SEO';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ParsedLink {
  href: string;
  text: string;
  isInternal: boolean;
}

export default function LinkValidator() {
  const { t } = useTranslation();
  const [html, setHtml] = useState('');
  const [domain, setDomain] = useState('example.com');

  const links = useMemo<ParsedLink[]>(() => {
    if (!html.trim()) return [];

    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
    const matches = [...html.matchAll(linkRegex)];

    return matches.map((match) => {
      const href = match[1];
      const text = match[2] || href;
      const isInternal =
        href.startsWith('/') ||
        href.startsWith('#') ||
        (domain && href.includes(domain));

      return { href, text, isInternal };
    });
  }, [html, domain]);

  const internalLinks = links.filter((l) => l.isInternal);
  const externalLinks = links.filter((l) => !l.isInternal);

  return (
    <>
      <SEO
        titleKey="tools.linkValidator.metaTitle"
        descriptionKey="tools.linkValidator.metaDescription"
      />
      <ToolLayout
        title={t('tools.linkValidator.name')}
        description={t('tools.linkValidator.description')}
        icon={Link2}
      >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="domain">{t('tools.linkValidator.domain')}</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t('tools.linkValidator.domainPlaceholder')}
              className="input-highlight mt-2"
            />
          </div>
          <div>
            <Label htmlFor="html" className="mb-2 block">HTML</Label>
            <Textarea
              id="html"
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              placeholder={t('tools.linkValidator.htmlPlaceholder')}
              className="input-highlight min-h-[250px] font-mono text-sm"
            />
          </div>
        </div>

        <div className="space-y-6">
          {/* Stats */}
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{t('tools.linkValidator.totalLinks')}</span>
              <span className="text-2xl font-bold">{links.length}</span>
            </div>
          </Card>

          {/* Internal Links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-success" />
              <Label>{t('tools.linkValidator.internalLinks')} ({internalLinks.length})</Label>
            </div>
            <Card className="p-3 max-h-[200px] overflow-y-auto">
              {internalLinks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">-</p>
              ) : (
                <div className="space-y-2">
                  {internalLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm p-2 rounded bg-success/10"
                    >
                      <Link2 className="h-4 w-4 text-success shrink-0" />
                      <span className="truncate">{link.href}</span>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* External Links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <Label>{t('tools.linkValidator.externalLinks')} ({externalLinks.length})</Label>
            </div>
            <Card className="p-3 max-h-[200px] overflow-y-auto">
              {externalLinks.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">-</p>
              ) : (
                <div className="space-y-2">
                  {externalLinks.map((link, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm p-2 rounded bg-primary/10"
                    >
                      <ExternalLink className="h-4 w-4 text-primary shrink-0" />
                      <span className="truncate">{link.href}</span>
                      <ArrowUpRight className="h-3 w-3 text-muted-foreground shrink-0 ml-auto" />
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
      </ToolLayout>
    </>
  );
}
