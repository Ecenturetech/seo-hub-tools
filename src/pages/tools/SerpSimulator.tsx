import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Copy, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function SerpSimulator() {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('https://example.com/page');

  const titleLength = title.length;
  const descLength = description.length;

  const getTitleColor = () => {
    if (titleLength === 0) return 'text-muted-foreground';
    if (titleLength >= 50 && titleLength <= 60) return 'text-success';
    if (titleLength > 60) return 'text-destructive';
    return 'text-warning';
  };

  const getDescColor = () => {
    if (descLength === 0) return 'text-muted-foreground';
    if (descLength >= 150 && descLength <= 160) return 'text-success';
    if (descLength > 160) return 'text-destructive';
    return 'text-warning';
  };

  const displayTitle = title || 'Your Page Title Will Appear Here';
  const displayDesc = description || 'Your meta description will appear here. Write a compelling description that encourages users to click on your result.';
  const displayUrl = url || 'https://example.com';

  // Truncate for preview
  const truncatedTitle = displayTitle.length > 60 ? displayTitle.substring(0, 60) + '...' : displayTitle;
  const truncatedDesc = displayDesc.length > 160 ? displayDesc.substring(0, 160) + '...' : displayDesc;

  return (
    <>
      <SEO
        titleKey="tools.serpSimulator.metaTitle"
        descriptionKey="tools.serpSimulator.metaDescription"
      />
      <ToolLayout
        title={t('tools.serpSimulator.name')}
        description={t('tools.serpSimulator.description')}
        icon={Search}
      >
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="title">{t('tools.serpSimulator.title')}</Label>
                <span className={cn('text-xs font-medium', getTitleColor())}>
                  {titleLength} {t('common.characters')}
                </span>
              </div>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('tools.serpSimulator.titlePlaceholder')}
                className="input-highlight"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('tools.serpSimulator.titleLimit')}
              </p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="description">{t('tools.serpSimulator.inputMetaDescription')}</Label>
                <span className={cn('text-xs font-medium', getDescColor())}>
                  {descLength} {t('common.characters')}
                </span>
              </div>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('tools.serpSimulator.metaPlaceholder')}
                className="input-highlight min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {t('tools.serpSimulator.descLimit')}
              </p>
            </div>

            <div>
              <Label htmlFor="url" className="mb-2 block">{t('tools.serpSimulator.url')}</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t('tools.serpSimulator.urlPlaceholder')}
                className="input-highlight"
              />
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <Label className="mb-3 block">{t('common.preview')}</Label>
            <Card className="serp-preview">
              <div className="space-y-1">
                <h3 className="serp-title">{truncatedTitle}</h3>
                <p className="serp-url">{displayUrl}</p>
                <p className="serp-description">{truncatedDesc}</p>
              </div>
            </Card>

            {/* Character indicators */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className={cn('h-3 w-3 rounded-full', titleLength >= 50 && titleLength <= 60 ? 'bg-success' : titleLength > 60 ? 'bg-destructive' : 'bg-warning')} />
                <span>Title: {titleLength >= 50 && titleLength <= 60 ? 'Optimal' : titleLength > 60 ? 'Too long' : 'Could be longer'}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className={cn('h-3 w-3 rounded-full', descLength >= 150 && descLength <= 160 ? 'bg-success' : descLength > 160 ? 'bg-destructive' : 'bg-warning')} />
                <span>Description: {descLength >= 150 && descLength <= 160 ? 'Optimal' : descLength > 160 ? 'Too long' : 'Could be longer'}</span>
              </div>
            </div>
          </div>
        </div>
      </ToolLayout>
    </>
  );
}
