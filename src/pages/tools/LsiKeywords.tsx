import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ToolDescription } from '@/components/ToolDescription';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function LsiKeywords() {
  const { t } = useTranslation();
  const [text, setText, clearText] = useLocalStorage('lsi-keywords-text', '');

  const lsiKeywords = useMemo(() => {
    if (!text.trim()) return [];

    const words = text
      .toLowerCase()
      .replace(/[^\w\sáéíóúàèìòùâêîôûãõäëïöüç]/g, '')
      .split(/\s+/)
      .filter((word) => word.length > 3);

    const frequency: Record<string, number> = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    // Common stop words to filter out
    const stopWords = new Set([
      'that', 'this', 'with', 'from', 'have', 'will', 'been', 'were', 'they',
      'como', 'para', 'mais', 'isso', 'esse', 'esta', 'pelo', 'pela', 'seus',
      'como', 'para', 'pero', 'este', 'esta', 'esto', 'esos', 'esas', 'unos',
      'dans', 'pour', 'avec', 'cette', 'sont', 'leur', 'vous', 'nous', 'elle',
    ]);

    return Object.entries(frequency)
      .filter(([word]) => !stopWords.has(word))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([word, count]) => ({
        word,
        count,
        relevance: count >= 5 ? 'high' : count >= 3 ? 'medium' : 'low',
      }));
  }, [text]);

  return (
    <>
      <SEO
        titleKey="tools.lsiKeywords.metaTitle"
        descriptionKey="tools.lsiKeywords.metaDescription"
      />
      <ToolLayout
        title={t('tools.lsiKeywords.name')}
        description={t('tools.lsiKeywords.description')}
        icon={Sparkles}
        toolKey="lsiKeywords"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={clearText} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Label htmlFor="text" className="mb-2 block">
              {t('tools.lsiKeywords.inputLabel')}
            </Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('tools.lsiKeywords.placeholder')}
              className="input-highlight min-h-[300px]"
            />
          </div>

          <div>
            <Label className="mb-2 block">{t('tools.lsiKeywords.results')}</Label>
            <Card className="p-4 min-h-[300px]">
              {lsiKeywords.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  {t('tools.lsiKeywords.emptyState')}
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {lsiKeywords.map((kw) => (
                    <Badge
                      key={kw.word}
                      variant={
                        kw.relevance === 'high'
                          ? 'default'
                          : kw.relevance === 'medium'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="text-sm"
                    >
                      {kw.word} ({kw.count})
                    </Badge>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        <ToolDescription toolKey="lsiKeywords" />
      </ToolLayout>
    </>
  );
}
