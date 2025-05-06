/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use export output for static site generation (works well with Netlify)
  output: 'export',
  
  // Enable build caching for faster builds
  experimental: {
    turbotrace: {
      memoryLimit: 4096, // Increase memory limit for better performance
    },
    optimizePackageImports: ['@radix-ui/react-*', 'lucide-react'],
  },
  
  // Disable ESLint during builds for faster build times
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Configure images for static export
  images: { 
    unoptimized: true,
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
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Configure build output
  distDir: '.next',
  
  // Optimize production builds
  swcMinify: true,
  
  // Configure webpack for better performance
  webpack: (config, { dev, isServer }) => {
    // Optimize production builds
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;