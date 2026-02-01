import { useTranslation } from 'react-i18next';
import { Lightbulb } from 'lucide-react';
import { Card } from './ui/card';

interface ToolDescriptionProps {
  toolKey: string;
}

export function ToolDescription({ toolKey }: ToolDescriptionProps) {
  const { t } = useTranslation();

  return (
    <section className="mt-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground">
        {t(`tools.${toolKey}.content.title`)}
      </h2>
      
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {t(`tools.${toolKey}.content.howToUseTitle`)}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.howToUse`)}
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            {t(`tools.${toolKey}.content.whyImportantTitle`)}
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {t(`tools.${toolKey}.content.whyImportant`)}
          </p>
        </div>
      </div>

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-foreground mb-1">
              {t('common.goldenTip')}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t(`tools.${toolKey}.content.goldenTip`)}
            </p>
          </div>
        </div>
      </Card>
    </section>
  );
}
