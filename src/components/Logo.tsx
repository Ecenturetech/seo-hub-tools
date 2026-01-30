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
    sm: 'h-14',
    md: 'h-20',
    lg: 'h-24',
  };

  useEffect(() => {
    setMounted(true);
  }, []);

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
