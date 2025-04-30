'use client';

import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Testimonial data
const testimonials = [
  {
    quote: "We hired Blue Landscaping for our challenging hillside property. They terraced the slope, installed drought-resistant plantings, and engineered a perfect drainage solution. A year later, our garden thrives and shows no signs of erosion.",
    name: "David Chen",
    location: "Capitol Hill, Seattle",
    project: "Hillside Terracing · 2022",
  },
  {
    quote: "From our first call to project completion, the team was professional and attentive. They transformed our backyard into an outdoor living oasis with custom pavers, lighting, and a stunning water feature. We couldn't be happier!",
    name: "Emily Rodriguez",
    location: "Ballard, Seattle",
    project: "Custom Patio & Water Feature · 2023",
  },
  {
    quote: "Blue Landscaping's irrigation experts saved our lawn last season. Their smart drip-irrigation system keeps our beds perfectly hydrated without waste. Installation was seamless, and our yard has never looked greener.",
    name: "Michael Lee",
    location: "Queen Anne, Seattle",
    project: "Smart Irrigation Installation · 2024",
  },
];

function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  };

  const handleMouseEnter = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop();
      setIsAutoplayPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start();
      setIsAutoplayPaused(false);
    }
  };

  return (
    <section className="py-12 bg-gray-100/50 overflow-hidden rounded-3xl shadow-xl">
      <div className="max-w-[800px] mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Real Results for Seattle Homeowners
          </h2>
        </div>
        
        <div 
          className="mt-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            pagination={{ 
              clickable: true,
              bulletActiveClass: 'bg-teal-600 w-3 h-3',
              bulletClass: 'inline-block w-2 h-2 bg-gray-300 rounded-full mx-1 transition-all duration-200',
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            effect="fade"
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={handleSlideChange}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-12"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Quote 
                    className={`h-12 w-12 text-blue-500 mb-6 opacity-20 transform transition-transform duration-300 ${
                      isHovered ? 'scale-110' : 'scale-100'
                    }`}
                    aria-hidden="true"
                  />
                  <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed relative">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-gray-500">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-blue-600 font-medium">{testimonial.project}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.slideTo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === index ? 'bg-blue-600 scale-125' : 'bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <a 
              href="/testimonials"
              className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center group text-sm"
            >
              Read all testimonials 
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-2"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .swiper-pagination {
          position: relative;
          margin-top: 1.5rem;
        }
      `}</style>
    </section>
  );
}

export default TestimonialSlider;