import { notFound } from 'next/navigation';
import { ServiceAreaPageTemplate } from '@/components/service-area-page-template';
import { serviceAreasContent } from '@/data/service-areas-content';

interface ServiceAreaPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return Object.keys(serviceAreasContent).map((slug) => ({
    slug,
  }));
}

export default function ServiceAreaPage({ params }: ServiceAreaPageProps) {
  const content = serviceAreasContent[params.slug];

  if (!content) {
    notFound();
  }

  return <ServiceAreaPageTemplate {...content} />;
} 