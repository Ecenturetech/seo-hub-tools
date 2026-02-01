import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { FileText } from 'lucide-react';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface DiffLine {
  type: 'added' | 'removed' | 'unchanged';
  content: string;
  lineNumber: number;
}

export default function DiffChecker() {
  const { t } = useTranslation();
  const [text1, setText1, clearText1] = useLocalStorage('diff-checker-text1', '');
  const [text2, setText2, clearText2] = useLocalStorage('diff-checker-text2', '');

  const handleClear = () => {
    clearText1();
    clearText2();
  };

  const diff = useMemo(() => {
    if (!text1 && !text2) return null;

    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');

    const result: DiffLine[] = [];
    const maxLength = Math.max(lines1.length, lines2.length);

    let addedCount = 0;
    let removedCount = 0;
    let unchangedCount = 0;

    for (let i = 0; i < maxLength; i++) {
      const line1 = lines1[i];
      const line2 = lines2[i];

      if (line1 === undefined) {
        result.push({ type: 'added', content: line2, lineNumber: i + 1 });
        addedCount++;
      } else if (line2 === undefined) {
        result.push({ type: 'removed', content: line1, lineNumber: i + 1 });
        removedCount++;
      } else if (line1 === line2) {
        result.push({ type: 'unchanged', content: line1, lineNumber: i + 1 });
        unchangedCount++;
      } else {
        result.push({ type: 'removed', content: line1, lineNumber: i + 1 });
        result.push({ type: 'added', content: line2, lineNumber: i + 1 });
        addedCount++;
        removedCount++;
      }
    }

    return { lines: result, stats: { addedCount, removedCount, unchangedCount } };
  }, [text1, text2]);

  return (
    <>
      <SEO
        titleKey="tools.diffChecker.metaTitle"
        descriptionKey="tools.diffChecker.metaDescription"
      />
      <ToolLayout
        title={t('tools.diffChecker.name')}
        description={t('tools.diffChecker.description')}
        icon={FileText}
        toolKey="diffChecker"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={handleClear} />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <Label htmlFor="text1" className="mb-2 block">
              {t('tools.diffChecker.originalText')}
            </Label>
            <Textarea
              id="text1"
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              placeholder={t('tools.diffChecker.placeholder1')}
              className="input-highlight min-h-[200px] font-mono text-sm"
            />
          </div>
          <div>
            <Label htmlFor="text2" className="mb-2 block">
              {t('tools.diffChecker.modifiedText')}
            </Label>
            <Textarea
              id="text2"
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              placeholder={t('tools.diffChecker.placeholder2')}
              className="input-highlight min-h-[200px] font-mono text-sm"
            />
          </div>
        </div>

        {diff && (
          <div className="mt-6 space-y-4">
            {/* Stats */}
            <div className="flex flex-wrap gap-3">
              <Badge variant="default" className="bg-green-600">
                + {diff.stats.addedCount} {t('tools.diffChecker.added')}
              </Badge>
              <Badge variant="default" className="bg-red-600">
                - {diff.stats.removedCount} {t('tools.diffChecker.removed')}
              </Badge>
              <Badge variant="secondary">
                = {diff.stats.unchangedCount} {t('tools.diffChecker.unchanged')}
              </Badge>
            </div>

            {/* Diff Result */}
            <Card className="p-4 overflow-x-auto">
              <Label className="mb-3 block">{t('tools.diffChecker.result')}</Label>
              <div className="font-mono text-sm space-y-0.5">
                {diff.lines.map((line, index) => (
                  <div
                    key={index}
                    className={`px-2 py-0.5 rounded ${
                      line.type === 'added'
                        ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                        : line.type === 'removed'
                        ? 'bg-red-500/20 text-red-700 dark:text-red-400'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span className="select-none mr-3 opacity-50">
                      {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                    </span>
                    {line.content || ' '}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

      </ToolLayout>
    </>
  );
}
