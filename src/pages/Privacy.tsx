import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Cookie, Database, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { Logo } from '@/components/Logo';
import type { LanguageCode } from '@/config/routes';

export default function Privacy() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (lang || 'en') as LanguageCode;

  const sections = [
    {
      icon: Shield,
      titleKey: 'privacy.dataProcessing.title',
      contentKey: 'privacy.dataProcessing.content',
    },
    {
      icon: Cookie,
      titleKey: 'privacy.cookies.title',
      contentKey: 'privacy.cookies.content',
    },
    {
      icon: Database,
      titleKey: 'privacy.localStorage.title',
      contentKey: 'privacy.localStorage.content',
    },
    {
      icon: AlertTriangle,
      titleKey: 'privacy.disclaimer.title',
      contentKey: 'privacy.disclaimer.content',
    },
  ];

  return (
    <>
      <SEO
        titleKey="privacy.metaTitle"
        descriptionKey="privacy.metaDescription"
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to={`/${currentLang}`}>
              <Logo size="sm" />
            </Link>
            <Link to={`/${currentLang}`}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t('common.backToHome')}
              </Button>
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
          {/* Hero */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('privacy.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('privacy.lastUpdated')}: {new Date().toLocaleDateString(currentLang)}
            </p>
          </div>

          {/* Introduction */}
          <section className="mb-12">
            <p className="text-muted-foreground leading-relaxed">
              {t('privacy.intro')}
            </p>
          </section>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, index) => {
              const Icon = section.icon;
              return (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      {t(section.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {t(section.contentKey)}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Google Privacy Link */}
          <section className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              {t('privacy.googlePrivacy')}
            </p>
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              Google Privacy Policy →
            </a>
          </section>

          {/* Contact */}
          <section className="mt-12 text-center">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  {t('privacy.contact')}
                </p>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm text-muted-foreground">
              {t('footer.madeWith')} ❤️ {t('footer.for')}
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
