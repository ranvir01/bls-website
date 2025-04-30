/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use export output for static site generation (works well with Netlify)
  output: 'export',
  
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
    ],
  },
  
  // Disable React strict mode for now as it can cause double-rendering issues
  // reactStrictMode: true,
};

module.exports = nextConfig;