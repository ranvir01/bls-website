"use client";

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface EnhancedImageProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
  fallbackClassName?: string;
}

export const EnhancedImage: React.FC<EnhancedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  fallbackClassName,
  className,
  ...rest
}) => {
  const [error, setError] = useState(false);
  
  // If image fails to load and we have a fallback, use it
  if (error && fallbackSrc) {
    return (
      <div 
        className={`${fallbackClassName || ''}`}
        style={{
          backgroundImage: `url(${fallbackSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: '100%',
          height: '100%'
        }}
        aria-label={alt as string}
        role="img"
      />
    );
  }
  
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...rest}
    />
  );
}; 