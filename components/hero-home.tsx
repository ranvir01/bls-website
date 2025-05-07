"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown, Phone, ArrowRight, Star, Shield, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import Script from 'next/script';
import { QuoteButton } from '@/components/quote-button';

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
    <div className="relative h-[100dvh] md:h-screen min-h-[600px] w-full overflow-hidden bg-blue-900">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Blue Landscaping Services",
            "image": "/images/hero-home.jpg",
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

      {/* Background image with optimized Next.js Image */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-blue-900 to-blue-800"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }} // Subtle parallax effect
      >
        <Image
          src="/images/hero-home.jpg"
          alt="Beautiful landscaped waterfront property with custom stonework and retaining walls in Seattle"
          fill
          priority
          fetchPriority="high"
          unoptimized
          className="object-cover object-center scale-110 brightness-[0.6] contrast-[1.1] saturate-[1.1]"
          sizes="100vw"
          quality={90}
          loading="eager"
        />
        {/* Enhanced gradient overlay with more contrast for text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-transparent md:bg-gradient-to-r md:from-black/90 md:via-black/75 md:to-transparent" />
      </div>

      {/* Content container */}
      <div className="relative z-10 flex h-full items-center pt-12 sm:pt-16 md:pt-24 px-4 sm:px-6 md:px-8">
        <div className="container-custom w-full">
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={staggerChildren}
            viewport={{ once: true }}
            className="max-w-4xl relative mt-0 sm:mt-0 md:mt-0 px-0 sm:px-4 md:px-6 mx-auto w-full"
          >
            {/* Main headline with enhanced typography */}
            <motion.h1 
              variants={fadeIn}
              className="mb-2 sm:mb-4 md:mb-6 text-xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-white drop-shadow-xl hover:drop-shadow-2xl transition-all duration-300 max-w-3xl text-center mx-auto"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}
            >
              Expert Landscaping & Hardscaping in <span className="text-blue-300">Seattle</span>
            </motion.h1>
            
            {/* Enhanced subheadline with better contrast */}
            <motion.p 
              variants={fadeIn}
              className="mb-3 sm:mb-6 md:mb-8 text-xs sm:text-lg md:text-xl leading-relaxed text-gray-100 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 max-w-2xl text-center mx-auto"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
            >
              Transform your outdoor space with our premium landscaping services. Specializing in retaining walls, custom patios, and professional irrigation systems.
            </motion.p>

            {/* Move badges/payment section here, just above CTA buttons */}
            <div className="w-full flex flex-col items-center mb-6">
              <motion.div
                variants={fadeIn}
                className="flex flex-wrap items-center gap-1 sm:gap-4 mb-2 sm:mb-4 text-white/90 justify-center"
              >
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-[10px] sm:text-sm font-medium">4.8/5 Rating (127+ Reviews)</span>
                </div>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/30 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-[10px] sm:text-sm font-medium">License No. BLUELLS880K2</span>
                </div>
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-white/30 hidden sm:block" />
                <div className="flex items-center gap-1">
                  <CreditCard className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-[10px] sm:text-sm font-medium">Multiple Payment Options</span>
                </div>
              </motion.div>
              <motion.div
                variants={fadeIn}
                className="w-full flex justify-center mb-2 sm:mb-6"
              >
                <div className="flex flex-col items-center">
                  <span className="text-[10px] sm:text-xs text-white/90 mb-1 text-center">Accepted Payments:</span>
                  <div className="flex flex-wrap justify-center gap-1 bg-white/10 backdrop-blur-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full">
                    <span className="text-[8px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-white">Zelle</span>
                    <span className="text-[8px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-white">Venmo</span>
                    <span className="text-[8px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-white">PayPal</span>
                    <span className="text-[8px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-white">Cash</span>
                    <span className="text-[8px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-white">Visa</span>
                    <span className="text-[8px] sm:text-xs bg-white/20 px-1.5 sm:px-2 py-0.5 rounded text-white">Mastercard</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Expandable info section */}
            <motion.div
              variants={fadeIn}
              className="mb-4 sm:mb-6 relative z-20"
            >
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                className="group flex items-center text-gray-100/90 hover:text-white transition-all duration-300 bg-black/20 px-3 sm:px-5 py-2 sm:py-3.5 rounded-full backdrop-blur-sm border border-white/10 hover:border-white/20 min-h-[40px] sm:min-h-[52px] w-full sm:w-auto relative text-sm sm:text-base hover:bg-black/30"
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
                  marginTop: isExpanded ? "0.75rem" : 0,
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
                    "bg-black/40 backdrop-blur-sm p-4 sm:p-6 text-gray-100 border border-white/10",
                    "overflow-y-auto max-h-[min(40vh,360px)] sm:max-h-[min(60vh,480px)] custom-scrollbar",
                    "shadow-[0_0_15px_rgba(0,0,0,0.2)] rounded-xl",
                    "transition-all duration-300"
                  )}
                >
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                    From engineered <strong>retaining walls</strong> and custom <strong>paver patios</strong> to <strong>water-efficient irrigation systems</strong>, 
                    we deliver premium solutions that enhance both <strong>functionality</strong> and <strong>beauty</strong>. Our expert team has 
                    completed over 3,600 successful projects throughout the <strong>Greater Seattle area</strong>.
                  </p>
                  <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                    Specializing in custom <strong>hardscaping solutions</strong> including <strong>retaining walls</strong>, <strong>paver patios</strong>, and <strong>water features</strong> 
                    designed for <strong>Seattle's unique terrain</strong>. Our professional <strong>irrigation systems</strong> provide efficient watering solutions engineered specifically for the <strong>Pacific Northwest climate</strong>.
                  </p>
                  <p className="mb-4 text-sm sm:text-base">
                    From <strong>slope stabilization</strong> to <strong>outdoor living spaces</strong>, we deliver premium <strong>landscaping services</strong> that 
                    enhance both functionality and beauty.
                  </p>
                  <div className="h-8 bg-gradient-to-t from-black/30 via-black/10 to-transparent sticky bottom-0 -mx-4 sm:-mx-6 -mb-4 sm:-mb-6" />
                </div>
              </motion.div>
            </motion.div>
            
            {/* CTA buttons */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-2 sm:gap-4 md:gap-5 z-10 mt-3 sm:mt-8 md:mt-10"
            >
              <QuoteButton
                className="group bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Free Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
              </QuoteButton>
              <a
                href="tel:2532170814"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-4 sm:px-8 py-2 sm:py-4 rounded-lg text-sm sm:text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                (253) 217-0814
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};