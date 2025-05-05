import { redirect } from 'next/navigation';

interface LocalityPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = [
    'bellevue',
    'redmond',
    'mercer-island',
    'issaquah',
    'shoreline',
    'lake-forest-park',
    'edmonds',
    'mountlake-terrace',
    'burien',
    'tukwila',
    'renton',
    'kent',
    'federal-way',
    'covington',
    'maple-valley',
    'seatac',
    'seattle',
    'belltown',
    'capitol-hill',
    'magnolia',
    'west-seattle',
    'kirkland',
    'auburn',
    'des-moines'
  ];

  return slugs.map((slug) => ({
    slug,
  }));
}

export default function LocalityPage({ params }: LocalityPageProps) {
  // Redirect to the corresponding service area page
  redirect(`/service-areas/${params.slug}`);
} 