import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Image, Upload } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function FaviconSimulator() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const [siteTitle, setSiteTitle, clearTitle] = useLocalStorage(`favicon-sim_${lang || 'en'}`, '');
  const [faviconUrl, setFaviconUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFaviconUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    clearTitle();
    setFaviconUrl('');
  };

  return (
    <>
      <SEO
        titleKey="tools.faviconSimulator.metaTitle"
        descriptionKey="tools.faviconSimulator.metaDescription"
      />
      <ToolLayout
        title={t('tools.faviconSimulator.name')}
        description={t('tools.faviconSimulator.description')}
        icon={Image}
        toolKey="faviconSimulator"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={handleClear} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteTitle" className="mb-2 block">
                {t('tools.faviconSimulator.siteTitle')}
              </Label>
              <Input
                id="siteTitle"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                placeholder={t('tools.faviconSimulator.titlePlaceholder')}
                className="input-highlight"
              />
            </div>

            <div>
              <Label className="mb-2 block">{t('tools.faviconSimulator.uploadFavicon')}</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
              >
                {faviconUrl ? (
                  <img src={faviconUrl} alt="Favicon" className="w-16 h-16 mx-auto" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      {t('tools.faviconSimulator.dropzone')}
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-4">
            <Label className="block">{t('common.preview')}</Label>

            {/* Browser Tab Preview */}
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-3">
                {t('tools.faviconSimulator.browserTab')}
              </p>
              <div className="bg-muted rounded-t-lg p-2">
                <div className="flex items-center gap-2 bg-background rounded px-3 py-1.5 max-w-xs">
                  {faviconUrl ? (
                    <img src={faviconUrl} alt="Favicon" className="w-4 h-4" />
                  ) : (
                    <div className="w-4 h-4 bg-muted rounded" />
                  )}
                  <span className="text-xs truncate">
                    {siteTitle || 'Page Title'}
                  </span>
                  <span className="text-muted-foreground ml-auto">×</span>
                </div>
              </div>
            </Card>

            {/* Google Mobile Preview */}
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-3">
                {t('tools.faviconSimulator.googleMobile')}
              </p>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-3 border">
                <div className="flex items-center gap-3">
                  {faviconUrl ? (
                    <img src={faviconUrl} alt="Favicon" className="w-7 h-7 rounded-full" />
                  ) : (
                    <div className="w-7 h-7 bg-gray-200 dark:bg-gray-700 rounded-full" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {siteTitle || 'Your Website'}
                    </p>
                    <p className="text-xs text-gray-500">example.com</p>
                  </div>
                </div>
                <p className="mt-2 text-blue-600 dark:text-blue-400 text-sm">
                  {siteTitle || 'Page Title'} - Example Site
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  This is an example meta description that appears in search results...
                </p>
              </div>
            </Card>

            {/* Bookmarks Preview */}
            <Card className="p-4">
              <p className="text-xs text-muted-foreground mb-3">
                {t('tools.faviconSimulator.bookmarks')}
              </p>
              <div className="flex items-center gap-2 p-2 hover:bg-muted rounded cursor-pointer">
                {faviconUrl ? (
                  <img src={faviconUrl} alt="Favicon" className="w-4 h-4" />
                ) : (
                  <div className="w-4 h-4 bg-muted rounded" />
                )}
                <span className="text-sm">{siteTitle || 'Bookmarked Page'}</span>
              </div>
            </Card>
          </div>
        </div>

      </ToolLayout>
    </>
  );
}
