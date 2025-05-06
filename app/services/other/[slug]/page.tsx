import { notFound } from 'next/navigation';
import { ServicePageTemplate } from '@/components/service-page-template';

interface OtherServicePageProps {
  params: {
    slug: string;
  };
}

const otherServicesContent = {
  'fencing': {
    title: 'Fencing',
    description: 'Professional fencing installation and repair services for residential and commercial properties.',
    image: '/images/services/fencing.jpg',
    features: [
      'Custom fence design and installation',
      'Wood, vinyl, and metal fencing options',
      'Fence repair and maintenance',
      'Privacy and security fencing',
      'Garden and decorative fencing'
    ],
    benefits: [
      'Enhanced privacy and security',
      'Improved property value',
      'Customized to match your property style',
      'Professional installation and maintenance',
      'Durable and long-lasting materials'
    ]
  },
  'lawn-maintenance': {
    title: 'Lawn Maintenance',
    description: 'Comprehensive lawn care and maintenance services to keep your property looking its best.',
    image: '/images/services/lawn-maintenance.jpg',
    features: [
      'Regular mowing and trimming',
      'Fertilization and weed control',
      'Aeration and overseeding',
      'Leaf removal and cleanup',
      'Seasonal maintenance programs'
    ],
    benefits: [
      'Healthy, vibrant lawn year-round',
      'Professional care and expertise',
      'Customized maintenance plans',
      'Time-saving for property owners',
      'Enhanced curb appeal'
    ]
  },
  'planting-design': {
    title: 'Planting & Design',
    description: 'Expert landscape design and planting services to create beautiful outdoor spaces.',
    image: '/images/services/planting-design.jpg',
    features: [
      'Custom landscape design',
      'Plant selection and installation',
      'Garden bed creation',
      'Seasonal color installation',
      'Tree and shrub planting'
    ],
    benefits: [
      'Professional design expertise',
      'Native and adapted plant selection',
      'Sustainable landscaping solutions',
      'Increased property value',
      'Beautiful, low-maintenance gardens'
    ]
  },
  'sod-installation': {
    title: 'Sod Installation',
    description: 'Professional sod installation services for instant, beautiful lawns.',
    image: '/images/services/sod-installation.jpg',
    features: [
      'Site preparation and grading',
      'Quality sod selection',
      'Professional installation',
      'Proper watering and care',
      'Maintenance guidance'
    ],
    benefits: [
      'Instant lawn establishment',
      'Professional installation',
      'Reduced erosion',
      'Immediate curb appeal',
      'Proper soil preparation'
    ]
  }
};

export function generateStaticParams() {
  return Object.keys(otherServicesContent).map((slug) => ({
    slug,
  }));
}

export default function OtherServicePage({ params }: OtherServicePageProps) {
  const service = otherServicesContent[params.slug as keyof typeof otherServicesContent];

  if (!service) {
    notFound();
  }

  return (
    <ServicePageTemplate
      title={service.title}
      description={service.description}
      heroImage={service.image}
      features={service.features}
      benefits={service.benefits}
    />
  );
} 