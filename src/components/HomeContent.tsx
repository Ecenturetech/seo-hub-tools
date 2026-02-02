import { useTranslation } from 'react-i18next';
import { Shield, Zap, Lock, Code2, Globe, Users } from 'lucide-react';
import { Card } from './ui/card';

export function HomeContent() {
  const { t } = useTranslation();

  return (
    <article className="py-16 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Main Introduction */}
        <section className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            {t('home.content.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('home.content.introduction')}
          </p>
        </section>

        {/* What is SeoLayer Studio */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {t('home.content.whatIsTitle')}
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.whatIs1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.whatIs2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.whatIs3')}
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section>
          <h3 className="text-2xl font-semibold text-foreground mb-8">
            {t('home.content.featuresTitle')}
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{t('home.content.feature1Title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('home.content.feature1Text')}
              </p>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{t('home.content.feature2Title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('home.content.feature2Text')}
              </p>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{t('home.content.feature3Title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('home.content.feature3Text')}
              </p>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{t('home.content.feature4Title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('home.content.feature4Text')}
              </p>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{t('home.content.feature5Title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('home.content.feature5Text')}
              </p>
            </Card>

            <Card className="p-6">
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-semibold text-lg mb-2">{t('home.content.feature6Title')}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('home.content.feature6Text')}
              </p>
            </Card>
          </div>
        </section>

        {/* Why Client-Side Processing */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {t('home.content.clientSideTitle')}
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.clientSide1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.clientSide2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.clientSide3')}
            </p>
          </div>
        </section>

        {/* How It Helps Developers */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {t('home.content.developersTitle')}
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.developers1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.developers2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.developers3')}
            </p>
          </div>
        </section>

        {/* SEO and AIO */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {t('home.content.seoAioTitle')}
          </h3>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.seoAio1')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.seoAio2')}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {t('home.content.seoAio3')}
            </p>
          </div>
        </section>

        {/* Categories Overview */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-foreground">
            {t('home.content.categoriesTitle')}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-background border">
              <h4 className="font-semibold mb-2">{t('categories.content')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('home.content.categoryContent')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <h4 className="font-semibold mb-2">{t('categories.technical')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('home.content.categoryTechnical')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <h4 className="font-semibold mb-2">{t('categories.image')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('home.content.categoryImage')}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-background border">
              <h4 className="font-semibold mb-2">{t('categories.aio')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('home.content.categoryAio')}
              </p>
            </div>
          </div>
        </section>
      </div>
    </article>
  );
}
