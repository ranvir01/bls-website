/**
 * Preloads an image in the browser cache
 * @param src Image URL to preload
 */
export function preloadImage(src: string): void {
  if (typeof window === 'undefined') return;
  
  const img = new Image();
  img.src = src;
}

/**
 * Preloads critical fonts to avoid layout shifts
 * @param fontUrls Array of font URLs to preload
 */
export function preloadFonts(fontUrls: string[]): void {
  if (typeof window === 'undefined' || !document.head) return;
  
  fontUrls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = url;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Preconnects to specified domains to establish early connections
 * @param domains Array of domains to preconnect to
 */
export function preconnect(domains: string[]): void {
  if (typeof window === 'undefined' || !document.head) return;
  
  domains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
}

/**
 * Preloads critical resources for the app
 */
export function preloadCriticalResources(): void {
  // Preload logo
  preloadImage('/images/logo.png');
  
  // Preconnect to external domains
  preconnect([
    'https://images.pexels.com',
    'https://i.imgur.com'
  ]);
} 