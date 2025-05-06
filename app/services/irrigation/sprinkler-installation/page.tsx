import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sprinkler Installation | Blue Landscaping Services',
  description: 'Professional sprinkler system installation in Seattle. Expert irrigation solutions for residential and commercial properties.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    alt: 'Professional sprinkler system'
  },
  {
    src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    alt: 'Garden irrigation system'
  },
  {
    src: 'https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg',
    alt: 'Lawn sprinkler system'
  }
];

export default function SprinklerInstallationPage() {
  return (
    <>
      <Hero
        title="Sprinkler Installation"
        subtitle="Professional irrigation solutions for your landscape"
        image="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Expert Sprinkler System Installation
              </h2>
              <p className="text-gray-700 mb-4">
                At Blue Landscaping, we specialize in designing and installing high-quality sprinkler systems 
                that ensure your landscape receives the perfect amount of water. Our expert team uses the latest 
                irrigation technology to create efficient, reliable systems tailored to your property's specific needs.
              </p>
              <p className="text-gray-700 mb-6">
                From smart controllers and rain sensors to precise zone planning and water-efficient sprinkler heads, 
                we implement solutions that conserve water while maintaining beautiful, healthy landscapes.
              </p>
              <QuoteButton>Get Your Free Quote</QuoteButton>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
                alt="Professional sprinkler installation"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Sprinkler Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "System Design",
                description: "Custom irrigation system design based on your landscape's specific requirements.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Smart Controllers",
                description: "Advanced smart controllers that adjust watering based on weather conditions.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Drip Irrigation",
                description: "Water-efficient drip systems for gardens and plant beds.",
                image: "https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg"
              },
              {
                title: "Rain Sensors",
                description: "Automatic rain sensors to prevent overwatering during wet weather.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Zone Control",
                description: "Multi-zone systems for precise water management across different areas.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "System Maintenance",
                description: "Regular maintenance and adjustments to ensure optimal performance.",
                image: "https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg"
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
          <h2 className="text-3xl font-bold text-center mb-6">Our Installation Process</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We follow a comprehensive process to ensure your sprinkler system is installed correctly and functions efficiently.
          </p>
          <Gallery images={galleryImages} className="mb-12" />
          <div className="text-center">
            <QuoteButton />
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits of Professional Installation</h2>
              <ul className="space-y-4">
                {[
                  "Water conservation through efficient system design",
                  "Even water distribution for healthier lawns",
                  "Automated watering saves time and effort",
                  "Smart controls for weather-based adjustments",
                  "Professional installation ensures proper coverage",
                  "Reduced water waste and lower utility bills",
                  "Increased property value",
                  "Year-round landscape health"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Installation Steps</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "1. Site Assessment",
                    description: "We evaluate your property's specific needs, including soil type, plant requirements, and sun exposure."
                  },
                  {
                    title: "2. System Design",
                    description: "Our team creates a custom irrigation plan optimized for your landscape."
                  },
                  {
                    title: "3. Installation",
                    description: "Professional installation of all system components with minimal disruption to your landscape."
                  },
                  {
                    title: "4. Testing & Calibration",
                    description: "Thorough testing and adjustment of all zones for optimal coverage."
                  },
                  {
                    title: "5. Client Training",
                    description: "We show you how to operate and maintain your new system effectively."
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-white p-4 rounded-md shadow-sm">
                    <h3 className="font-bold text-blue-800">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
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
            Ready to Install Your Sprinkler System?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to schedule a consultation and learn how we can create the perfect irrigation solution for your property.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <QuoteButton>Request a Quote</QuoteButton>
            <Link href="/services" className="btn-primary bg-transparent border border-white hover:bg-white/10">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}