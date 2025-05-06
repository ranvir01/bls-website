import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-button';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Patio Installation | Blue Landscaping Services',
  description: 'Professional patio design and installation services in Seattle. Create your perfect outdoor living space with our expert hardscaping team.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
    alt: 'Custom patio installation'
  },
  {
    src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    alt: 'Outdoor living space'
  },
  {
    src: 'https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg',
    alt: 'Paver patio design'
  },
  {
    src: 'https://images.pexels.com/photos/1477387/pexels-photo-1477387.jpeg',
    alt: 'Modern patio design'
  },
  {
    src: 'https://images.pexels.com/photos/4197807/pexels-photo-4197807.jpeg',
    alt: 'Backyard patio'
  },
  {
    src: 'https://images.pexels.com/photos/6033830/pexels-photo-6033830.jpeg',
    alt: 'Patio with landscaping'
  }
];

export default function PatioInstallationPage() {
  return (
    <>
      <Hero
        title="Patio Installation"
        subtitle="Create your perfect outdoor living space"
        image="https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Custom Patio Design & Installation
              </h2>
              <p className="text-gray-700 mb-4">
                Transform your outdoor space with a custom-designed patio from Blue Landscaping. Our expert team creates beautiful, functional outdoor living areas that perfectly complement your home and lifestyle. From intimate gathering spaces to expansive entertainment areas, we bring your vision to life with quality materials and superior craftsmanship.
              </p>
              <p className="text-gray-700 mb-6">
                We handle every aspect of your patio project, from initial design concepts through final installation. Our experienced team ensures proper drainage, stable foundation preparation, and precise installation for a patio that will last for years to come.
              </p>
              <QuoteButton>Get Your Free Quote</QuoteButton>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
                alt="Custom patio installation"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Patio Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Paver Patios",
                description: "Beautiful and durable paver patios in a variety of styles, colors, and patterns.",
                image: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
              },
              {
                title: "Natural Stone Patios",
                description: "Elegant natural stone patios using materials like flagstone, slate, and travertine.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Stamped Concrete",
                description: "Decorative stamped concrete patios that mimic natural stone at a more affordable price.",
                image: "https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg"
              },
              {
                title: "Outdoor Kitchens",
                description: "Custom outdoor kitchen designs integrated with your patio for seamless outdoor living.",
                image: "https://images.pexels.com/photos/1477387/pexels-photo-1477387.jpeg"
              },
              {
                title: "Fire Features",
                description: "Add warmth and ambiance with built-in fire pits or outdoor fireplaces.",
                image: "https://images.pexels.com/photos/4197807/pexels-photo-4197807.jpeg"
              },
              {
                title: "Seating Walls",
                description: "Incorporate built-in seating walls for additional functionality and style.",
                image: "https://images.pexels.com/photos/6033830/pexels-photo-6033830.jpeg"
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
          <h2 className="text-3xl font-bold text-center mb-6">Our Patio Gallery</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Browse our portfolio of custom patio installations we've completed throughout the Seattle area.
          </p>
          <Gallery images={galleryImages} className="mb-12" />
          <div className="text-center">
            <QuoteButton>Request a Quote</QuoteButton>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits of a Custom Patio</h2>
              <ul className="space-y-4">
                {[
                  "Increases your home's value and curb appeal",
                  "Creates additional living and entertainment space",
                  "Provides a perfect outdoor dining area",
                  "Reduces lawn maintenance requirements",
                  "Creates a seamless indoor-outdoor living transition",
                  "Offers a great return on investment",
                  "Enhances your outdoor entertainment options",
                  "Adds functional space for relaxation and gatherings"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Installation Process</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "1. Initial Consultation",
                    description: "We meet with you to discuss your vision, preferences, and budget for your new patio."
                  },
                  {
                    title: "2. Site Evaluation",
                    description: "We assess your property to determine the best location and design for your patio."
                  },
                  {
                    title: "3. Design & Proposal",
                    description: "We create a custom design and detailed proposal for your patio project."
                  },
                  {
                    title: "4. Site Preparation",
                    description: "We properly prepare the site with appropriate grading, drainage, and base materials."
                  },
                  {
                    title: "5. Installation",
                    description: "Our experienced team handles the installation with attention to detail and quality craftsmanship."
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
            Ready to Create Your Dream Patio?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to schedule a consultation and learn how we can create the perfect patio for your outdoor space.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-blue-800 hover:bg-blue-50">
              Contact Us
            </Link>
            <Link href="/services" className="btn-primary bg-transparent border border-white hover:bg-white/10">
              Explore Other Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
