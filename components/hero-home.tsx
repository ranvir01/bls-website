"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Script from 'next/script';

interface HeroHomeProps {
  onScrollDown?: () => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({ onScrollDown }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Handle initial visibility and scroll position
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="relative h-[100dvh] md:h-screen min-h-[600px] w-full overflow-hidden">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Blue Landscaping Services",
            "image": "https://i.imgur.com/ZLEqCBU.jpg",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Seattle",
              "addressRegion": "WA",
              "addressCountry": "US"
            },
            "telephone": "(253) 217-0814",
            "priceRange": "$$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "127"
            }
          })
        }}
      />

      {/* Preconnect to asset domains */}
      <link rel="preconnect" href="https://images.pexels.com" />
      <link rel="preconnect" href="https://i.imgur.com" />

      {/* Background image with optimized Next.js Image */}
      <div 
        className="absolute inset-0"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }} // Subtle parallax effect
      >
        <Image
          src="https://i.imgur.com/ZLEqCBU.jpg"
          alt="Beautiful landscaped waterfront property with custom stonework and retaining walls in Seattle"
          fill
          priority
          className="object-cover object-center scale-110 brightness-[1.15] contrast-[1.1] saturate-[1.1]"
          sizes="100vw"
          quality={95}
        />
        {/* Enhanced gradient overlay with more contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black/90 via-black/75 to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full items-center pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8">
        <div className="container-custom">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerChildren}
            viewport={{ once: true }}
            className="max-w-4xl relative mt-0 sm:mt-4 md:mt-0 px-0 sm:px-4 md:px-6"
          >
            {/* Trust badges */}
            <motion.div
              variants={fadeIn}
              className="flex items-center gap-4 mb-6 text-white/90"
            >
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">4.9/5 Rating (127+ Reviews)</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="text-sm font-medium">Licensed & Insured</span>
            </motion.div>

            {/* Main headline with enhanced typography */}
            <motion.h1 
              variants={fadeIn}
              className="mb-4 sm:mb-6 md:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 max-w-3xl"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              Expert Landscaping & Hardscaping in <span className="text-blue-300">Seattle</span>
            </motion.h1>
            
            {/* Enhanced subheadline with better contrast */}
            <motion.p 
              variants={fadeIn}
              className="mb-6 sm:mb-8 md:mb-10 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-100 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 max-w-2xl"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              Transform your outdoor space with our premium landscaping services. Specializing in retaining walls, custom patios, and professional irrigation systems.
            </motion.p>
            
            {/* Expandable info section */}
            <motion.div
              variants={fadeIn}
              className="mb-6 sm:mb-8 relative z-20"
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                className="group flex items-center text-gray-100/90 hover:text-white transition-all duration-300 bg-black/20 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 min-h-[48px] sm:min-h-[52px] w-full sm:w-auto relative text-sm sm:text-base hover:bg-black/30"
              >
                <span className="font-medium">Learn more about our expertise</span>
                <ChevronDown className={cn(
                  "ml-1 h-4 w-4 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )} />
              </button>
              
              <motion.div
                initial={false}
                animate={{
                  height: isExpanded ? "auto" : 0,
                  opacity: isExpanded ? 1 : 0,
                  marginTop: isExpanded ? "1rem" : 0,
                  scale: isExpanded ? 1 : 0.98,
                  transformOrigin: "top"
                }}
                transition={{ 
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                  height: { duration: 0.4 }
                }}
                className="overflow-hidden relative rounded-xl"
              >
                <div 
                  className={cn(
                    "bg-black/40 backdrop-blur-sm p-6 text-gray-100 border border-white/10",
                    "overflow-y-auto max-h-[min(60vh,480px)] custom-scrollbar",
                    "shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-xl",
                    "transition-all duration-300"
                  )}
                >
                  <p className="mb-6">
                    From engineered retaining walls and custom paver patios to water-efficient irrigation systems, 
                    we deliver premium solutions that enhance both functionality and beauty. Our expert team has 
                    completed over 3,600 successful projects throughout the Greater Seattle area.
                  </p>
                  <p className="mb-6">
                    Specializing in custom hardscaping solutions including retaining walls, paver patios, and water 
                    features designed for Seattle's unique terrain. Our professional irrigation systems provide efficient 
                    watering solutions engineered specifically for the Pacific Northwest climate.
                  </p>
                  <p className="mb-4">
                    From slope stabilization to outdoor living spaces, we deliver premium landscaping services that 
                    enhance both functionality and beauty. Our expert team has completed over 3,600 successful projects 
                    throughout the Greater Seattle area.
                  </p>
                  <div className="h-8 bg-gradient-to-t from-black/30 via-black/10 to-transparent sticky bottom-0 -mx-6 -mb-6" />
                </div>
              </motion.div>
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 z-10 mt-6 sm:mt-8 md:mt-10"
            >
              <Link
                href="/contact"
                className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Free Consultation
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:2532170814"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Phone className="w-5 h-5" />
                (253) 217-0814
              </a>
            </motion.div>

            {/* Service areas */}
            <motion.p
              variants={fadeIn}
              className="mt-8 text-white/70 text-sm"
            >
              Serving: Seattle • Bellevue • Kirkland • Redmond • Greater Puget Sound Area
            </motion.p>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className={`fixed bottom-8 w-full flex justify-center items-center z-50 px-4 transition-opacity duration-300 ${scrollY > 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <motion.button
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          onClick={onScrollDown}
          className="text-white/70 hover:text-white transition-colors duration-300 flex flex-col items-center gap-2"
        >
          <span className="text-sm font-medium whitespace-nowrap">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </motion.button>
      </div>
    </div>
  );
};