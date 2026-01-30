import { cn } from '@/lib/utils';
import logo from '@/assets/logo-dark.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-14',
    md: 'h-20',
    lg: 'h-24',
  };

  return (
    <div className={cn('flex items-center', className)}>
      <img 
        src={logo} 
        alt="SeoLayer Studio" 
        className={cn('w-auto object-contain', sizes[size])}
      />
    </div>
  );
}
