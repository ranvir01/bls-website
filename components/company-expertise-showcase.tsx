'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, Clock, Users, MapPin, Star, Check, ChevronDown, X } from 'lucide-react';
import { QuoteButton } from '@/components/quote-button';
import { cn } from '@/lib/utils';

export function CompanyExpertiseShowcase() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isShowingAfterImage, setIsShowingAfterImage] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const beforeAfterImages = [
    {
      before: "https://images.pexels.com/photos/589/garden-green-grass-spring.jpg",
      after: "https://images.pexels.com/photos/158028/bellingrath-gardens-alabama-landscape-scenic-158028.jpeg",
      title: "Hillside Terracing",
      description: "Transforming a plain slope into a beautiful terraced garden with native plants"
    },
    {
      before: "https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg",
      after: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg",
      title: "Patio Installation",
      description: "Creating a stunning outdoor living space with custom stonework and seating"
    },
    {
      before: "https://images.pexels.com/photos/158163/color-pattern-plant-wall-158163.jpeg",
      after: "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg",
      title: "Retaining Wall Project",
      description: "Building functional and beautiful retaining walls to maximize usable space"
    },
    {
      before: "https://images.pexels.com/photos/5847357/pexels-photo-5847357.jpeg",
      after: "https://images.pexels.com/photos/1477387/pexels-photo-1477387.jpeg",
      title: "Water Feature Design",
      description: "Adding tranquility and visual interest with custom water features"
    },
    // New slide with the landscaped property image
    {
      before: "https://images.pexels.com/photos/869095/pexels-photo-869095.jpeg",
      after: "https://images.pexels.com/photos/2132101/pexels-photo-2132101.jpeg", 
      title: "Complete Lawn Transformation",
      description: "Revitalizing properties with premium lawn services and landscape design"
    },
  ];

  // Update slider width on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideIndex((prev) => (prev + 1) % beforeAfterImages.length);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setSlideIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
    }
  };

  // Setup autoplay for the slider with better control
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
      
      autoplayTimerRef.current = setInterval(() => {
        if (!isPaused && !lightboxOpen) {
          setIsAnimating(true);
          setSlideIndex((prev) => (prev + 1) % beforeAfterImages.length);
        }
      }, 6000); // Change slide every 6 seconds (slightly slower for better viewing)
    };

    startAutoplay();

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isPaused, beforeAfterImages.length, lightboxOpen]);

  // Reset animation flag
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 600);

    return () => clearTimeout(timer);
  }, [slideIndex]);

  // Open lightbox with specific image
  const openLightbox = (index: number, isAfter: boolean = false) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
    setIsShowingAfterImage(isAfter);
    setIsPaused(true);
    document.body.style.overflow = 'hidden';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    setIsPaused(false);
    document.body.style.overflow = '';
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') {
          closeLightbox();
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev + 1) % beforeAfterImages.length);
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, beforeAfterImages.length]);

  // Close lightbox
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself
    if (e.target === e.currentTarget) {
      closeLightbox();
    }
  };

  // Stats with counters
  const stats = [
    { icon: Clock, title: "25+", subtitle: "Years Experience", color: "bg-blue-50 text-blue-600" },
    { icon: Users, title: "3600+", subtitle: "Projects Completed", color: "bg-teal-50 text-teal-600" },
    { icon: MapPin, title: "25+", subtitle: "Cities Served", color: "bg-green-50 text-green-600" },
    { icon: Star, title: "4.8", subtitle: "Average Rating", color: "bg-amber-50 text-amber-600" },
  ];

  const expertiseAreas = [
    {
      id: "comprehensive",
      title: "Comprehensive Approach",
      content: "Our comprehensive approach combines expert hardscaping knowledge with professional irrigation design, ensuring that every project enhances both beauty and functionality. From engineered retaining walls and custom paver patios to water-efficient irrigation systems and drainage solutions, we create outdoor spaces that maximize curb appeal while solving complex drainage challenges. What sets us apart is our deep expertise in Seattle's unique landscaping challenges. Our solutions are precisely engineered to handle the Pacific Northwest's rainfall patterns while ensuring long-term stability and beauty in our region's demanding climate."
    },
    {
      id: "environmental",
      title: "Environmental Stewardship", 
      content: "We're committed to sustainable practices that conserve resources, protect local ecosystems, and minimize our environmental impact while creating beautiful outdoor spaces."
    },
    {
      id: "local-expertise",
      title: "Local Expertise",
      content: "Over 25 years of specialized experience in hardscaping and irrigation services throughout Seattle. Our expert team designs and installs custom retaining walls, paver patios, and professional irrigation systems engineered specifically for the Pacific Northwest climate."
    }
  ];

  const toggleTab = (tabId: string) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  const tabVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="expertise" className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      <div className="container-custom max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Team Section - Integrated with showcase */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
            >
              Our Team
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            >
              Meet the Experts Behind Our Success
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our skilled team brings decades of combined experience in landscaping, hardscaping, and irrigation solutions
            </motion.p>
          </div>

          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[16/9] w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://i.imgur.com/KngV7VK.jpg"
                alt="Our Expert Team"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 2xl:gap-20 items-center min-h-[80vh]">
          {/* Desktop Before/After Slider */}
          <div className="hidden lg:block relative overflow-hidden rounded-3xl shadow-2xl lg:col-span-6 xl:col-span-7">
            <div 
              ref={sliderRef}
              className="relative aspect-[16/9] w-full overflow-visible scale-110"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div 
                  key={slideIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="relative h-full w-full">
                    <div 
                      className="absolute inset-0 bg-black cursor-pointer overflow-hidden"
                      onClick={() => openLightbox(slideIndex)}
                    >
                      <Image
                        src={beforeAfterImages[slideIndex].before}
                        alt={`Before ${beforeAfterImages[slideIndex].title}`}
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                        priority
                      />
                      <div className="absolute top-6 left-6 bg-black/80 text-white px-6 py-2 rounded-full text-sm font-bold">
                        BEFORE
                      </div>
                    </div>
                    <motion.div 
                      initial={{ clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" }}
                      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                      transition={{ 
                        duration: 5, 
                        ease: "easeInOut",
                        repeat: 1, 
                        repeatType: "reverse", 
                        repeatDelay: 0.5
                      }}
                      className="absolute inset-0 bg-black z-10 cursor-pointer overflow-hidden"
                      onClick={() => openLightbox(slideIndex, true)}
                    >
                      <Image
                        src={beforeAfterImages[slideIndex].after}
                        alt={`After ${beforeAfterImages[slideIndex].title}`}
                        fill
                        className="object-cover object-center"
                        sizes="100vw"
                        priority
                      />
                      <div className="absolute top-6 right-6 bg-white/80 text-black px-6 py-2 rounded-full text-sm font-bold">
                        AFTER
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Expertise Content */}
          <div className="space-y-8 lg:col-span-6 xl:col-span-5 lg:pl-8 xl:pl-12 2xl:pl-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
              >
                <Shield className="h-4 w-4 mr-1.5" />
                <span>Professional Hardscaping & Irrigation</span>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                Expert Retaining Walls & Custom Patios in Seattle Since 1998
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-gray-700 mb-6"
              >
                For over 25 years, <span className="font-semibold text-blue-900">Blue Landscaping Services</span> has been Seattle's premier provider of <span className="font-semibold text-blue-900">professional hardscaping and irrigation solutions</span>. Our expert team specializes in custom retaining walls, paver patios, water features, and professional irrigation systems designed specifically for Seattle's unique terrain and climate.
              </motion.p>

              {/* Mobile Before/After Slider - Positioned between paragraph and Comprehensive Approach */}
              <div className="block lg:hidden mb-8">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <div 
                    ref={sliderRef}
                    className="relative aspect-[4/5] w-full overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    aria-live="polite"
                  >
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={slideIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0"
                      >
                        <div className="relative h-full w-full">
                          <div 
                            className="absolute inset-0 bg-black cursor-pointer overflow-hidden"
                            onClick={() => openLightbox(slideIndex)}
                          >
                            <Image
                              src={beforeAfterImages[slideIndex].before}
                              alt={`Before ${beforeAfterImages[slideIndex].title}`}
                              fill
                              className="object-cover object-center"
                              sizes="100vw"
                              priority
                            />
                            <div className="absolute top-6 left-6 bg-black/80 text-white px-6 py-2 rounded-full text-sm font-bold">
                              BEFORE
                            </div>
                          </div>
                          <motion.div 
                            initial={{ clipPath: "polygon(0 0, 0% 0, 0% 100%, 0 100%)" }}
                            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                            transition={{ 
                              duration: 5, 
                              ease: "easeInOut",
                              repeat: 1, 
                              repeatType: "reverse", 
                              repeatDelay: 0.5
                            }}
                            className="absolute inset-0 bg-black z-10 cursor-pointer overflow-hidden"
                            onClick={() => openLightbox(slideIndex, true)}
                          >
                            <Image
                              src={beforeAfterImages[slideIndex].after}
                              alt={`After ${beforeAfterImages[slideIndex].title}`}
                              fill
                              className="object-cover object-center"
                              sizes="100vw"
                              priority
                            />
                            <div className="absolute top-6 right-6 bg-white/80 text-black px-6 py-2 rounded-full text-sm font-bold">
                              AFTER
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>
              
              {/* Expandable Content Areas with improved styling */}
              <div className="space-y-4 my-8">
                {expertiseAreas.map((area) => (
                  <motion.div 
                    key={area.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button 
                      onClick={() => toggleTab(area.id)} 
                      className={cn(
                        "w-full px-4 py-3.5 flex items-center justify-between transition-colors",
                        activeTab === area.id 
                          ? "bg-blue-50 text-blue-800" 
                          : "bg-white text-gray-800 hover:bg-gray-50"
                      )}
                    >
                      <div className="flex items-center">
                        <Check className={cn(
                          "w-5 h-5 mr-3",
                          activeTab === area.id ? "text-blue-600" : "text-gray-400"
                        )} />
                        <span className="font-medium">{area.title}</span>
                      </div>
                      <ChevronDown className={cn(
                        "w-5 h-5 transition-transform duration-300",
                        activeTab === area.id ? "rotate-180" : ""
                      )} />
                    </button>
                    
                    <AnimatePresence>
                      {activeTab === area.id && (
                        <motion.div
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          variants={tabVariants}
                        >
                          <div className="px-5 py-4 bg-gray-50 border-t border-gray-200"> 
                            <p className="text-gray-700" dangerouslySetInnerHTML={{
                              __html: area.content.replace(
                                /(expert hardscaping|professional irrigation design|engineered retaining walls|custom paver patios|water-efficient irrigation systems|drainage solutions|deep expertise|long-term stability)/g,
                                '<span class="font-semibold text-blue-900">$1</span>'
                              )
                            }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats Grid with animated counters */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
                  }}
                  className="bg-white p-6 rounded-xl shadow-lg text-center"
                >
                  <div className={`${stat.color.split(' ')[0]} p-3 inline-flex rounded-full mb-4`}>
                    <stat.icon className={`w-6 h-6 ${stat.color.split(' ')[1]}`} />
                  </div>
                  <CountUp 
                    target={stat.title} 
                    className="text-4xl font-bold text-gray-900"
                    duration={2}
                  />
                  <p className="text-sm text-gray-500">{stat.subtitle}</p>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button with ripple effect */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="pt-6"
            >
              <QuoteButton 
                className="group relative overflow-hidden flex w-full items-center justify-center bg-blue-700 text-white px-8 py-5 rounded-lg font-medium hover:bg-blue-800 transition-colors shadow-lg"
              >
                {/* Ripple effect on hover */}
                <span className="absolute inset-0 w-full h-full bg-white/20 scale-0 rounded-full opacity-0 group-hover:scale-[2.5] group-hover:opacity-100 transition-all duration-500 origin-center"></span>
                <span className="relative z-10 text-lg">Get a Free Quote</span>
              </QuoteButton>
              <p className="text-center text-gray-500 text-sm mt-2">No obligation consultation • Personalized designs • Detailed estimates</p>
            </motion.div>
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-[100] bg-black/95"
              onClick={closeLightbox}
            />
            
            {/* Content */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center" onClick={handleBackdropClick}>
              {/* Close button */}
              <button
                className="absolute top-4 right-4 z-[102] bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-colors"
                onClick={closeLightbox}
              >
                <X size={24} />
              </button>

              {/* Controls and Image Container */}
              <div 
                className="relative w-full h-full max-w-7xl mx-auto p-4"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Before/After Controls */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[102] flex gap-4">
                  <button
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      !isShowingAfterImage ? 'bg-white text-black' : 'bg-black/50 text-white'
                    }`}
                    onClick={() => setIsShowingAfterImage(false)}
                  >
                    Before
                  </button>
                  <button
                    className={`px-6 py-2 rounded-full font-medium transition-colors ${
                      isShowingAfterImage ? 'bg-white text-black' : 'bg-black/50 text-white'
                    }`}
                    onClick={() => setIsShowingAfterImage(true)}
                  >
                    After
                  </button>
                </div>

                {/* Navigation Arrows */}
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[102] bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length);
                  }}
                >
                  <ArrowLeft size={24} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[102] bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((prev) => (prev + 1) % beforeAfterImages.length);
                  }}
                >
                  <ArrowRight size={24} />
                </button>

                {/* Image */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-full">
                    <Image
                      src={isShowingAfterImage ? beforeAfterImages[lightboxIndex].after : beforeAfterImages[lightboxIndex].before}
                      alt={`${isShowingAfterImage ? 'After' : 'Before'} ${beforeAfterImages[lightboxIndex].title}`}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                      quality={100}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Simple CountUp component for statistics
function CountUp({ target, className, duration = 2 }: { target: string, className?: string, duration?: number }) {
  const [count, setCount] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const targetValue = target.replace(/\D/g, '');
  const hasPlus = target.includes('+');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startCounting();
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const startCounting = () => {
    const isNumber = !isNaN(Number(targetValue));
    
    if (!isNumber) {
      setCount(target);
      return;
    }
    
    const endValue = Number(targetValue);
    const step = endValue / (duration * 60); // 60fps
    
    let currentValue = 0;
    const timer = setInterval(() => {
      currentValue += step;
      
      if (currentValue >= endValue) {
        setCount(targetValue + (hasPlus ? '+' : ''));
        clearInterval(timer);
      } else {
        setCount(Math.floor(currentValue).toString() + (hasPlus ? '+' : ''));
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  };
  
  return <p ref={counterRef} className={className}>{count}</p>;
}