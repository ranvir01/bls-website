'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { serviceAreas } from '@/data/service-areas';
import { ServiceAreasNav } from '@/components/service-areas-nav';

// Group areas by region
const areasByRegion = serviceAreas.reduce((acc, area) => {
  if (!acc[area.region]) {
    acc[area.region] = [];
  }
  acc[area.region].push(area);
  return acc;
}, {} as Record<string, typeof serviceAreas>);

export default function ServiceAreasPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/areas/seattle-skyline.jpg"
            alt="Greater Seattle Area"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Service Areas
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Professional landscaping services across the Greater Seattle area, from urban gardens to suburban estates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Regions Grid */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {Object.entries(areasByRegion).map(([region, areas], index) => (
              <motion.div
                key={region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8"
              >
                <h2 className="text-2xl font-bold text-white mb-6">{region}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {areas.map((area) => (
                    <Link
                      key={area.slug}
                      href={`/service-areas/${area.slug}`}
                      className="group block bg-black/30 rounded-xl p-4 hover:bg-blue-900/30 transition-all"
                    >
                      <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {area.city}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {area.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Full Service Areas Navigation */}
      <ServiceAreasNav />
    </>
  );
} 