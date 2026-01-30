import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Code2, Copy, Check } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

export default function SchemaGenerator() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [schemaType, setSchemaType] = useState('localBusiness');

  // Local Business fields
  const [businessName, setBusinessName] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhone, setBusinessPhone] = useState('');
  const [businessUrl, setBusinessUrl] = useState('');

  // Article fields
  const [articleTitle, setArticleTitle] = useState('');
  const [articleAuthor, setArticleAuthor] = useState('');
  const [articleDate, setArticleDate] = useState('');
  const [articleImage, setArticleImage] = useState('');

  const generateLocalBusinessSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: businessName || 'Your Business Name',
    address: {
      '@type': 'PostalAddress',
      streetAddress: businessAddress || '123 Main Street',
    },
    telephone: businessPhone || '+1-555-555-5555',
    url: businessUrl || 'https://example.com',
  });

  const generateArticleSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: articleTitle || 'Article Title',
    author: {
      '@type': 'Person',
      name: articleAuthor || 'Author Name',
    },
    datePublished: articleDate || new Date().toISOString().split('T')[0],
    image: articleImage || 'https://example.com/image.jpg',
  });

  const schema = schemaType === 'localBusiness' ? generateLocalBusinessSchema() : generateArticleSchema();
  const schemaJson = JSON.stringify(schema, null, 2);

  const handleCopy = () => {
    const scriptTag = `<script type="application/ld+json">\n${schemaJson}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SEO
        titleKey="tools.schemaGenerator.metaTitle"
        descriptionKey="tools.schemaGenerator.metaDescription"
      />
      <ToolLayout
        title={t('tools.schemaGenerator.name')}
        description={t('tools.schemaGenerator.description')}
        icon={Code2}
      >
      <Tabs value={schemaType} onValueChange={setSchemaType} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="localBusiness">{t('tools.schemaGenerator.localBusiness')}</TabsTrigger>
          <TabsTrigger value="article">{t('tools.schemaGenerator.article')}</TabsTrigger>
        </TabsList>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-4">
            <TabsContent value="localBusiness" className="m-0 space-y-4">
              <div>
                <Label htmlFor="businessName">{t('tools.schemaGenerator.businessName')}</Label>
                <Input
                  id="businessName"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
              <div>
                <Label htmlFor="businessAddress">{t('tools.schemaGenerator.businessAddress')}</Label>
                <Input
                  id="businessAddress"
                  value={businessAddress}
                  onChange={(e) => setBusinessAddress(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
              <div>
                <Label htmlFor="businessPhone">{t('tools.schemaGenerator.businessPhone')}</Label>
                <Input
                  id="businessPhone"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
              <div>
                <Label htmlFor="businessUrl">{t('tools.schemaGenerator.businessUrl')}</Label>
                <Input
                  id="businessUrl"
                  value={businessUrl}
                  onChange={(e) => setBusinessUrl(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
            </TabsContent>

            <TabsContent value="article" className="m-0 space-y-4">
              <div>
                <Label htmlFor="articleTitle">{t('tools.schemaGenerator.articleTitle')}</Label>
                <Input
                  id="articleTitle"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
              <div>
                <Label htmlFor="articleAuthor">{t('tools.schemaGenerator.articleAuthor')}</Label>
                <Input
                  id="articleAuthor"
                  value={articleAuthor}
                  onChange={(e) => setArticleAuthor(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
              <div>
                <Label htmlFor="articleDate">{t('tools.schemaGenerator.articleDate')}</Label>
                <Input
                  id="articleDate"
                  type="date"
                  value={articleDate}
                  onChange={(e) => setArticleDate(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
              <div>
                <Label htmlFor="articleImage">{t('tools.schemaGenerator.articleImage')}</Label>
                <Input
                  id="articleImage"
                  value={articleImage}
                  onChange={(e) => setArticleImage(e.target.value)}
                  className="input-highlight mt-2"
                />
              </div>
            </TabsContent>
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
            <Card className="code-block overflow-x-auto">
              <pre className="text-xs lg:text-sm">
                <code>{`<script type="application/ld+json">\n${schemaJson}\n</script>`}</code>
              </pre>
            </Card>
          </div>
        </div>
      </Tabs>
    </ToolLayout>
    </>
  );
}
