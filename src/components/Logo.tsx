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
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
  };

  // bg_black para modo escuro, bg_white para modo claro
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
