"use client";

import React from 'react';
import Image from 'next/image';

interface LocalityHeroProps {
  title: string;
  description: string;
  backgroundImage: string;
}

export const LocalityHero: React.FC<LocalityHeroProps> = ({
  title,
  description,
  backgroundImage
}) => {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        className="object-cover brightness-50"
        priority
      />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-100 mb-8">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}; 