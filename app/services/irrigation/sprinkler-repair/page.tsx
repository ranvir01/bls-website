import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Sprinkler Repair Services | Blue Landscaping Services',
  description: 'Professional sprinkler system repair and maintenance in Seattle. Fast, reliable service to keep your irrigation system working efficiently.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    alt: 'Sprinkler system repair'
  },
  {
    src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    alt: 'Professional irrigation maintenance'
  },
  {
    src: 'https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg',
    alt: 'Garden irrigation system'
  }
];

export default function SprinklerRepairPage() {
  return (
    <>
      <Hero
        title="Sprinkler Repair Services"
        subtitle="Fast, reliable repairs to keep your irrigation system working efficiently"
        image="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Expert Sprinkler System Repairs
              </h2>
              <p className="text-gray-700 mb-4">
                When your sprinkler system isn't performing at its best, our experienced technicians are here to help. We provide comprehensive repair services for all types of irrigation systems, ensuring your lawn and garden receive the water they need to thrive.
              </p>
              <p className="text-gray-700 mb-6">
                From fixing leaks and broken heads to troubleshooting control systems, we have the expertise to diagnose and repair any irrigation issue quickly and effectively. Our team uses high-quality replacement parts and proven repair techniques to ensure lasting results.
              </p>
              <QuoteButton />
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
                alt="Sprinkler repair service"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Repair Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Leak Detection & Repair",
                description: "Advanced leak detection and efficient repairs to prevent water waste and system damage.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Sprinkler Head Replacement",
                description: "Expert replacement of damaged or malfunctioning sprinkler heads for optimal coverage.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Control System Repairs",
                description: "Diagnosis and repair of timer and control system issues to maintain proper scheduling.",
                image: "https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg"
              },
              {
                title: "Valve Repairs",
                description: "Repair or replacement of faulty valves to ensure proper water flow and zone control.",
                image: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
              },
              {
                title: "Winterization Repairs",
                description: "Repair of damage caused by freezing and preparation of your system for winter.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "System Upgrades",
                description: "Modernization of older systems with efficient components and smart controllers.",
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
          <h2 className="text-3xl font-bold text-center mb-6">Our Repair Process</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We follow a systematic approach to diagnose and repair your irrigation system efficiently.
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
              <h2 className="text-3xl font-bold mb-6">Common Signs You Need Repair</h2>
              <ul className="space-y-4">
                {[
                  "Uneven water coverage or dry spots",
                  "Unusually high water bills",
                  "Low water pressure in sprinklers",
                  "Leaking or broken sprinkler heads",
                  "System won't turn on or off properly",
                  "Water pooling in certain areas",
                  "Strange noises from the system",
                  "Controller display not working"
                ].map((sign, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Repair Process</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "1. Initial Assessment",
                    description: "We thoroughly inspect your system to identify all issues and potential problems."
                  },
                  {
                    title: "2. Diagnosis",
                    description: "Our experts determine the root cause of the problem and recommend solutions."
                  },
                  {
                    title: "3. Repair Quote",
                    description: "We provide a detailed quote for all necessary repairs and replacements."
                  },
                  {
                    title: "4. Repair Service",
                    description: "Our skilled technicians complete all repairs using quality replacement parts."
                  },
                  {
                    title: "5. Testing",
                    description: "We thoroughly test the system to ensure everything is working properly."
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
            Need Sprinkler System Repairs?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today for fast, professional sprinkler repair services in Seattle.
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