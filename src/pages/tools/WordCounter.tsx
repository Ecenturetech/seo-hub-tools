import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart3 } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { SEO } from '@/components/SEO';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function WordCounter() {
  const { t } = useTranslation();
  const [text, setText] = useState('');

  const analysis = useMemo(() => {
    if (!text.trim()) {
      return {
        totalWords: 0,
        uniqueWords: 0,
        avgWordLength: 0,
        keywords: [],
      };
    }

    // Clean and split words
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter((word) => word.length > 2); // Filter very short words

    const totalWords = words.length;
    const wordFrequency: Record<string, number> = {};

    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    const uniqueWords = Object.keys(wordFrequency).length;
    const avgWordLength =
      words.reduce((sum, word) => sum + word.length, 0) / totalWords || 0;

    const keywords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({
        word,
        count,
        density: ((count / totalWords) * 100).toFixed(2),
      }));

    return {
      totalWords,
      uniqueWords,
      avgWordLength: avgWordLength.toFixed(1),
      keywords,
    };
  }, [text]);

  return (
    <>
      <SEO
        titleKey="tools.wordCounter.metaTitle"
        descriptionKey="tools.wordCounter.metaDescription"
      />
      <ToolLayout
        title={t('tools.wordCounter.name')}
        description={t('tools.wordCounter.description')}
        icon={BarChart3}
        toolKey="wordCounter"
      >
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <Label htmlFor="text" className="mb-2 block">{t('common.analyze')}</Label>
          <Textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={t('tools.wordCounter.placeholder')}
            className="input-highlight min-h-[300px]"
          />
        </div>

        <div className="space-y-6">
          {/* Stats cards */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{analysis.totalWords}</div>
              <div className="text-xs text-muted-foreground mt-1">{t('tools.wordCounter.totalWords')}</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{analysis.uniqueWords}</div>
              <div className="text-xs text-muted-foreground mt-1">{t('tools.wordCounter.uniqueWords')}</div>
            </Card>
            <Card className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{analysis.avgWordLength}</div>
              <div className="text-xs text-muted-foreground mt-1">{t('tools.wordCounter.avgWordLength')}</div>
            </Card>
          </div>

          {/* Keywords table */}
          <div>
            <Label className="mb-3 block">{t('tools.wordCounter.topKeywords')}</Label>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t('tools.wordCounter.keyword')}</TableHead>
                    <TableHead className="text-center">{t('tools.wordCounter.count')}</TableHead>
                    <TableHead className="text-right">{t('tools.wordCounter.density')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analysis.keywords.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground py-8">
                        {t('tools.wordCounter.placeholder').split('...')[0]}...
                      </TableCell>
                    </TableRow>
                  ) : (
                    analysis.keywords.map((kw, index) => (
                      <TableRow key={kw.word}>
                        <TableCell className="font-medium">
                          <span className="text-muted-foreground mr-2">{index + 1}.</span>
                          {kw.word}
                        </TableCell>
                        <TableCell className="text-center">{kw.count}</TableCell>
                        <TableCell className="text-right">{kw.density}%</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </div>
      </ToolLayout>
    </>
  );
}
