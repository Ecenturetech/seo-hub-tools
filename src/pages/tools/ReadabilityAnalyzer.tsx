import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BookOpen } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ToolDescription } from '@/components/ToolDescription';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ReadabilityMetrics {
  fleschKincaid: number;
  fleschReadingEase: number;
  sentences: number;
  words: number;
  syllables: number;
  avgWordsPerSentence: number;
  avgSyllablesPerWord: number;
  readingLevel: string;
  readingTime: number;
}

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-záéíóúàèìòùâêîôûãõäëïöüç]/g, '');
  if (word.length <= 3) return 1;
  
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}

function getReadingLevel(score: number, t: (key: string) => string): string {
  if (score >= 90) return t('tools.readabilityAnalyzer.levels.veryEasy');
  if (score >= 80) return t('tools.readabilityAnalyzer.levels.easy');
  if (score >= 70) return t('tools.readabilityAnalyzer.levels.fairlyEasy');
  if (score >= 60) return t('tools.readabilityAnalyzer.levels.standard');
  if (score >= 50) return t('tools.readabilityAnalyzer.levels.fairlyDifficult');
  if (score >= 30) return t('tools.readabilityAnalyzer.levels.difficult');
  return t('tools.readabilityAnalyzer.levels.veryDifficult');
}

export default function ReadabilityAnalyzer() {
  const { t } = useTranslation();
  const [text, setText, clearText] = useLocalStorage('readability-analyzer-text', '');

  const metrics = useMemo((): ReadabilityMetrics | null => {
    if (!text.trim()) return null;

    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const words = text
      .replace(/[^\w\sáéíóúàèìòùâêîôûãõäëïöüç]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 0);

    if (sentences.length === 0 || words.length === 0) return null;

    const totalSyllables = words.reduce((sum, word) => sum + countSyllables(word), 0);
    const avgWordsPerSentence = words.length / sentences.length;
    const avgSyllablesPerWord = totalSyllables / words.length;

    // Flesch Reading Ease
    const fleschReadingEase =
      206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

    // Flesch-Kincaid Grade Level
    const fleschKincaid =
      0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

    // Reading time (average 200 words per minute)
    const readingTime = Math.ceil(words.length / 200);

    return {
      fleschKincaid: Math.max(0, Math.round(fleschKincaid * 10) / 10),
      fleschReadingEase: Math.min(100, Math.max(0, Math.round(fleschReadingEase * 10) / 10)),
      sentences: sentences.length,
      words: words.length,
      syllables: totalSyllables,
      avgWordsPerSentence: Math.round(avgWordsPerSentence * 10) / 10,
      avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 100) / 100,
      readingLevel: getReadingLevel(fleschReadingEase, t),
      readingTime,
    };
  }, [text, t]);

  const getScoreColor = (score: number) => {
    if (score >= 60) return 'text-green-600 dark:text-green-400';
    if (score >= 40) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <>
      <SEO
        titleKey="tools.readabilityAnalyzer.metaTitle"
        descriptionKey="tools.readabilityAnalyzer.metaDescription"
      />
      <ToolLayout
        title={t('tools.readabilityAnalyzer.name')}
        description={t('tools.readabilityAnalyzer.description')}
        icon={BookOpen}
        toolKey="readabilityAnalyzer"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={clearText} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <Label htmlFor="text" className="mb-2 block">
              {t('tools.readabilityAnalyzer.inputLabel')}
            </Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={t('tools.readabilityAnalyzer.placeholder')}
              className="input-highlight min-h-[300px]"
            />
          </div>

          <div className="space-y-4">
            {metrics ? (
              <>
                {/* Main Score */}
                <Card className="p-6 text-center">
                  <div className={`text-5xl font-bold ${getScoreColor(metrics.fleschReadingEase)}`}>
                    {metrics.fleschReadingEase}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {t('tools.readabilityAnalyzer.fleschScore')}
                  </div>
                  <div className="mt-3 font-medium">{metrics.readingLevel}</div>
                  <Progress value={metrics.fleschReadingEase} className="mt-3 h-2" />
                </Card>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{metrics.words}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('tools.readabilityAnalyzer.words')}
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{metrics.sentences}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('tools.readabilityAnalyzer.sentences')}
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{metrics.avgWordsPerSentence}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('tools.readabilityAnalyzer.avgWords')}
                    </div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{metrics.readingTime} min</div>
                    <div className="text-xs text-muted-foreground">
                      {t('tools.readabilityAnalyzer.readingTime')}
                    </div>
                  </Card>
                </div>

                {/* Grade Level */}
                <Card className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {t('tools.readabilityAnalyzer.gradeLevel')}
                    </span>
                    <span className="font-bold text-primary">
                      {metrics.fleschKincaid}
                    </span>
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">
                  {t('tools.readabilityAnalyzer.emptyState')}
                </p>
              </Card>
            )}
          </div>
        </div>

        <ToolDescription toolKey="readabilityAnalyzer" />
      </ToolLayout>
    </>
  );
}
