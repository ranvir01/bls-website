export interface ServiceAreaContent {
  city: string;
  region: string;
  heroImage: string;
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
  'Hardscaping',
  'Irrigation Systems',
  'Lawn Maintenance',
  'Garden Installation',
  'Outdoor Lighting'
];

export const serviceAreasContent: Record<string, ServiceAreaContent> = {
  'seattle': {
    city: 'Seattle (All Areas)',
    region: 'Seattle & Neighborhoods',
    heroImage: '/images/cities/seattle-skyline.svg',
    description: 'Comprehensive landscaping services throughout Seattle, from downtown to residential neighborhoods.',
    features: commonFeatures,
  },
  'belltown': {
    city: 'Belltown',
    region: 'Seattle & Neighborhoods',
    heroImage: '/images/cities/belltown-urban.svg',
    description: 'Urban landscaping solutions for Belltown\'s modern residential and commercial spaces.',
    features: commonFeatures,
  },
  'capitol-hill': {
    city: 'Capitol Hill',
    region: 'Seattle & Neighborhoods',
    heroImage: '/images/cities/capitol-hill-park.svg',
    description: 'Creative landscaping designs for Capitol Hill\'s diverse urban environment.',
    features: commonFeatures,
  },
  'magnolia': {
    city: 'Magnolia',
    region: 'Seattle & Neighborhoods',
    heroImage: '/images/cities/magnolia-view.svg',
    description: 'Premium landscaping services for Magnolia\'s upscale residential properties.',
    features: commonFeatures,
  },
  'west-seattle': {
    city: 'West Seattle',
    region: 'Seattle & Neighborhoods',
    heroImage: '/images/cities/west-seattle-beach.svg',
    description: 'Coastal-inspired landscaping for West Seattle\'s unique environment.',
    features: commonFeatures,
  },
  'kirkland': {
    city: 'Kirkland',
    region: 'Eastside',
    heroImage: '/images/cities/kirkland-waterfront.svg',
    description: 'Elegant landscaping solutions for Kirkland\'s waterfront and residential areas.',
    features: commonFeatures,
  },
  'bellevue': {
    city: 'Bellevue',
    region: 'Eastside',
    heroImage: '/images/cities/bellevue-downtown.svg',
    description: 'Premium landscaping services for Bellevue\'s luxury homes and upscale properties. We bring sophistication and elegance to every project.',
    features: commonFeatures,
  },
  'redmond': {
    city: 'Redmond',
    region: 'Eastside',
    heroImage: '/images/cities/redmond-microsoft.svg',
    description: 'Expert landscaping solutions for Redmond\'s tech-savvy community. We combine innovation with natural beauty.',
    features: commonFeatures,
  },
  'mercer-island': {
    city: 'Mercer Island',
    region: 'Eastside',
    heroImage: '/images/cities/mercer-island-waterfront.svg', // Waterfront homes view
    description: 'Exclusive landscaping services for Mercer Island\'s prestigious properties. We create stunning waterfront landscapes.',
    features: commonFeatures,
  },
  'issaquah': {
    city: 'Issaquah',
    region: 'Eastside',
    heroImage: '/images/cities/issaquah-mountains.svg', // Issaquah Alps or downtown
    description: 'Natural landscape design that complements Issaquah\'s mountain backdrop and preserves its scenic beauty.',
    features: commonFeatures,
  },
  'shoreline': {
    city: 'Shoreline',
    region: 'North Seattle Suburbs',
    heroImage: '/images/cities/shoreline-park.svg', // Richmond Beach or similar
    description: 'Professional landscaping services tailored to Shoreline\'s coastal environment and residential communities.',
    features: commonFeatures,
  },
  'lake-forest-park': {
    city: 'Lake Forest Park',
    region: 'North Seattle Suburbs',
    heroImage: '/images/cities/lake-forest-park-trees.svg', // Wooded area or Lake Washington
    description: 'Eco-friendly landscaping that preserves and enhances Lake Forest Park\'s natural woodland character.',
    features: commonFeatures,
  },
  'edmonds': {
    city: 'Edmonds',
    region: 'North Seattle Suburbs',
    heroImage: '/images/cities/edmonds-waterfront.svg', // Edmonds waterfront or downtown
    description: 'Beautiful landscape designs that complement Edmonds\' charming coastal atmosphere and community spirit.',
    features: commonFeatures,
  },
  'mountlake-terrace': {
    city: 'Mountlake Terrace',
    region: 'North Seattle Suburbs',
    heroImage: '/images/cities/mountlake-terrace-park.svg', // Local park or community center
    description: 'Custom landscaping solutions for Mountlake Terrace\'s growing residential neighborhoods.',
    features: commonFeatures,
  },
  'burien': {
    city: 'Burien',
    region: 'South King County',
    heroImage: '/images/cities/burien-downtown.svg', // Downtown Burien or waterfront
    description: 'Professional landscaping services that enhance Burien\'s diverse residential and commercial properties.',
    features: commonFeatures,
  },
  'tukwila': {
    city: 'Tukwila',
    region: 'South King County',
    heroImage: '/images/cities/tukwila-center.svg', // Southcenter or Green River
    description: 'Comprehensive landscaping solutions for Tukwila\'s commercial and residential spaces.',
    features: commonFeatures,
  },
  'renton': {
    city: 'Renton',
    region: 'South King County',
    heroImage: '/images/cities/renton-landing.svg', // The Landing or Lake Washington
    description: 'Expert landscaping services for Renton\'s waterfront properties and growing neighborhoods.',
    features: commonFeatures,
  },
  'kent': {
    city: 'Kent',
    region: 'South King County',
    heroImage: '/images/cities/kent-valley.svg', // Kent Valley or downtown
    description: 'Professional landscape design and maintenance for Kent\'s diverse residential communities.',
    features: commonFeatures,
  },
  'maple-valley': {
    city: 'Maple Valley',
    region: 'South King County',
    heroImage: '/images/cities/maple-valley-lake.svg', // Lake Wilderness or similar
    description: 'Natural landscape design that preserves Maple Valley\'s woodland character and outdoor lifestyle.',
    features: commonFeatures,
  },
  'covington': {
    city: 'Covington',
    region: 'South King County',
    heroImage: '/images/cities/covington-park.svg', // Local park or community center
    description: 'Custom landscaping solutions that enhance Covington\'s suburban charm and natural beauty.',
    features: commonFeatures,
  },
  'seatac': {
    city: 'SeaTac',
    region: 'South King County',
    heroImage: '/images/cities/seatac-center.svg', // City center or park
    description: 'Professional landscaping services for SeaTac\'s residential properties and commercial spaces.',
    features: commonFeatures,
  },
  'federal-way': {
    city: 'Federal Way',
    region: 'South King County',
    heroImage: '/images/cities/federal-way-center.svg',
    description: 'Professional landscaping services tailored to Federal Way\'s residential communities and commercial properties.',
    features: commonFeatures,
  },
  'des-moines': {
    city: 'Des Moines',
    region: 'South King County',
    heroImage: '/images/cities/des-moines-marina.svg',
    description: 'Beautiful landscaping designs for Des Moines\' waterfront and residential properties.',
    features: commonFeatures,
  },
  'auburn': {
    city: 'Auburn',
    region: 'South King County',
    heroImage: '/images/cities/auburn-downtown.svg',
    description: 'Professional landscaping services for Auburn\'s diverse residential communities.',
    features: commonFeatures,
  }
}; 