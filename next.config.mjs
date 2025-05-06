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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
      },
    ],
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