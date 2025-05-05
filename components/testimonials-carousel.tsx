'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'David Chen',
    location: 'Capitol Hill, Seattle',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
    text: 'We hired Blue Landscaping for our challenging hillside property. They terraced the slope, installed drought-resistant plantings, and engineered a perfect drainage solution. A year later, our garden thrives and shows no signs of erosion.',
  },
  {
    name: 'Emily Rodriguez',
    location: 'Ballard, Seattle',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    text: 'From our first call to project completion, the team was professional and attentive. They transformed our backyard into an outdoor living oasis with custom pavers, lighting, and a stunning water feature.',
  },
  {
    name: 'Michael Lee',
    location: 'Queen Anne, Seattle',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    text: 'Blue Landscaping\'s irrigation experts saved our lawn last season. Their smart drip-irrigation system keeps our beds perfectly hydrated without waste. Installation was seamless.',
  },
  {
    name: 'Linda Nguyen',
    location: 'Tukwila, South King County',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    text: 'Blue Landscaping has been taking care of our garden in Tukwila for over a year now. They\'re always on time, work efficiently, and leave our yard looking perfect every visit.',
  },
  {
    name: 'Mark Thompson',
    location: 'Lake Forest Park, North Seattle Suburbs',
    image: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg',
    text: 'We asked for a full redesign—patio, fire pit, plants—and they went above and beyond. Their ideas, like adding a pergola, made it special. Our backyard feels like a getaway.',
  },
  {
    name: 'Sarah Lee',
    location: 'Kirkland, Eastside',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    text: 'Creative, friendly, professional. They turned my space into something special.',
  },
  {
    name: 'James Wilson',
    location: 'Bellevue, Eastside',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    text: 'The team at Blue Landscaping transformed our backyard into a beautiful oasis. Their attention to detail and creative design ideas were impressive.',
  },
  {
    name: 'Rachel Kim',
    location: 'Redmond, Eastside',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg',
    text: 'Professional, punctual, and passionate about their work. Our garden has never looked better!',
  },
];

export const TestimonialsCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll horizontally
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (scrollRef.current.scrollLeft >= scrollRef.current.scrollWidth / 2) {
          scrollRef.current.scrollLeft = 0; // reset loop
        }
      }
    }, 20); // smoother motion
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#1B3A2F] py-20">
      <div className="max-w-7xl mx-auto px-4 text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Loved by Seattle Homeowners</h2>
        <p className="text-[#B6CFC3] text-lg">Real reviews from real clients who trust Blue Landscaping.</p>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="overflow-x-auto hide-scrollbar"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div className="flex gap-8 px-8 pb-8">
            {[...testimonials, ...testimonials].map((t, i) => (
              <motion.div
                key={`${t.name}-${i}`}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 w-[450px] min-h-[200px] flex-shrink-0 shadow-xl text-left text-white hover:ring-2 hover:ring-[#24503D]/50 hover:bg-[#24503D]/10 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 relative rounded-full overflow-hidden ring-2 ring-white/10">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{t.name}</h3>
                    <p className="text-base text-[#B6CFC3]">{t.location}</p>
                  </div>
                </div>
                <p className="text-lg text-[#E6F2ED] leading-relaxed">{t.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}; 