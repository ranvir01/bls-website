/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Type and lint errors fail the build. The previous config suppressed both,
  // which is how a site ships with broken imports and nobody finds out until a
  // page 500s in production.
  typescript: { ignoreBuildErrors: false },
  eslint: { ignoreDuringBuilds: false },

  images: {
    // All imagery is self-hosted. The old config set `unoptimized: true`, which
    // meant a 5MB phone photo was served verbatim to every mobile visitor.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 414, 640, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [],
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  async redirects() {
    // Mirrors netlify.toml so `next start` and local dev behave the same as
    // production. Keeping both in sync matters — the link checker runs against
    // a local server, so a redirect that exists only in netlify.toml would go
    // unverified.
    const map = [
      ['/localities/:slug', '/locations/:slug'],
      ['/localities', '/locations'],
      ['/service-areas/:slug', '/locations/:slug'],
      ['/service-areas', '/locations'],
      ['/testimonials', '/reviews'],
      ['/services/hardscaping/patios', '/services/hardscaping/paver-patios'],
      ['/services/hardscaping/patio-installation', '/services/hardscaping/paver-patios'],
      ['/services/hardscaping/walkways-pathways', '/services/hardscaping/walkways'],
      ['/services/hardscaping/driveway-paving', '/services/hardscaping/driveways'],
      ['/services/hardscaping/steps', '/services/hardscaping/outdoor-steps'],
      ['/services/hardscaping/seating', '/services/hardscaping/seating-walls'],
      ['/services/lawn-care', '/services/landscaping/lawn-maintenance'],
      ['/services/garden-design', '/services/landscaping/planting-design'],
      ['/services/landscape-lighting', '/services/hardscaping/walkways'],
    ];

    return map.map(([source, destination]) => ({ source, destination, permanent: true }));
  },
};

export default nextConfig;
