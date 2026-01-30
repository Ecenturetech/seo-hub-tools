import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className, size = 'md' }: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const sizes = {
    sm: 'h-12',
    md: 'h-16',
    lg: 'h-20',
  };

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // bg_black para modo escuro, bg_white para modo claro
  const logo = resolvedTheme === 'dark' ? logoDark : logoLight;

  if (!mounted) {
    return (
      <div className={cn('flex items-center', className)}>
        <div className={cn('w-auto bg-transparent', sizes[size])} />
      </div>
    );
  }

  return (
    <div className={cn('flex items-center', className)}>
      <img 
        key={resolvedTheme}
        src={logo} 
        alt="SeoLayer Studio" 
        className={cn('w-auto object-contain', sizes[size])}
      />
    </div>
  );
}
