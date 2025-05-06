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
  fill,
  ...props
}: ProgressiveImageProps & { fill?: boolean }) {
  const [isLoading, setIsLoading] = useState(true);

  // If fill is set, ensure wrapper has w-full h-full and relative
  const wrapperClass = cn(
    "overflow-hidden",
    fill ? "relative w-full h-full" : "",
    className
  );

  return (
    <div className={wrapperClass} style={style}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100",
          className
        )}
        fill={fill}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
} 