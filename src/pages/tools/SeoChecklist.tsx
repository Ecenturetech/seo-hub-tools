import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ClipboardCheck, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ChecklistItem {
  id: string;
  labelKey: string;
}

const onPageItems: ChecklistItem[] = [
  { id: 'title-tag', labelKey: 'tools.seoChecklist.items.titleTag' },
  { id: 'meta-description', labelKey: 'tools.seoChecklist.items.metaDescription' },
  { id: 'h1-tag', labelKey: 'tools.seoChecklist.items.h1Tag' },
  { id: 'heading-structure', labelKey: 'tools.seoChecklist.items.headingStructure' },
  { id: 'keyword-usage', labelKey: 'tools.seoChecklist.items.keywordUsage' },
  { id: 'image-alt', labelKey: 'tools.seoChecklist.items.imageAlt' },
  { id: 'internal-links', labelKey: 'tools.seoChecklist.items.internalLinks' },
  { id: 'external-links', labelKey: 'tools.seoChecklist.items.externalLinks' },
  { id: 'content-length', labelKey: 'tools.seoChecklist.items.contentLength' },
  { id: 'readability', labelKey: 'tools.seoChecklist.items.readability' },
];

const technicalItems: ChecklistItem[] = [
  { id: 'mobile-friendly', labelKey: 'tools.seoChecklist.items.mobileFriendly' },
  { id: 'page-speed', labelKey: 'tools.seoChecklist.items.pageSpeed' },
  { id: 'ssl-certificate', labelKey: 'tools.seoChecklist.items.sslCertificate' },
  { id: 'robots-txt', labelKey: 'tools.seoChecklist.items.robotsTxt' },
  { id: 'sitemap-xml', labelKey: 'tools.seoChecklist.items.sitemapXml' },
  { id: 'canonical-url', labelKey: 'tools.seoChecklist.items.canonicalUrl' },
  { id: 'schema-markup', labelKey: 'tools.seoChecklist.items.schemaMarkup' },
  { id: 'og-tags', labelKey: 'tools.seoChecklist.items.ogTags' },
  { id: '404-errors', labelKey: 'tools.seoChecklist.items.noErrors' },
  { id: 'core-web-vitals', labelKey: 'tools.seoChecklist.items.coreWebVitals' },
];

export default function SeoChecklist() {
  const { t } = useTranslation();
  const [checkedItems, setCheckedItems, clearChecked] = useLocalStorage<string[]>(
    'seo-checklist-items',
    []
  );

  const toggleItem = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allItems = [...onPageItems, ...technicalItems];
  const progress = useMemo(() => {
    return Math.round((checkedItems.length / allItems.length) * 100);
  }, [checkedItems.length, allItems.length]);

  const renderChecklistSection = (title: string, items: ChecklistItem[]) => (
    <Card className="p-4">
      <h3 className="font-semibold text-lg mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <Checkbox
              checked={checkedItems.includes(item.id)}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <span
              className={`text-sm transition-colors ${
                checkedItems.includes(item.id)
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground group-hover:text-primary'
              }`}
            >
              {t(item.labelKey)}
            </span>
            {checkedItems.includes(item.id) && (
              <Check className="h-4 w-4 text-primary ml-auto" />
            )}
          </label>
        ))}
      </div>
    </Card>
  );

  return (
    <>
      <SEO
        titleKey="tools.seoChecklist.metaTitle"
        descriptionKey="tools.seoChecklist.metaDescription"
      />
      <ToolLayout
        title={t('tools.seoChecklist.name')}
        description={t('tools.seoChecklist.description')}
        icon={ClipboardCheck}
        toolKey="seoChecklist"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={clearChecked} />
        </div>

        {/* Progress */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium">{t('tools.seoChecklist.progress')}</span>
            <span className="text-primary font-bold">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {checkedItems.length} / {allItems.length} {t('tools.seoChecklist.completed')}
          </p>
        </Card>

        <div className="grid gap-6 lg:grid-cols-2">
          {renderChecklistSection(t('tools.seoChecklist.onPage'), onPageItems)}
          {renderChecklistSection(t('tools.seoChecklist.technical'), technicalItems)}
        </div>

      </ToolLayout>
    </>
  );
}
