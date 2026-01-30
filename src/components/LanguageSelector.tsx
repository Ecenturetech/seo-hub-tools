import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { languages } from '@/i18n';
import { toolRoutes, type ToolId, type LanguageCode } from '@/config/routes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();
  
  const currentLang = (lang || i18n.language || 'en') as LanguageCode;

  const handleLanguageChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
    
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    if (pathParts.length >= 2) {
      const currentSlug = pathParts[1];
      
      // Find which tool this slug belongs to
      for (const [toolId, slugs] of Object.entries(toolRoutes)) {
        if ((Object.values(slugs) as string[]).includes(currentSlug)) {
          navigate(`/${newLang}/${toolRoutes[toolId as ToolId][newLang as LanguageCode]}`);
          return;
        }
      }
    }
    
    // Default to home page of new language
    navigate(`/${newLang}`);
  };

  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[140px] bg-card border-border">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <span className="flex items-center gap-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
