import { useTranslation } from 'react-i18next';
import { Lightbulb, Target, BookOpen, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';

interface ToolContentProps {
  toolKey: string;
}

export function ToolContent({ toolKey }: ToolContentProps) {
  const { t } = useTranslation();

  return (
    <article className="mt-12 space-y-8">
      {/* Main Title */}
      <header>
        <h2 className="text-2xl font-bold text-foreground mb-4">
          {t(`tools.${toolKey}.content.title`)}
        </h2>
        <p className="text-muted-foreground leading-relaxed text-base">
          {t(`tools.${toolKey}.content.introduction`)}
        </p>
      </header>

      {/* How to Use Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {t(`tools.${toolKey}.content.howToUseTitle`)}
          </h3>
        </div>
        <div className="pl-12 space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.howToUse`)}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.howToUseDetails`)}
          </p>
        </div>
      </section>

      {/* Why Important Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {t(`tools.${toolKey}.content.whyImportantTitle`)}
          </h3>
        </div>
        <div className="pl-12 space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.whyImportant`)}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.whyImportantDetails`)}
          </p>
        </div>
      </section>

      {/* Best Practices Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <CheckCircle2 className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">
            {t(`tools.${toolKey}.content.bestPracticesTitle`)}
          </h3>
        </div>
        <div className="pl-12 space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.bestPractices`)}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.bestPracticesDetails`)}
          </p>
        </div>
      </section>

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
              {t(`tools.${toolKey}.content.goldenTip`)}
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              {t(`tools.${toolKey}.content.goldenTipDetails`)}
            </p>
          </div>
        </div>
      </Card>

      {/* Use Cases Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          {t(`tools.${toolKey}.content.useCasesTitle`)}
        </h3>
        <div className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.useCases`)}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.useCasesDetails`)}
          </p>
        </div>
      </section>

      {/* Technical Concepts Section */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-foreground">
          {t(`tools.${toolKey}.content.technicalTitle`)}
        </h3>
        <div className="space-y-3">
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.technical`)}
          </p>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.technicalDetails`)}
          </p>
        </div>
      </section>
    </article>
  );
}
