import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const { resolvedTheme } = useTheme();
  
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  const logo = resolvedTheme === 'dark' ? logoDark : logoLight;

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
