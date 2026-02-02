import { useTranslation } from 'react-i18next';
import { Lightbulb, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';

interface ToolContentProps {
  toolKey: string;
}

export function ToolContent({ toolKey }: ToolContentProps) {
  const { t, i18n } = useTranslation();

  // Helper to check if a translation key exists (doesn't return the key itself)
  const hasTranslation = (key: string): boolean => {
    const translation = t(key);
    return translation !== key && translation !== '';
  };

  // Helper to get translation only if it exists
  const getTranslation = (key: string): string | null => {
    const translation = t(key);
    return translation !== key ? translation : null;
  };

  const contentPrefix = `tools.${toolKey}.content`;

  // Check which sections are available
  const hasIntroduction = hasTranslation(`${contentPrefix}.introduction`);
  const hasHowToUseDetails = hasTranslation(`${contentPrefix}.howToUseDetails`);
  const hasWhyImportantDetails = hasTranslation(`${contentPrefix}.whyImportantDetails`);
  const hasBestPractices = hasTranslation(`${contentPrefix}.bestPracticesTitle`);
  const hasGoldenTipDetails = hasTranslation(`${contentPrefix}.goldenTipDetails`);
  const hasUseCases = hasTranslation(`${contentPrefix}.useCasesTitle`);
  const hasTechnical = hasTranslation(`${contentPrefix}.technicalTitle`);

  return (
    <article className="mt-12 space-y-8">
      {/* Main Title */}
      <header>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {t(`${contentPrefix}.title`)}
        </h2>
        {hasIntroduction ? (
          <p className="text-muted-foreground leading-relaxed text-base">
            {t(`${contentPrefix}.introduction`)}
          </p>
        ) : null}
      </header>

      {/* How to Use Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {t(`${contentPrefix}.howToUseTitle`)}
          </h3>
        </div>
        <div className="pl-12 space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`${contentPrefix}.howToUse`)}
          </p>
          {hasHowToUseDetails && (
            <p className="text-muted-foreground leading-relaxed">
              {t(`${contentPrefix}.howToUseDetails`)}
            </p>
          )}
        </div>
      </section>

      {/* Why Important Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {t(`${contentPrefix}.whyImportantTitle`)}
          </h3>
        </div>
        <div className="pl-12 space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`${contentPrefix}.whyImportant`)}
          </p>
          {hasWhyImportantDetails && (
            <p className="text-muted-foreground leading-relaxed">
              {t(`${contentPrefix}.whyImportantDetails`)}
            </p>
          )}
        </div>
      </section>

      {/* Best Practices Section - only if available */}
      {hasBestPractices && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">
              {t(`${contentPrefix}.bestPracticesTitle`)}
            </h3>
          </div>
          <div className="pl-12 space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              {t(`${contentPrefix}.bestPractices`)}
            </p>
            {hasTranslation(`${contentPrefix}.bestPracticesDetails`) && (
              <p className="text-muted-foreground leading-relaxed">
                {t(`${contentPrefix}.bestPracticesDetails`)}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Golden Tip Card */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2 text-lg">
              {t('common.goldenTip')}
            </h4>
            <p className="text-muted-foreground leading-relaxed">
              {t(`${contentPrefix}.goldenTip`)}
            </p>
            {hasGoldenTipDetails && (
              <p className="text-muted-foreground leading-relaxed mt-2">
                {t(`${contentPrefix}.goldenTipDetails`)}
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Use Cases Section - only if available */}
      {hasUseCases && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {t(`${contentPrefix}.useCasesTitle`)}
          </h3>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              {t(`${contentPrefix}.useCases`)}
            </p>
            {hasTranslation(`${contentPrefix}.useCasesDetails`) && (
              <p className="text-muted-foreground leading-relaxed">
                {t(`${contentPrefix}.useCasesDetails`)}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Technical Concepts Section - only if available */}
      {hasTechnical && (
        <section className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">
            {t(`${contentPrefix}.technicalTitle`)}
          </h3>
          <div className="space-y-3">
            <p className="text-muted-foreground leading-relaxed">
              {t(`${contentPrefix}.technical`)}
            </p>
            {hasTranslation(`${contentPrefix}.technicalDetails`) && (
              <p className="text-muted-foreground leading-relaxed">
                {t(`${contentPrefix}.technicalDetails`)}
              </p>
            )}
          </div>
        </section>
      )}
    </article>
  );
}
