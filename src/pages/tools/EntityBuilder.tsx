import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Network, Copy, Check, User, MapPin, Lightbulb, Building, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolLayout } from '@/components/ToolLayout';
import { ClearDataButton } from '@/components/ClearDataButton';
import { SEO } from '@/components/SEO';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Entity {
  name: string;
  type: 'person' | 'place' | 'concept' | 'organization' | 'event';
}

export default function EntityBuilder() {
  const { t } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const storageKey = `entity-builder_${lang || 'en'}`;
  
  const [topic, setTopic] = useLocalStorage(`${storageKey}_topic`, '');
  const [entities, setEntities] = useState<Entity[]>([]);
  const [copied, setCopied] = useState(false);

  const entityIcons = {
    person: User,
    place: MapPin,
    concept: Lightbulb,
    organization: Building,
    event: Calendar,
  };

  const entityColors = {
    person: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
    place: 'bg-green-500/10 text-green-600 border-green-500/20',
    concept: 'bg-purple-500/10 text-purple-600 border-purple-500/20',
    organization: 'bg-orange-500/10 text-orange-600 border-orange-500/20',
    event: 'bg-pink-500/10 text-pink-600 border-pink-500/20',
  };

  const generateEntities = () => {
    if (!topic.trim()) return;

    // Semantic entity extraction based on common patterns
    const words = topic.toLowerCase().split(/\s+/);
    const suggestedEntities: Entity[] = [];

    // Common entity patterns and suggestions
    const entityPatterns: Record<string, { type: Entity['type']; related: string[] }> = {
      seo: { type: 'concept', related: ['Google', 'Search Engine', 'Ranking', 'Keywords', 'Backlinks', 'PageRank'] },
      marketing: { type: 'concept', related: ['Brand', 'Campaign', 'Audience', 'Conversion', 'ROI', 'Philip Kotler'] },
      technology: { type: 'concept', related: ['Innovation', 'Software', 'Hardware', 'AI', 'Digital Transformation'] },
      business: { type: 'concept', related: ['Strategy', 'Revenue', 'Market', 'Competition', 'Growth'] },
      health: { type: 'concept', related: ['Wellness', 'Medicine', 'Nutrition', 'Exercise', 'WHO'] },
      travel: { type: 'concept', related: ['Destination', 'Tourism', 'Culture', 'Adventure', 'Hospitality'] },
      food: { type: 'concept', related: ['Cuisine', 'Recipe', 'Nutrition', 'Restaurant', 'Chef'] },
      sports: { type: 'concept', related: ['Competition', 'Training', 'Athletes', 'Championship', 'Fitness'] },
      education: { type: 'concept', related: ['Learning', 'Curriculum', 'University', 'Knowledge', 'Training'] },
      finance: { type: 'concept', related: ['Investment', 'Banking', 'Stock Market', 'Economy', 'Budget'] },
    };

    // Check for matching patterns
    for (const [keyword, data] of Object.entries(entityPatterns)) {
      if (words.some(w => w.includes(keyword) || keyword.includes(w))) {
        data.related.forEach(entity => {
          const type = entity.match(/^[A-Z]/) && entity.split(' ').length <= 2 
            ? (Math.random() > 0.5 ? 'person' : 'organization')
            : 'concept';
          suggestedEntities.push({ name: entity, type: type as Entity['type'] });
        });
      }
    }

    // Add generic entities based on topic words
    if (suggestedEntities.length === 0) {
      const genericEntities = [
        { name: `${topic} experts`, type: 'person' as const },
        { name: `${topic} industry`, type: 'concept' as const },
        { name: `${topic} market`, type: 'concept' as const },
        { name: `${topic} trends`, type: 'concept' as const },
        { name: `${topic} best practices`, type: 'concept' as const },
        { name: `${topic} organizations`, type: 'organization' as const },
      ];
      suggestedEntities.push(...genericEntities);
    }

    // Remove duplicates and limit
    const uniqueEntities = Array.from(
      new Map(suggestedEntities.map(e => [e.name, e])).values()
    ).slice(0, 12);

    setEntities(uniqueEntities);
  };

  const handleCopy = async () => {
    const text = entities.map(e => `- ${e.name} (${e.type})`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setTopic('');
    setEntities([]);
  };

  return (
    <>
      <SEO
        titleKey="tools.entityBuilder.metaTitle"
        descriptionKey="tools.entityBuilder.metaDescription"
      />
      <ToolLayout
        title={t('tools.entityBuilder.name')}
        description={t('tools.entityBuilder.description')}
        icon={Network}
        toolKey="entityBuilder"
      >
        <div className="flex justify-end mb-4">
          <ClearDataButton onClear={handleClear} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5 text-primary" />
                {t('tools.entityBuilder.inputTitle')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">{t('tools.entityBuilder.topic')}</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t('tools.entityBuilder.topicPlaceholder')}
                  className="mt-1"
                />
              </div>

              <Button onClick={generateEntities} className="w-full">
                {t('common.generate')}
              </Button>

              {/* Legend */}
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">{t('tools.entityBuilder.legend')}</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(entityIcons).map(([type, Icon]) => (
                    <Badge key={type} variant="outline" className={entityColors[type as keyof typeof entityColors]}>
                      <Icon className="h-3 w-3 mr-1" />
                      {t(`tools.entityBuilder.types.${type}`)}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card>
            <CardHeader>
              <CardTitle>{t('tools.entityBuilder.resultTitle')}</CardTitle>
            </CardHeader>
            <CardContent>
              {entities.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {entities.map((entity, index) => {
                      const Icon = entityIcons[entity.type];
                      return (
                        <Badge
                          key={index}
                          variant="outline"
                          className={`${entityColors[entity.type]} py-2 px-3`}
                        >
                          <Icon className="h-3 w-3 mr-1" />
                          {entity.name}
                        </Badge>
                      );
                    })}
                  </div>
                  
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      {t('tools.entityBuilder.aiNote')}
                    </p>
                  </div>

                  <Button onClick={handleCopy} variant="outline" className="w-full">
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    {copied ? t('common.copied') : t('common.copy')}
                  </Button>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  {t('tools.entityBuilder.emptyState')}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </ToolLayout>
    </>
  );
}
