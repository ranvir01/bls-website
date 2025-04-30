import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Retaining Walls | Blue Landscaping Services',
  description: 'Expert retaining wall design and installation services in Seattle. Create beautiful, functional landscapes with our durable retaining wall solutions.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg',
    alt: 'Custom retaining wall installation'
  },
  {
    src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    alt: 'Terraced retaining wall system'
  },
  {
    src: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
    alt: 'Natural stone retaining wall'
  }
];

export default function RetainingWallsPage() {
  return (
    <>
      <Hero
        title="Retaining Walls"
        subtitle="Transform challenging terrain into beautiful, functional spaces"
        image="https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Expert Retaining Wall Design & Installation
              </h2>
              <p className="text-gray-700 mb-4">
                Transform your challenging landscape with professionally engineered retaining walls from Blue Landscaping. Our expert team creates beautiful, functional solutions that prevent soil erosion, manage water runoff, and maximize your usable outdoor space.
              </p>
              <p className="text-gray-700 mb-6">
                From natural stone to modern concrete systems, we offer a range of materials and designs to match your property's style while ensuring structural integrity and longevity.
              </p>
              <QuoteButton />
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg"
                alt="Professional retaining wall installation"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Retaining Wall Solutions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Natural Stone Walls",
                description: "Timeless beauty with excellent durability, perfect for traditional and rustic landscapes.",
                image: "https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg"
              },
              {
                title: "Engineered Block Systems",
                description: "Modern, versatile solutions available in various styles and colors.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Terraced Walls",
                description: "Create usable space on slopes while adding visual interest to your landscape.",
                image: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg"
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6">Benefits of Professional Retaining Walls</h2>
              <ul className="space-y-4">
                {[
                  "Prevents soil erosion and stabilizes slopes",
                  "Creates more usable outdoor space",
                  "Improves property drainage",
                  "Adds value to your property",
                  "Reduces landscape maintenance",
                  "Enhances curb appeal",
                  "Protects structures from water damage",
                  "Creates opportunities for tiered gardens"
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
                    title: "1. Site Assessment",
                    description: "We evaluate your property's topography, soil conditions, and drainage patterns."
                  },
                  {
                    title: "2. Design & Engineering",
                    description: "Our team creates a custom design that meets both functional requirements and aesthetic preferences."
                  },
                  {
                    title: "3. Material Selection",
                    description: "We help you choose the best materials based on your style, budget, and site conditions."
                  },
                  {
                    title: "4. Proper Preparation",
                    description: "We ensure a solid foundation and install appropriate drainage systems."
                  },
                  {
                    title: "5. Expert Construction",
                    description: "Our skilled team builds your retaining wall with precision and attention to detail."
                  }
                ].map((step, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
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
            Ready to Transform Your Landscape?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to schedule a consultation and learn how we can create the perfect retaining wall solution for your property.
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