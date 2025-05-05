'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { QuoteButton } from './quote-button';
import { X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Portfolio Data (from screenshots) ---
const PROJECTS = [
  {
    title: 'Front Yard Renovation',
    description: 'Complete front yard transformation featuring modern concrete walkways, custom planting design, and integrated lighting for curb appeal.',
    image: 'https://imgur.com/IaiBKca.jpg',
    tags: ['Front Yard', 'Walkways', 'Planting Design'],
  },
  {
    title: 'Modern Patio Design',
    description: 'Custom patio design featuring modern furniture placement, integrated landscaping, and thoughtful space planning for outdoor living.',
    image: 'https://imgur.com/HVYzhQi.jpg',
    tags: ['Patio Design', 'Outdoor Living', 'Space Planning'],
  },
  {
    title: 'Backyard Patio & Irrigation',
    description: 'Custom backyard patio installation with integrated irrigation system, creating a functional outdoor living space with proper water management for surrounding plants.',
    image: 'https://imgur.com/9sFpPqq.jpg',
    tags: ['Patio Design', 'Irrigation', 'Outdoor Space'],
  },
  {
    title: 'Modern Stepping Stone Pathway',
    description: 'Elegant rectangular concrete stepping stones precisely installed along the driveway edge. Set in dark crushed rock, this modern pathway creates a functional connection while preventing soil erosion and enhancing curb appeal with its clean, contemporary design.',
    image: 'https://imgur.com/Vopbikr.jpg',
    tags: ['Stepping Stones', 'Driveway Enhancement', 'Modern Design', 'Functional Pathway'],
  },
  {
    title: 'Sod Installation & Landscape Lighting',
    description: 'Professional sod installation paired with strategic landscape lighting to transform your yard. Fresh, premium-grade turf provides an instant green lawn, while energy-efficient lighting enhances nighttime visibility and curb appeal, highlighting your property\'s best features.',
    image: 'https://imgur.com/EceZEhi.jpg',
    tags: ['Sod Installation', 'Landscape Lighting', 'Lawn Renovation', 'Curb Appeal'],
  },
  {
    title: 'Custom Entry Design',
    description: 'Architectural entry design combining hardscaping and landscaping elements for a welcoming approach to your home.',
    image: 'https://imgur.com/5IdRLFZ.jpg',
    tags: ['Entry Design', 'Hardscaping', 'Landscaping'],
  },
  {
    title: 'Stone Retaining Wall',
    description: 'Expertly crafted stone retaining wall with proper drainage and engineering for both function and beauty.',
    image: 'https://imgur.com/8oL7rQO.jpg',
    tags: ['Stone Work', 'Retaining Wall', 'Drainage'],
  },
  {
    title: 'Professional Irrigation System',
    description: 'Custom irrigation system design and installation to efficiently deliver water to your plants and lawn. Features precision sprinkler placement, programmable timer controls, and water-conserving technology to keep your landscape healthy while reducing water usage.',
    image: 'https://imgur.com/90HMYen.jpg',
    tags: ['Irrigation', 'Water Conservation', 'Landscape Maintenance', 'Sprinkler Systems'],
  },
  {
    title: 'Contemporary Driveway Pathway',
    description: 'Meticulously installed rectangular stepping stones along a residential driveway, creating a functional pathway that enhances curb appeal. Dark crushed rock provides contrast while allowing proper drainage, complemented by a lush, manicured lawn and thoughtfully placed plantings near the home.',
    image: 'https://imgur.com/Bn1312V.jpg',
    tags: ['Driveway Design', 'Stepping Stones', 'Modern Landscaping', 'Residential Access'],
  },
  {
    title: 'Modern Planting Design',
    description: 'Contemporary planting design with drought-tolerant plants, decorative mulch, and clean architectural lines for a stunning front yard.',
    image: 'https://imgur.com/JKm4ubP.jpg',
    tags: ['Modern Design', 'Drought Tolerant', 'Low Maintenance'],
  },
  {
    title: 'Modern Gate Installation',
    description: 'Custom designed gate with horizontal wood slats and decorative grid pattern, complemented by vertical fencing and integrated landscaping.',
    image: 'https://imgur.com/4lAfc27.jpg',
    tags: ['Custom Gate', 'Modern Design', 'Landscaping'],
  },
  {
    title: 'Custom Deck Stairs',
    description: 'Professional deck stair installation with non-slip treads, sturdy construction, and integrated railing system for safe and stylish access.',
    image: 'https://imgur.com/QF7kFKc.jpg',
    tags: ['Deck Stairs', 'Custom Design', 'Safety'],
  },
  {
    title: 'Luxury Outdoor Kitchen',
    description: 'Custom outdoor kitchen featuring premium appliances, natural stone countertops, and integrated lighting for the ultimate outdoor cooking and entertaining experience.',
    image: 'https://imgur.com/HMtM9HV.jpg',
    tags: ['Outdoor Kitchen', 'Custom Design', 'Entertainment'],
  },
  {
    title: 'Custom Planting Design',
    description: 'Professional planting bed installation with carefully selected plants for year-round color and texture, featuring drought-resistant varieties.',
    image: 'https://imgur.com/fGbXlwy.jpg',
    tags: ['Plant Design', 'Drought Resistant', 'Low Maintenance'],
  },
];

// --- Helper: Get all unique tags ---
const ALL_TAGS = Array.from(new Set(PROJECTS.flatMap(p => p.tags)));

export function LandscapingPortfolioSection() {
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [lightbox, setLightbox] = useState<{ open: boolean; image: string; alt: string } | null>(null);
  const [showTags, setShowTags] = useState(false);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(search.toLowerCase()) ||
        project.description.toLowerCase().includes(search.toLowerCase());
      const matchesTag = activeTag ? project.tags.includes(activeTag) : true;
      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  return (
    <section className="py-20 bg-[#F7FAF9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1B3A2F]">Landscaping Portfolio - Seattle Area Projects</h2>
          <p className="text-lg text-[#4B6358] max-w-2xl mx-auto">
            Browse our collection of completed hardscaping and irrigation projects throughout Seattle. From custom retaining walls and elegant patios to efficient irrigation systems, discover how we transform outdoor spaces across the Puget Sound region.
          </p>
        </div>
        <div className="mb-8 flex flex-col gap-2">
          <button
            className="self-start md:self-center flex items-center gap-2 px-4 py-2 rounded-md bg-[#1B3A2F] text-white font-medium hover:bg-[#24503D] transition-colors"
            onClick={() => setShowTags((v) => !v)}
            aria-expanded={showTags}
            aria-controls="portfolio-tags-bar"
          >
            {showTags ? 'Hide Tags' : 'Show Tags'}
            <ChevronDown className={`h-5 w-5 transition-transform ${showTags ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {showTags && (
              <motion.div
                id="portfolio-tags-bar"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 justify-center mt-4 mb-2">
                  <button
                    className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${!activeTag ? 'bg-[#1B3A2F] text-white border-[#1B3A2F]' : 'bg-white text-[#1B3A2F] border-gray-300 hover:bg-[#E6F2ED]'}`}
                    onClick={() => setActiveTag(null)}
                  >
                    All
                  </button>
                  {ALL_TAGS.map(tag => (
                    <button
                      key={tag}
                      className={`px-4 py-1 rounded-full border text-sm font-medium transition-colors ${activeTag === tag ? 'bg-[#1B3A2F] text-white border-[#1B3A2F]' : 'bg-white text-[#1B3A2F] border-gray-300 hover:bg-[#E6F2ED]'}`}
                      onClick={() => setActiveTag(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="md:w-1/2 bg-white border-gray-200 shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => (
            <Card key={project.title} className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <div className="relative h-48 w-full cursor-pointer rounded-t-lg overflow-hidden" onClick={() => setLightbox({ open: true, image: project.image, alt: project.title })}>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={idx < 3}
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold text-[#1B3A2F]">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-[#4B6358] mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map(tag => (
                    <Badge key={tag} className="bg-[#E6F2ED] text-[#1B3A2F] font-medium">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <QuoteButton className="w-full bg-[#1B3A2F] hover:bg-[#24503D] text-white font-semibold py-2 rounded-md transition-colors">Request Quote</QuoteButton>
              </CardFooter>
            </Card>
          ))}
        </div>
        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightbox?.open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-2 sm:p-4 cursor-zoom-out"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-3 right-3 sm:top-6 sm:right-6 z-10 text-white bg-black/60 p-3 sm:p-4 rounded-full cursor-pointer"
                onClick={e => { e.stopPropagation(); setLightbox(null); }}
                aria-label="Close image preview"
              >
                <X className="h-7 w-7 sm:h-6 sm:w-6" />
              </button>
              <div className="relative w-full max-w-2xl h-[60vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
                <Image
                  src={lightbox.image}
                  alt={lightbox.alt}
                  fill
                  className="object-contain max-h-[80vh] max-w-full"
                  sizes="100vw"
                  quality={90}
                  priority
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 