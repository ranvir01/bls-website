import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ServicePatternProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'dots' | 'lines';
  color?: 'blue' | 'green' | 'transparent';
}

export const ServicePattern = ({
  children,
  className,
  variant = 'default',
  color = 'blue',
}: ServicePatternProps) => {
  const colorClasses = {
    blue: 'bg-blue-500/5',
    green: 'bg-green-500/5',
    transparent: 'bg-transparent',
  };

  const patternStyles = {
    default: {
      backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    dots: {
      backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
    lines: {
      backgroundImage: 
        'linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
      backgroundSize: '20px 20px',
    },
  };

  return (
    <div 
      className={cn(
        'relative overflow-hidden',
        colorClasses[color],
        className
      )}
      style={patternStyles[variant]}
    >
      {children}
    </div>
  );
};