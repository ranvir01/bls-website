export interface ServiceArea {
  city: string;
  region: string;
  slug: string;
  backgroundImage: string;
  description: string;
  features: string[];
  testimonial?: {
    name: string;
    text: string;
    location: string;
  };
}

const commonFeatures = [
  'Landscape Design',
  'Lawn Maintenance',
  'Irrigation Systems',
  'Hardscaping',
  'Tree Services',
  'Garden Installation'
];

export const serviceAreas: ServiceArea[] = [
  // Seattle & Neighborhoods
  {
    city: 'Seattle',
    region: 'Central Seattle',
    slug: 'seattle',
    backgroundImage: '/images/areas/seattle.jpg',
    description: 'Premium landscaping services for Seattle\'s diverse urban properties, from modern downtown gardens to classic residential landscapes.',
    features: commonFeatures,
  },
  {
    city: 'Capitol Hill',
    region: 'Seattle',
    slug: 'capitol-hill',
    backgroundImage: '/images/areas/capitol-hill.jpg',
    description: 'Specialized urban landscaping for Capitol Hill\'s historic homes and modern developments.',
    features: commonFeatures,
  },
  {
    city: 'Belltown',
    region: 'Seattle',
    slug: 'belltown',
    backgroundImage: '/images/areas/belltown.jpg',
    description: 'Urban garden design and maintenance for Belltown\'s contemporary spaces.',
    features: commonFeatures,
  },
  {
    city: 'Magnolia',
    region: 'Seattle',
    slug: 'magnolia',
    backgroundImage: '/images/areas/magnolia.jpg',
    description: 'Full-service landscaping for Magnolia\'s beautiful residential properties.',
    features: commonFeatures,
  },
  {
    city: 'West Seattle',
    region: 'Seattle',
    slug: 'west-seattle',
    backgroundImage: '/images/areas/west-seattle.jpg',
    description: 'Complete landscape solutions for West Seattle\'s unique coastal environment.',
    features: commonFeatures,
  },

  // Eastside
  {
    city: 'Bellevue',
    region: 'Eastside',
    slug: 'bellevue',
    backgroundImage: '/images/areas/bellevue.jpg',
    description: 'Luxury landscaping services for Bellevue\'s upscale homes and properties.',
    features: commonFeatures,
  },
  {
    city: 'Kirkland',
    region: 'Eastside',
    slug: 'kirkland',
    backgroundImage: '/images/areas/kirkland.jpg',
    description: 'Expert landscaping for Kirkland\'s waterfront and residential properties.',
    features: commonFeatures,
  },
  {
    city: 'Redmond',
    region: 'Eastside',
    slug: 'redmond',
    backgroundImage: '/images/areas/redmond.jpg',
    description: 'Innovative landscape design and maintenance for Redmond\'s tech-savvy community.',
    features: commonFeatures,
  },
  {
    city: 'Issaquah',
    region: 'Eastside',
    slug: 'issaquah',
    backgroundImage: '/images/areas/issaquah.jpg',
    description: 'Natural landscape design that complements Issaquah\'s mountain backdrop.',
    features: commonFeatures,
  },
  {
    city: 'Mercer Island',
    region: 'Eastside',
    slug: 'mercer-island',
    backgroundImage: '/images/areas/mercer-island.jpg',
    description: 'Premium landscaping services for Mercer Island\'s luxury properties.',
    features: commonFeatures,
  },

  // North Seattle Suburbs
  {
    city: 'Shoreline',
    region: 'North Seattle Suburbs',
    slug: 'shoreline',
    backgroundImage: '/images/areas/shoreline.jpg',
    description: 'Complete landscape management for Shoreline\'s residential communities.',
    features: commonFeatures,
  },
  {
    city: 'Edmonds',
    region: 'North Seattle Suburbs',
    slug: 'edmonds',
    backgroundImage: '/images/areas/edmonds.jpg',
    description: 'Coastal-friendly landscaping solutions for Edmonds\' unique environment.',
    features: commonFeatures,
  },
  {
    city: 'Lake Forest Park',
    region: 'North Seattle Suburbs',
    slug: 'lake-forest-park',
    backgroundImage: '/images/areas/lake-forest-park.jpg',
    description: 'Eco-friendly landscaping that preserves Lake Forest Park\'s natural beauty.',
    features: commonFeatures,
  },
  {
    city: 'Mountlake Terrace',
    region: 'North Seattle Suburbs',
    slug: 'mountlake-terrace',
    backgroundImage: '/images/areas/mountlake-terrace.jpg',
    description: 'Professional landscaping services for Mountlake Terrace\'s growing community.',
    features: commonFeatures,
  },

  // South King County
  {
    city: 'Burien',
    region: 'South King County',
    slug: 'burien',
    backgroundImage: '/images/areas/burien.jpg',
    description: 'Comprehensive landscaping services for Burien\'s diverse properties.',
    features: commonFeatures,
  },
  {
    city: 'Tukwila',
    region: 'South King County',
    slug: 'tukwila',
    backgroundImage: '/images/areas/tukwila.jpg',
    description: 'Commercial and residential landscaping solutions in Tukwila.',
    features: commonFeatures,
  },
  {
    city: 'Renton',
    region: 'South King County',
    slug: 'renton',
    backgroundImage: '/images/areas/renton.jpg',
    description: 'Full-service landscaping for Renton\'s growing neighborhoods.',
    features: commonFeatures,
  },
  {
    city: 'Kent',
    region: 'South King County',
    slug: 'kent',
    backgroundImage: '/images/areas/kent.jpg',
    description: 'Professional landscape design and maintenance for Kent properties.',
    features: commonFeatures,
  },
  {
    city: 'Auburn',
    region: 'South King County',
    slug: 'auburn',
    backgroundImage: '/images/areas/auburn.jpg',
    description: 'Complete landscaping solutions for Auburn\'s diverse community.',
    features: commonFeatures,
  },
  {
    city: 'Federal Way',
    region: 'South King County',
    slug: 'federal-way',
    backgroundImage: '/images/areas/federal-way.jpg',
    description: 'Expert landscaping services for Federal Way\'s residential and commercial properties.',
    features: commonFeatures,
  },
  {
    city: 'Des Moines',
    region: 'South King County',
    slug: 'des-moines',
    backgroundImage: '/images/areas/des-moines.jpg',
    description: 'Waterfront-friendly landscaping for Des Moines\' coastal properties.',
    features: commonFeatures,
  },
  {
    city: 'Maple Valley',
    region: 'South King County',
    slug: 'maple-valley',
    backgroundImage: '/images/areas/maple-valley.jpg',
    description: 'Natural landscape design for Maple Valley\'s wooded properties.',
    features: commonFeatures,
  },
  {
    city: 'Covington',
    region: 'South King County',
    slug: 'covington',
    backgroundImage: '/images/areas/covington.jpg',
    description: 'Professional landscaping for Covington\'s suburban properties.',
    features: commonFeatures,
  },
  {
    city: 'SeaTac',
    region: 'South King County',
    slug: 'seatac',
    backgroundImage: '/images/areas/seatac.jpg',
    description: 'Commercial and residential landscaping services in SeaTac.',
    features: commonFeatures,
  },
]; 