// Tool route configurations with localized slugs
export const toolRoutes = {
  'serp-simulator': {
    en: 'serp-simulator',
    pt: 'simulador-serp',
    es: 'simulador-serp',
    fr: 'simulateur-serp',
  },
  'schema-generator': {
    en: 'schema-generator',
    pt: 'gerador-schema',
    es: 'generador-schema',
    fr: 'generateur-schema',
  },
  'robots-generator': {
    en: 'robots-txt-generator',
    pt: 'gerador-robots-txt',
    es: 'generador-robots-txt',
    fr: 'generateur-robots-txt',
  },
  'word-counter': {
    en: 'word-counter',
    pt: 'contador-palavras',
    es: 'contador-palabras',
    fr: 'compteur-mots',
  },
  'meta-analyzer': {
    en: 'meta-analyzer',
    pt: 'analisador-meta-tags',
    es: 'analizador-meta-tags',
    fr: 'analyseur-meta-tags',
  },
  'sitemap-generator': {
    en: 'sitemap-generator',
    pt: 'gerador-sitemap',
    es: 'generador-sitemap',
    fr: 'generateur-sitemap',
  },
  'webp-converter': {
    en: 'webp-converter',
    pt: 'conversor-webp',
    es: 'convertidor-webp',
    fr: 'convertisseur-webp',
  },
  'hreflang-generator': {
    en: 'hreflang-generator',
    pt: 'gerador-hreflang',
    es: 'generador-hreflang',
    fr: 'generateur-hreflang',
  },
  'link-validator': {
    en: 'link-validator',
    pt: 'validador-links',
    es: 'validador-enlaces',
    fr: 'validateur-liens',
  },
  'utm-generator': {
    en: 'utm-generator',
    pt: 'gerador-utm',
    es: 'generador-utm',
    fr: 'generateur-utm',
  },
  // New tools
  'lsi-keywords': {
    en: 'lsi-keywords-extractor',
    pt: 'extrator-keywords-lsi',
    es: 'extractor-keywords-lsi',
    fr: 'extracteur-keywords-lsi',
  },
  'seo-checklist': {
    en: 'seo-checklist',
    pt: 'checklist-seo',
    es: 'checklist-seo',
    fr: 'checklist-seo',
  },
  'favicon-simulator': {
    en: 'favicon-simulator',
    pt: 'simulador-favicon',
    es: 'simulador-favicon',
    fr: 'simulateur-favicon',
  },
  'email-obfuscator': {
    en: 'email-obfuscator',
    pt: 'ofuscador-email',
    es: 'ofuscador-email',
    fr: 'obfuscateur-email',
  },
  'diff-checker': {
    en: 'diff-checker',
    pt: 'comparador-texto',
    es: 'comparador-texto',
    fr: 'comparateur-texte',
  },
  'readability-analyzer': {
    en: 'readability-analyzer',
    pt: 'analisador-legibilidade',
    es: 'analizador-legibilidad',
    fr: 'analyseur-lisibilite',
  },
} as const;

export type ToolId = keyof typeof toolRoutes;
export type LanguageCode = 'en' | 'pt' | 'es' | 'fr';

// Tool categories
export const toolCategories = {
  content: ['word-counter', 'lsi-keywords', 'readability-analyzer', 'diff-checker'] as ToolId[],
  technical: ['serp-simulator', 'schema-generator', 'robots-generator', 'sitemap-generator', 'hreflang-generator', 'link-validator', 'utm-generator', 'seo-checklist', 'email-obfuscator'] as ToolId[],
  image: ['webp-converter', 'favicon-simulator'] as ToolId[],
};

// Get localized path for a tool
export function getToolPath(toolId: ToolId, lang: LanguageCode): string {
  return `/${lang}/${toolRoutes[toolId][lang]}`;
}

// Get home path for a language
export function getHomePath(lang: LanguageCode): string {
  return `/${lang}`;
}

// Find tool ID from localized slug
export function findToolIdBySlug(slug: string): ToolId | null {
  for (const [toolId, slugs] of Object.entries(toolRoutes)) {
    if ((Object.values(slugs) as string[]).includes(slug)) {
      return toolId as ToolId;
    }
  }
  return null;
}

// Get all possible slugs for generating routes
export function getAllToolSlugs(): { toolId: ToolId; lang: LanguageCode; slug: string }[] {
  const result: { toolId: ToolId; lang: LanguageCode; slug: string }[] = [];
  
  for (const [toolId, slugs] of Object.entries(toolRoutes)) {
    for (const [lang, slug] of Object.entries(slugs)) {
      result.push({
        toolId: toolId as ToolId,
        lang: lang as LanguageCode,
        slug,
      });
    }
  }
  
  return result;
}
