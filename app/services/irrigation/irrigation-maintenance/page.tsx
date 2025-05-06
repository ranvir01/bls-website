import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-button';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Irrigation Maintenance | Blue Landscaping Services',
  description: 'Professional irrigation system maintenance and repair services in Seattle. Keep your sprinkler system running efficiently with our expert maintenance team.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    alt: 'Professional irrigation maintenance'
  },
  {
    src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    alt: 'Sprinkler system maintenance'
  },
  {
    src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    alt: 'Irrigation system inspection'
  }
];

export default function IrrigationMaintenancePage() {
  return (
    <>
      <Hero
        title="Irrigation Maintenance"
        subtitle="Keep your irrigation system running efficiently"
        image="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Professional Irrigation System Maintenance
              </h2>
              <p className="text-gray-700 mb-4">
                Regular maintenance is crucial for keeping your irrigation system running efficiently and effectively. Our expert team provides comprehensive maintenance services to ensure your system operates at peak performance throughout the year.
              </p>
              <p className="text-gray-700 mb-6">
                From seasonal inspections to preventive maintenance, we help protect your investment and maintain a healthy, vibrant landscape while conserving water and reducing costs.
              </p>
              <QuoteButton>Get Your Free Quote</QuoteButton>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
                alt="Irrigation maintenance service"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Maintenance Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "System Inspection",
                description: "Comprehensive evaluation of your irrigation system's components and performance.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Preventive Maintenance",
                description: "Regular upkeep to prevent issues and extend system lifespan.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Seasonal Services",
                description: "Spring startup and winter shutdown services to protect your system.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "System Optimization",
                description: "Fine-tuning for maximum efficiency and coverage.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Component Replacement",
                description: "Timely replacement of worn or damaged parts.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Performance Testing",
                description: "Regular testing to ensure optimal system performance.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden card-hover">
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-6">Our Maintenance Process</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We follow a thorough maintenance process to ensure your irrigation system operates at peak efficiency.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "1. System Inspection",
                description: "Comprehensive evaluation of all components including sprinkler heads, valves, and controllers."
              },
              {
                title: "2. Performance Testing",
                description: "Testing water pressure, coverage patterns, and timing sequences for optimal performance."
              },
              {
                title: "3. Maintenance & Repairs",
                description: "Addressing any issues found during inspection and performing necessary maintenance."
              },
              {
                title: "4. System Optimization",
                description: "Fine-tuning settings for maximum efficiency and effectiveness."
              },
              {
                title: "5. Documentation",
                description: "Detailed reporting of work performed and recommendations for future maintenance."
              },
              {
                title: "6. Follow-up",
                description: "Scheduling next maintenance visit and addressing any concerns."
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-3 text-blue-800">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits of Regular Maintenance</h2>
              <ul className="space-y-4">
                {[
                  "Extends system lifespan and prevents costly repairs",
                  "Ensures optimal water distribution and coverage",
                  "Reduces water waste and lowers utility bills",
                  "Maintains healthy landscape growth",
                  "Prevents overwatering and underwatering issues",
                  "Identifies potential problems before they become serious",
                  "Optimizes system performance for different seasons",
                  "Protects your irrigation investment"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Maintenance Plans</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Seasonal Maintenance",
                    description: "Spring startup and winter shutdown services to protect your system throughout the year."
                  },
                  {
                    title: "Monthly Inspections",
                    description: "Regular system checks and adjustments to ensure consistent performance."
                  },
                  {
                    title: "Comprehensive Care",
                    description: "Full-service maintenance including repairs, upgrades, and 24/7 emergency support."
                  }
                ].map((plan, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Schedule Your Maintenance Service?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to set up a maintenance plan that keeps your irrigation system running efficiently.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <QuoteButton className="btn-primary bg-white text-blue-800 hover:bg-blue-50">
              Get Your Free Quote
            </QuoteButton>
            <Link href="/services" className="btn-primary bg-transparent border border-white hover:bg-white/10">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
