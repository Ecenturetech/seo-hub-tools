import { useTranslation } from 'react-i18next';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';

interface ClearDataButtonProps {
  onClear: () => void;
}

export function ClearDataButton({ onClear }: ClearDataButtonProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleClear = () => {
    onClear();
    toast({
      title: t('common.dataCleared'),
      description: t('common.dataClearedDescription'),
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClear}
      className="text-muted-foreground hover:text-destructive"
    >
      <Trash2 className="h-4 w-4 mr-2" />
      {t('common.clearData')}
    </Button>
  );
}
