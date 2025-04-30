import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Water Features | Blue Landscaping Services',
  description: 'Enhance your outdoor space with beautiful water features including fountains, ponds, waterfalls, and more from Blue Landscaping Services.',
};

const galleryImages = [
  {
    src: 'https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg',
    alt: 'Garden water fountain'
  },
  {
    src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
    alt: 'Garden pond with bridge'
  },
  {
    src: 'https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg',
    alt: 'Backyard waterfall'
  },
  {
    src: 'https://images.pexels.com/photos/1477387/pexels-photo-1477387.jpeg',
    alt: 'Modern water feature'
  },
  {
    src: 'https://images.pexels.com/photos/4197807/pexels-photo-4197807.jpeg',
    alt: 'Zen water feature'
  },
  {
    src: 'https://images.pexels.com/photos/6033830/pexels-photo-6033830.jpeg',
    alt: 'Landscape with stream'
  }
];

export default function WaterFeaturesPage() {
  return (
    <>
      <Hero
        title="Water Features"
        subtitle="Add tranquility and beauty to your landscape"
        image="https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-800">
                Enhance Your Outdoor Space with Water Features
              </h2>
              <p className="text-gray-700 mb-4">
                Water features add a sense of tranquility and elegance to any outdoor space. At Blue Landscaping, we design and install custom water features that become the focal point of your landscape, creating a peaceful atmosphere that you, your family, and guests will enjoy for years to come.
              </p>
              <p className="text-gray-700 mb-6">
                Our experienced team works with you to select the perfect water feature for your property, whether it's a serene pond, a dramatic waterfall, a sophisticated fountain, or a gentle stream. We handle everything from design to installation to maintenance, ensuring your water feature remains beautiful and functional throughout the seasons.
              </p>
              <QuoteButton />
            </div>
            <div className="relative h-[400px]">
              <Image
                src="https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
                alt="Beautiful garden pond"
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Water Feature Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Garden Ponds",
                description: "Create a natural ecosystem with a custom pond that can include fish, aquatic plants, and more.",
                image: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg"
              },
              {
                title: "Waterfalls",
                description: "Add the soothing sound of cascading water with a custom waterfall designed to complement your landscape.",
                image: "https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg"
              },
              {
                title: "Fountains",
                description: "From classic to contemporary, fountains add elegance and character to any outdoor space.",
                image: "https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg"
              },
              {
                title: "Streams & Brooks",
                description: "Create a winding stream or brook that adds movement and life to your landscape.",
                image: "https://images.pexels.com/photos/6033830/pexels-photo-6033830.jpeg"
              },
              {
                title: "Pondless Water Features",
                description: "Enjoy the beauty and sound of moving water without the maintenance of a traditional pond.",
                image: "https://images.pexels.com/photos/4197807/pexels-photo-4197807.jpeg"
              },
              {
                title: "Water Feature Maintenance",
                description: "Keep your water feature looking its best with our professional maintenance services.",
                image: "https://images.pexels.com/photos/1477387/pexels-photo-1477387.jpeg"
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
          <h2 className="text-3xl font-bold text-center mb-6">Our Water Feature Gallery</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
            Browse our portfolio of custom water features we've designed and installed for clients throughout the Seattle area.
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
              <h2 className="text-3xl font-bold mb-6">Water Feature Benefits</h2>
              <ul className="space-y-4">
                {[
                  "Creates a peaceful, tranquil atmosphere in your outdoor space",
                  "Adds a striking focal point to your landscape design",
                  "Attracts wildlife like birds and butterflies",
                  "Provides soothing, stress-reducing white noise",
                  "Increases property value and curb appeal",
                  "Can help mask unwanted noise from streets or neighbors",
                  "Creates a unique outdoor experience for entertaining",
                  "Adds dimension and interest to your landscape year-round"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Water Feature Process</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "1. Initial Consultation",
                    description: "We meet with you to discuss your vision, preferences, and budget for your water feature."
                  },
                  {
                    title: "2. Site Evaluation",
                    description: "We assess your property to determine the best location and design for your water feature."
                  },
                  {
                    title: "3. Design & Proposal",
                    description: "We create a custom design and detailed proposal for your water feature project."
                  },
                  {
                    title: "4. Installation",
                    description: "Our experienced team handles every aspect of the installation process, from excavation to finishing touches."
                  },
                  {
                    title: "5. Final Walkthrough",
                    description: "We show you how to operate and maintain your new water feature and answer any questions you may have."
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
            Ready to Add a Water Feature to Your Landscape?
          </h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Contact us today to schedule a consultation and learn how we can create the perfect water feature for your outdoor space.
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