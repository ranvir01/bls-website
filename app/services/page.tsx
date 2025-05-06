import { Hero } from '@/components/hero';
import { ServicesGrid } from '@/components/services-grid';
import { QuoteButton } from '@/components/quote-button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Services | Blue Landscaping Services',
  description: 'Explore our complete range of landscaping and hardscaping services including irrigation, patio installation, retaining walls, and more.',
};

const SERVICES = [
  {
    title: 'Landscape Transformations',
    description: 'Complete redesigns and makeovers for your outdoor spaces, tailored to your vision and property.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    link: '/services/landscape-transformations',
  },
  {
    title: 'Outdoor Structures & Kitchens',
    description: 'Custom pergolas, pavilions, and outdoor kitchens for year-round entertaining and relaxation.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    link: '/services/outdoor-structures-kitchens',
  },
  {
    title: 'Fire Pits',
    description: 'Beautiful, safe, and functional fire features to enhance your evenings outdoors.',
    image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80',
    link: '/services/fire-pits',
  },
  {
    title: 'Water Features',
    description: 'Stunning ponds, waterfalls, and fountains to bring tranquility and movement to your landscape.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    link: '/services/water-features',
  },
  {
    title: 'Patios & Walkways',
    description: 'Expertly designed and installed patios and walkways for beauty and durability.',
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
    link: '/services/patios-walkways',
  },
  {
    title: 'Pools & Spas',
    description: 'Custom pools and spas to create your own backyard oasis.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    link: '/services/pools-spas',
  },
  {
    title: 'Sport Courts',
    description: 'Basketball, tennis, and multi-sport courts for active outdoor living.',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=800&q=80',
    link: '/services/sport-courts',
  },
  {
    title: 'Gardens',
    description: 'Lush, sustainable gardens designed for year-round color and enjoyment.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    link: '/services/gardens',
  },
  {
    title: 'Landscape Essentials',
    description: 'All the finishing touches: lighting, edging, mulch, and more.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
    link: '/services/landscape-essentials',
  },
  {
    title: 'Small Yard Projects',
    description: 'Creative solutions for compact spaces, maximizing beauty and function.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    link: '/services/small-yard-projects',
  },
  {
    title: '3D Designs',
    description: 'Visualize your project before it\'s built with professional 3D renderings.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
    link: '/services/3d-designs',
  },
  {
    title: 'Video Fly Throughs',
    description: 'Experience your future landscape with immersive video walkthroughs.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    link: '/services/video-fly-throughs',
  },
];

export default function ServicesPage() {
  return (
    <section className="min-h-screen bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">Our Services</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.link}
              className="group block bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white drop-shadow">{service.title}</h2>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-300 mb-4 min-h-[60px]">{service.description}</p>
                <span className="inline-block text-yellow-400 font-semibold group-hover:underline">Learn More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}