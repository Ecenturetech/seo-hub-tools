import { Layers } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 'h-6 w-6', iconInner: 'h-3 w-3', text: 'text-base' },
    md: { icon: 'h-8 w-8', iconInner: 'h-4 w-4', text: 'text-lg' },
    lg: { icon: 'h-12 w-12', iconInner: 'h-6 w-6', text: 'text-2xl' },
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn('rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center relative', sizes[size].icon)}>
        <Layers className={cn('text-primary-foreground', sizes[size].iconInner)} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={cn('font-bold text-foreground leading-tight', sizes[size].text)}>
            SeoLayer<span className="text-primary">Studio</span>
          </span>
        </div>
      )}
    </div>
  );
}
