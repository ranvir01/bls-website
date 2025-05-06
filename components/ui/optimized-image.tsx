"use client";

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  wrapperClassName?: string;
}

export function OptimizedImage({
  src,
  alt,
  className,
  wrapperClassName,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          isLoaded ? "opacity-100" : "opacity-0",
          className
        )}
        priority={priority}
        onLoad={() => setIsLoaded(true)}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
      
      {!isLoaded && !priority && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          aria-hidden="true"
        />
      )}
    </div>
  );
} 