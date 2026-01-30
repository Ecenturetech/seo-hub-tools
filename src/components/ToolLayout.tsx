import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';

interface ToolLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: React.ElementType;
}

export function ToolLayout({ children, title, description, icon: Icon }: ToolLayoutProps) {
  const { t } = useTranslation();

  return (
    <div className="p-4 lg:p-8 max-w-5xl mx-auto">
      {/* Back button - mobile only */}
      <Link to="/" className="lg:hidden">
        <Button variant="ghost" size="sm" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {t('common.backToHome')}
        </Button>
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-3">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-in">
        {children}
      </div>

      {/* Ad placeholder */}
      <div className="mt-8">
        <div className="ad-placeholder py-8">
          <p>{t('common.adPlaceholder')}</p>
          <p className="text-xs mt-1">728 x 90</p>
        </div>
      </div>
    </div>
  );
}
