import { Hero } from '@/components/hero';
import { ServicesGrid } from '@/components/services-grid';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Services | Blue Landscaping Services',
  description: 'Explore our complete range of landscaping and hardscaping services including irrigation, patio installation, retaining walls, and more.',
};

const hardscapingServices = [
  {
    title: 'Water Features',
    description: 'Enhance your outdoor space with beautiful water features including fountains, ponds, and waterfalls.',
    image: 'https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg',
    link: '/services/hardscaping/water-features',
  },
  {
    title: 'Patio Installation',
    description: 'Create the perfect outdoor living space with our custom patio design and installation services.',
    image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
    link: '/services/hardscaping/patio-installation',
  },
  {
    title: 'Retaining Walls',
    description: 'Build functional and attractive retaining walls to manage slopes and create usable outdoor spaces.',
    image: 'https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg',
    link: '/services/hardscaping/retaining-walls',
  },
  {
    title: 'Driveway Paving',
    description: 'Upgrade your property with a beautiful and durable paved driveway that enhances curb appeal.',
    image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
    link: '/services/hardscaping/driveway-paving',
  },
];

const irrigationServices = [
  {
    title: 'Irrigation Maintenance',
    description: 'Keep your irrigation system running efficiently with our professional maintenance services.',
    image: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    link: '/services/irrigation/irrigation-maintenance',
  },
  {
    title: 'Sprinkler Installation',
    description: 'Install a high-quality sprinkler system to keep your lawn healthy and green all season long.',
    image: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    link: '/services/irrigation/sprinkler-installation',
  },
  {
    title: 'Sprinkler Repair',
    description: 'Fix leaks, broken heads, and other issues with our expert sprinkler repair services.',
    image: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    link: '/services/irrigation/sprinkler-repair',
  },
];

export default function ServicesPage() {
  return (
    <>
      <Hero
        title="Our Services"
        subtitle="Professional landscaping and hardscaping solutions for your outdoor space"
        image="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"
        size="md"
      />

      {/* Services Overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Landscaping Solutions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Blue Landscaping, we offer a wide range of services to transform your outdoor space. 
              From hardscaping and irrigation to landscape design and maintenance, our team of experts 
              has the skills and experience to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-800">
                Why Choose Our Services
              </h3>
              <ul className="space-y-4">
                {[
                  "Experienced team with 15+ years in the industry",
                  "Custom designs tailored to your property and preferences",
                  "High-quality materials for lasting results",
                  "Attention to detail in every project",
                  "Competitive pricing and transparent estimates",
                  "Ongoing support and maintenance options"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <QuoteButton />
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/4505454/pexels-photo-4505454.jpeg"
                alt="Our landscaping services"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Hardscaping Services */}
      <ServicesGrid
        title="Hardscaping Services"
        subtitle="Create beautiful and functional outdoor living spaces with our hardscaping services"
        services={hardscapingServices}
        className="bg-gray-50"
      />

      {/* Irrigation Services */}
      <ServicesGrid
        title="Irrigation Services"
        subtitle="Keep your lawn and garden healthy with our professional irrigation solutions"
        services={irrigationServices}
        className="bg-white"
      />

      {/* Additional Services */}
      <section className="section-padding bg-blue-800 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-blue-100 max-w-3xl mx-auto">
              Beyond hardscaping and irrigation, we offer a variety of other landscaping services to meet all your outdoor needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Landscape Design",
                description: "Professional design services to create a cohesive and beautiful outdoor space tailored to your preferences and property."
              },
              {
                title: "Lawn Care & Maintenance",
                description: "Regular maintenance to keep your lawn looking its best, including mowing, fertilization, aeration, and weed control."
              },
              {
                title: "Planting & Garden Care",
                description: "Expert plant selection, installation, and ongoing care to ensure a vibrant and healthy garden."
              },
              {
                title: "Outdoor Lighting",
                description: "Illuminate your landscape with strategic lighting to enhance safety, security, and aesthetics."
              },
              {
                title: "Seasonal Clean-up",
                description: "Comprehensive clean-up services in spring and fall to prepare your landscape for the changing seasons."
              },
              {
                title: "Tree & Shrub Care",
                description: "Pruning, trimming, and maintenance to keep your trees and shrubs healthy and looking their best."
              }
            ].map((service, index) => (
              <div key={index} className="bg-blue-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-blue-100 mb-4">{service.description}</p>
                <Link
                  href="/contact"
                  className="text-white hover:text-blue-200 transition-colors inline-flex items-center font-medium"
                >
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Service Process</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We follow a thorough process to ensure your project is completed to your satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "1. Consultation",
                description: "We begin with a free consultation to understand your vision, needs, and budget."
              },
              {
                title: "2. Design & Planning",
                description: "Our team creates a custom design and detailed plan for your project."
              },
              {
                title: "3. Implementation",
                description: "We execute the plan with precision, keeping you informed every step of the way."
              },
              {
                title: "4. Final Walkthrough",
                description: "Upon completion, we walk through the project with you to ensure your satisfaction."
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
                <h3 className="text-xl font-bold mb-3 text-blue-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary">
              Schedule a Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
            alt="Beautiful landscape"
            fill
            className="object-cover"
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-blue-900/70" />
        </div>
        <div className="container-custom relative z-10 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Outdoor Space?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Contact us today to schedule a free consultation and get started on your landscaping project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-blue-800 hover:bg-blue-50">
              Get a Free Quote
            </Link>
            <Link href="/about" className="btn-primary bg-transparent border border-white hover:bg-white/10">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}