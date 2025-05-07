/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Skip type checking in build (faster builds)
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip linting in build (faster builds)
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure images
  images: { 
    unoptimized: false, // Enable Next.js image optimization
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [],
  },
  
  // Production settings
  reactStrictMode: true,
  swcMinify: true,
  
  // Disable unnecessary features
  poweredByHeader: false,
  
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react'],
  },
  
  // Build output directory
  distDir: '.next',
};

export default nextConfig; 