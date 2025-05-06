import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Driveway Paving | Blue Landscaping Services',
  description: 'Professional driveway paving and installation services in Seattle. Transform your property with our expert hardscaping team.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
    alt: 'Custom driveway installation'
  },
  {
    src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    alt: 'Modern driveway design'
  },
  {
    src: 'https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg',
    alt: 'Paver driveway'
  }
];

export default function DrivewayPavingPage() {
  return (
    <>
      <Hero
        title="Driveway Paving"
        subtitle="Transform your property with a beautiful new driveway"
        image="https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Expert Driveway Installation & Design
              </h2>
              <p className="text-gray-700 mb-4">
                Enhance your property's curb appeal and value with a professionally installed driveway from Blue Landscaping. Our expert team creates beautiful, durable driveways using premium materials and superior craftsmanship.
              </p>
              <p className="text-gray-700 mb-6">
                From traditional concrete to decorative pavers, we offer a range of options to match your home's style and meet your specific needs. Our driveways are built to last, with proper drainage and a strong foundation.
              </p>
              <QuoteButton>Get Your Free Quote</QuoteButton>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
                alt="Professional driveway installation"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Our Driveway Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Concrete Driveways",
                description: "Durable and versatile concrete driveways with various finishing options.",
                image: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg"
              },
              {
                title: "Paver Driveways",
                description: "Beautiful interlocking paver driveways in a variety of styles and patterns.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Permeable Driveways",
                description: "Eco-friendly permeable paving solutions for better drainage.",
                image: "https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "1. Site Evaluation",
                description: "We assess your property's grade, drainage needs, and soil conditions."
              },
              {
                title: "2. Design & Planning",
                description: "We create a custom design that matches your home's style and meets your needs."
              },
              {
                title: "3. Preparation",
                description: "We properly prepare the site with appropriate grading and base materials."
              },
              {
                title: "4. Installation",
                description: "Our expert team handles the installation with precision and attention to detail."
              }
            ].map((step, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Driveway?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to schedule a consultation and get started on your new driveway.
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