'use client';

import Link from 'next/link';
import { serviceAreas } from '@/data/service-areas';

// Group areas by region
const areasByRegion = serviceAreas.reduce((acc, area) => {
  if (!acc[area.region]) {
    acc[area.region] = [];
  }
  acc[area.region].push(area);
  return acc;
}, {} as Record<string, typeof serviceAreas>);

export const ServiceAreasNav = () => {
  return (
    <nav className="bg-blue-900 text-white py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          Service Areas
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(areasByRegion).map(([region, areas]) => (
            <div key={region}>
              <h3 className="font-semibold text-lg mb-3 text-blue-300">{region}</h3>
              <ul className="space-y-2">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link
                      href={`/service-areas/${area.slug}`}
                      className="text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      {area.city}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}; 