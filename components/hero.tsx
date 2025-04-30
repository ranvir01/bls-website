import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface HeroProps {
  title: string;
  subtitle?: string;
  image: string;
  buttonText?: string;
  buttonLink?: string;
  overlay?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'center' | 'top' | 'bottom';
}

export const Hero = ({
  title,
  subtitle,
  image,
  buttonText,
  buttonLink = '/contact',
  overlay = true,
  className,
  size = 'lg',
  position = 'center',
}: HeroProps) => {
  const heightClasses = {
    sm: 'h-[30vh] md:h-[40vh]',
    md: 'h-[50vh] md:h-[60vh]',
    lg: 'h-[70vh] md:h-[80vh]',
  };

  const positionClasses = {
    center: 'bg-center',
    top: 'bg-top',
    bottom: 'bg-bottom',
  };

  return (
    <div
      className={cn(
        'relative w-full flex items-center justify-center',
        heightClasses[size],
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          className={cn(
            'object-cover',
            positionClasses[position]
          )}
          fill
          priority
          sizes="100vw"
          quality={90}
        />
        {overlay && (
          <div className="absolute inset-0 bg-blue-900/40" />
        )}
      </div>
      <div className="container-custom relative z-10 text-center text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
        {subtitle && (
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 drop-shadow">{subtitle}</p>
        )}
        {buttonText && (
          <Link href={buttonLink} className="btn-primary">
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};