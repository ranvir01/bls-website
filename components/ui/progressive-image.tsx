"use client";

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  className?: string;
  style?: React.CSSProperties;
}

export function ProgressiveImage({
  src,
  alt,
  className,
  style,
  ...props
}: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", className)} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
} 