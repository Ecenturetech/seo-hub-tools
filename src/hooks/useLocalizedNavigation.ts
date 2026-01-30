import { useCallback } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getToolPath, getHomePath, toolRoutes, type ToolId, type LanguageCode } from '@/config/routes';

export function useLocalizedNavigation() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  
  const currentLang = (lang || i18n.language || 'en') as LanguageCode;

  const navigateToTool = useCallback((toolId: ToolId) => {
    navigate(getToolPath(toolId, currentLang));
  }, [navigate, currentLang]);

  const navigateToHome = useCallback(() => {
    navigate(getHomePath(currentLang));
  }, [navigate, currentLang]);

  const switchLanguage = useCallback((newLang: LanguageCode) => {
    i18n.changeLanguage(newLang);
    
    // Find current tool from URL and redirect to new language version
    const pathParts = location.pathname.split('/').filter(Boolean);
    
    if (pathParts.length >= 2) {
      const currentSlug = pathParts[1];
      
      // Find which tool this slug belongs to
      for (const [toolId, slugs] of Object.entries(toolRoutes)) {
        if ((Object.values(slugs) as string[]).includes(currentSlug)) {
          navigate(getToolPath(toolId as ToolId, newLang));
          return;
        }
      }
    }
    
    // Default to home page of new language
    navigate(getHomePath(newLang));
  }, [i18n, location.pathname, navigate]);

  const getToolLink = useCallback((toolId: ToolId) => {
    return getToolPath(toolId, currentLang);
  }, [currentLang]);

  const getHomeLink = useCallback(() => {
    return getHomePath(currentLang);
  }, [currentLang]);

  return {
    currentLang,
    navigateToTool,
    navigateToHome,
    switchLanguage,
    getToolLink,
    getHomeLink,
  };
}
