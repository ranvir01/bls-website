import { notFound } from 'next/navigation';
import { ServicePageTemplate } from '@/components/service-page-template';
import { hardscapingServicesContent } from '@/data/hardscaping-services-content';

interface HardscapingServicePageProps {
  params: {
    slug: string;
  };
}

// Map navigation slugs to content slugs
const slugMap: Record<string, string> = {
  'patios': 'patio-installation',
  'walkways': 'walkways-pathways',
  'driveways': 'driveway-paving',
  'retaining-walls': 'retaining-walls',
  'fire-features': 'fire-features',
  'steps': 'steps',
  'seating': 'seating',
  'water-features': 'water-features'
};

export async function generateStaticParams() {
  // Get all slugs from both navigation and content
  const navigationSlugs = Object.keys(slugMap);
  const contentSlugs = Object.keys(hardscapingServicesContent);
  
  // Combine and deduplicate slugs
  const allSlugs = [...new Set([...navigationSlugs, ...contentSlugs])];

  return allSlugs.map((slug) => ({
    slug,
  }));
}

export default function HardscapingServicePage({ params }: HardscapingServicePageProps) {
  // Get the correct content slug based on the URL slug
  const contentSlug = slugMap[params.slug] || params.slug;
  const content = hardscapingServicesContent[contentSlug];

  if (!content) {
    notFound();
  }

  return <ServicePageTemplate {...content} />;
} 