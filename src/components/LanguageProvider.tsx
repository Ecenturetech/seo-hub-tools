import { useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageProviderProps {
  lang: string;
  children: ReactNode;
}

export function LanguageProvider({ lang, children }: LanguageProviderProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  return <>{children}</>;
}
