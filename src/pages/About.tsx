import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { Shield, Zap, Users, Heart, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { Logo } from '@/components/Logo';
import type { LanguageCode } from '@/config/routes';

export default function About() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (lang || 'en') as LanguageCode;

  const features = [
    {
      icon: Shield,
      titleKey: 'about.features.privacy.title',
      descKey: 'about.features.privacy.description',
    },
    {
      icon: Zap,
      titleKey: 'about.features.speed.title',
      descKey: 'about.features.speed.description',
    },
    {
      icon: Users,
      titleKey: 'about.features.accessibility.title',
      descKey: 'about.features.accessibility.description',
    },
  ];

  return (
    <>
      <SEO
        titleKey="about.metaTitle"
        descriptionKey="about.metaDescription"
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
          <div className="text-center mb-16">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              {t('about.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          {/* Story */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">{t('about.story.title')}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {t('about.story.content')}
            </p>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              {t('about.whyChooseUs')}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="text-center">
                    <CardContent className="pt-6">
                      <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold mb-2">{t(feature.titleKey)}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t(feature.descKey)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Privacy Highlight */}
          <section className="mb-16">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {t('about.privacy.title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('about.privacy.content')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Mission */}
          <section className="text-center mb-16">
            <div className="inline-flex p-3 rounded-full bg-primary/10 mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">{t('about.mission.title')}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('about.mission.content')}
            </p>
          </section>

          {/* CTA */}
          <section className="text-center">
            <Link to={`/${currentLang}`}>
              <Button size="lg">
                {t('about.cta')}
              </Button>
            </Link>
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
