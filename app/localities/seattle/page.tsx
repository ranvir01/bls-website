import { Hero } from '@/components/hero';
import { ServicesGrid } from '@/components/services-grid';
import { QuoteButton } from '@/components/quote-modal';
import { ServicePattern } from '@/components/service-pattern';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Seattle Landscaping Services | Blue Landscaping',
  description: 'Professional landscaping and hardscaping services for Seattle homes and businesses. Local experts in landscape design, irrigation, and outdoor living spaces.',
};

const localServices = [
  {
    title: 'Garden Design',
    description: 'Custom garden design services tailored to Seattle\'s unique climate and your personal style.',
    image: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    link: '/services',
  },
  {
    title: 'Hardscaping',
    description: 'Create beautiful outdoor living spaces with our expert hardscaping services.',
    image: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
    link: '/services/hardscaping/patio-installation',
  },
  {
    title: 'Irrigation',
    description: 'Keep your Seattle garden thriving with our efficient irrigation systems and maintenance.',
    image: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
    link: '/services/irrigation/sprinkler-installation',
  },
];

export default function SeattlePage() {
  return (
    <>
      <Hero
        title="Seattle Landscaping Services"
        subtitle="Local landscaping experts serving the Emerald City"
        image="https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Seattle's Premier Landscaping Service
              </h2>
              <p className="text-gray-700 mb-4">
                At Blue Landscaping, we understand the unique characteristics of Seattle's environment and neighborhoods. 
                Our local team brings years of experience creating beautiful, sustainable landscapes that thrive in the 
                Pacific Northwest climate while complementing Seattle's distinctive architectural styles.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're in Queen Anne, Capitol Hill, Ballard, or anywhere else in the city, our experts 
                deliver exceptional landscaping and hardscaping services tailored to your specific property and preferences.
              </p>
              <div className="mb-6">
                <div className="flex items-center mb-2">
                  <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="font-semibold">Serving all Seattle neighborhoods</span>
                </div>
                <p className="text-gray-600 ml-7">
                  Including Queen Anne, Capitol Hill, Ballard, Fremont, Wallingford, Green Lake, University District, 
                  Madison Park, Mount Baker, and more.
                </p>
              </div>
              <QuoteButton />
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/2598692/pexels-photo-2598692.jpeg"
                alt="Seattle landscaping project"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      
      <ServicePattern variant="lines" color="blue" className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Seattle Landscaping Services
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We offer a comprehensive range of landscaping and hardscaping services to transform your Seattle property.
          </p>
          
          <ServicesGrid 
            services={localServices} 
            columns={3}
          />
          
          <div className="mt-16 bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Blue Landscaping in Seattle</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                "Local experts who understand Seattle's climate and soil conditions",
                "Sustainable practices that conserve water and promote ecological health",
                "Licensed, bonded, and insured for your protection",
                "Experience with Seattle's permit requirements and regulations",
                "Knowledge of native plants that thrive in the Pacific Northwest",
                "Commitment to enhancing Seattle's urban environment",
                "Customized solutions for Seattle's unique architectural styles",
                "Strong relationships with local suppliers for quality materials"
              ].map((point, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ServicePattern>
      
      <section className="section-padding bg-blue-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold mb-6">Seattle Climate Considerations</h2>
              <p className="text-gray-700 mb-4">
                Seattle's unique climate requires specialized knowledge and experience to create landscapes that thrive 
                year-round. Our team understands how to work with the region's mild, rainy winters and relatively dry summers.
              </p>
              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-blue-800 mb-1">Rain Management</h3>
                  <p className="text-gray-600">
                    We design landscapes with proper drainage and rain gardens to manage Seattle's significant annual rainfall.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-blue-800 mb-1">Drought-Resistant Options</h3>
                  <p className="text-gray-600">
                    For the drier summer months, we incorporate drought-resistant plants and efficient irrigation systems.
                  </p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm">
                  <h3 className="font-semibold text-blue-800 mb-1">Native Plant Selection</h3>
                  <p className="text-gray-600">
                    We recommend native plants that are adapted to the local climate and require less maintenance.
                  </p>
                </div>
              </div>
              <Link href="/contact" className="btn-primary">
                Schedule a Consultation
              </Link>
            </div>
            <div className="order-1 lg:order-2 relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg"
                alt="Seattle climate-adapted landscaping"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-6">
            Our Seattle Service Areas
          </h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Blue Landscaping proudly serves all neighborhoods throughout Seattle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
            {[
              "Queen Anne", "Capitol Hill", "Ballard", "Fremont",
              "Wallingford", "Green Lake", "University District", "Madison Park",
              "Mount Baker", "Beacon Hill", "Columbia City", "West Seattle",
              "Magnolia", "Ravenna", "Northgate", "Lake City",
              "Phinney Ridge", "Crown Hill", "Wedgwood", "Laurelhurst",
              "Sand Point", "Montlake", "Eastlake", "South Lake Union"
            ].map((area, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm hover:bg-blue-50 transition-colors">
                <MapPin className="h-5 w-5 text-blue-600 mx-auto mb-2" />
                <span className="font-medium">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="section-padding bg-blue-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Seattle Property?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact our Seattle landscaping team today to schedule a consultation and get started on your project.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary bg-white text-blue-800 hover:bg-blue-50">
              Contact Us
            </Link>
            <Link href="/services" className="btn-primary bg-transparent border border-white hover:bg-white/10">
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}