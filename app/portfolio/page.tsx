import { Hero } from '@/components/hero';
import { Gallery } from '@/components/gallery';
import { QuoteButton } from '@/components/quote-modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const metadata = {
  title: 'Portfolio | Blue Landscaping Services',
  description: 'View our portfolio of completed landscaping and hardscaping projects in Seattle. Browse through our gallery of custom patios, water features, retaining walls, and more.',
};

const portfolioImages = {
  waterFeatures: [
    {
      src: 'https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg',
      alt: 'Custom waterfall installation in Seattle backyard'
    },
    {
      src: 'https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg',
      alt: 'Decorative pond with water features'
    },
    {
      src: 'https://images.pexels.com/photos/53468/daisies-wildflowers-flowers-plant-53468.jpeg',
      alt: 'Garden fountain installation'
    }
  ],
  patios: [
    {
      src: 'https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg',
      alt: 'Custom paver patio with outdoor seating'
    },
    {
      src: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
      alt: 'Modern patio design with fire pit'
    },
    {
      src: 'https://images.pexels.com/photos/169185/pexels-photo-169185.jpeg',
      alt: 'Backyard patio transformation'
    }
  ],
  retainingWalls: [
    {
      src: 'https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg',
      alt: 'Engineered retaining wall with plantings'
    },
    {
      src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
      alt: 'Terraced retaining wall system'
    },
    {
      src: 'https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg',
      alt: 'Natural stone retaining wall'
    }
  ],
  irrigation: [
    {
      src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
      alt: 'Professional irrigation system installation'
    },
    {
      src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
      alt: 'Smart sprinkler system'
    },
    {
      src: 'https://images.pexels.com/photos/589/garden-green-grass-spring.jpg',
      alt: 'Drip irrigation for garden beds'
    }
  ]
};

export default function PortfolioPage() {
  return (
    <>
      <Hero
        title="Our Portfolio"
        subtitle="Browse our collection of completed projects"
        image="https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg"
        size="md"
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our diverse portfolio of landscaping and hardscaping projects throughout Seattle. 
              Each project showcases our commitment to quality, creativity, and attention to detail.
            </p>
          </div>

          <Tabs defaultValue="waterFeatures" className="space-y-8">
            <TabsList className="flex flex-wrap justify-center gap-2">
              <TabsTrigger value="waterFeatures">Water Features</TabsTrigger>
              <TabsTrigger value="patios">Patios & Hardscaping</TabsTrigger>
              <TabsTrigger value="retainingWalls">Retaining Walls</TabsTrigger>
              <TabsTrigger value="irrigation">Irrigation Systems</TabsTrigger>
            </TabsList>

            <TabsContent value="waterFeatures">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-6">Custom Water Features</h3>
                <Gallery images={portfolioImages.waterFeatures} />
              </div>
            </TabsContent>

            <TabsContent value="patios">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-6">Patio Installations</h3>
                <Gallery images={portfolioImages.patios} />
              </div>
            </TabsContent>

            <TabsContent value="retainingWalls">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-6">Retaining Wall Projects</h3>
                <Gallery images={portfolioImages.retainingWalls} />
              </div>
            </TabsContent>

            <TabsContent value="irrigation">
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center mb-6">Irrigation Solutions</h3>
                <Gallery images={portfolioImages.irrigation} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="section-padding bg-teal-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Contact us today to schedule a consultation and discuss how we can transform your outdoor space.
          </p>
          <QuoteButton className="btn-primary" />
        </div>
      </section>
    </>
  );
}