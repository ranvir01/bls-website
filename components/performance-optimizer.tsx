"use client";

import { useEffect } from 'react';
import { preloadImage, preconnect } from '@/lib/preload';

/**
 * Component that handles performance optimizations
 * This is a client component that runs once when the app loads
 */
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    preloadImage('/images/logo.png');
    
    // Preconnect to external domains
    preconnect([
      'https://images.pexels.com',
      'https://i.imgur.com'
    ]);
    
    // Optimize for mobile touch devices
    document.documentElement.style.touchAction = 'manipulation';
    
    // Disable pinch zoom on mobile to prevent accidental zoom
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
  }, []);

  return null;
};

export default PerformanceOptimizer;

/**
 * Load non-critical resources after the page has loaded
 */
function loadNonCriticalResources() {
  // Lazy load analytics
  loadAnalytics();
  
  // Prefetch pages users might navigate to
  prefetchLikelyDestinations();
}

/**
 * Load analytics scripts
 */
function loadAnalytics() {
  // Example: Lazy load Google Analytics
  // This is just a placeholder - replace with your actual analytics code
  const script = document.createElement('script');
  script.src = 'https://www.googletagmanager.com/gtag/js?id=MEASUREMENT_ID';
  script.async = true;
  document.head.appendChild(script);
  
  const inlineScript = document.createElement('script');
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'MEASUREMENT_ID');
  `;
  document.head.appendChild(inlineScript);
}

/**
 * Prefetch pages that users are likely to navigate to
 */
function prefetchLikelyDestinations() {
  // Common navigation paths
  const likelyPaths = [
    '/services',
    '/about',
    '/contact',
    '/portfolio'
  ];
  
  likelyPaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = path;
    document.head.appendChild(link);
  });
} 