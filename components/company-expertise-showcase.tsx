'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Shield, Clock, Users, MapPin, Star, Check, ChevronDown, X, Leaf, Globe } from 'lucide-react';
import { QuoteButton } from '@/components/quote-button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

export function CompanyExpertiseShowcase() {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
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

  const [imageLightboxOpen, setImageLightboxOpen] = useState(false);
  const [imageLightboxIndex, setImageLightboxIndex] = useState(0);

  const beforeAfterImages = [
    { before: "https://imgur.com/a4YfFsq.png", after: "https://imgur.com/g7If2eg.png" },
    { before: "https://imgur.com/rtFxUlr.png", after: "https://imgur.com/w5zcAJ6.png" },
    { before: "https://imgur.com/zHKeI3Q.png", after: "https://imgur.com/kDH4cbo.png" },
    { before: "https://imgur.com/znNyHFH.png", after: "https://imgur.com/iXHwj38.png" },
    { before: "https://imgur.com/2FpEyQb.png", after: "https://imgur.com/qd4YfuQ.png" },
    { before: "https://imgur.com/OADM5v9.png", after: "https://imgur.com/jO1pDEK.png" },
    { before: "https://imgur.com/i4ZrNmk.png", after: "https://imgur.com/055OKmw.png" },
  ];

  const totalLightboxImages = beforeAfterImages.length * 2;

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

  // Replace openLightbox and closeLightbox for before/after images
  const openImageLightbox = (type: 'before' | 'after', idx: number) => {
    setImageLightboxIndex(idx * 2 + (type === 'after' ? 1 : 0));
    setImageLightboxOpen(true);
    setIsPaused(true);
  };
  const closeImageLightbox = () => {
    setImageLightboxOpen(false);
    setIsPaused(false);
  };
  const goToPrevLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageLightboxIndex((prev) => (prev - 1 + totalLightboxImages) % totalLightboxImages);
  };
  const goToNextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImageLightboxIndex((prev) => (prev + 1) % totalLightboxImages);
  };

  // Helper to get current image and label
  const getLightboxImage = () => {
    const idx = Math.floor(imageLightboxIndex / 2);
    const isAfter = imageLightboxIndex % 2 === 1;
    return {
      src: isAfter ? beforeAfterImages[idx].after : beforeAfterImages[idx].before,
      label: isAfter ? 'AFTER' : 'BEFORE',
      alt: `${isAfter ? 'After' : 'Before'} ${idx + 1}`
    };
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (imageLightboxOpen) {
        if (e.key === 'Escape') {
          closeImageLightbox();
        } else if (e.key === 'ArrowRight') {
          setImageLightboxIndex((prev) => (prev + 1) % totalLightboxImages);
        } else if (e.key === 'ArrowLeft') {
          setImageLightboxIndex((prev) => (prev - 1 + totalLightboxImages) % totalLightboxImages);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imageLightboxOpen, totalLightboxImages]);

  // Close lightbox
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself
    if (e.target === e.currentTarget) {
      closeImageLightbox();
    }
  };

  // Stats with counters
  const stats = [
    { icon: Clock, title: "25+", subtitle: "Years Experience", color: "bg-blue-50 text-blue-600" },
    { icon: Users, title: "3600+", subtitle: "Projects Completed", color: "bg-teal-50 text-teal-600" },
    { icon: MapPin, title: "25+", subtitle: "Cities Served", color: "bg-green-50 text-green-600" },
    { icon: Star, title: "4.8/5", subtitle: "Average Rating", color: "bg-amber-50 text-amber-600" },
  ];

  const expertiseAreas = [
    {
      id: "design-work",
      title: "Design Work",
      content: `<div class='flex items-start gap-3 mb-2'><span class='inline-flex items-center justify-center bg-yellow-100 rounded-full p-2'><svg xmlns='http://www.w3.org/2000/svg' class='lucide lucide-brush w-6 h-6 text-yellow-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path d='M2 22c0-2.5 2-4.5 4.5-4.5S11 19.5 11 22' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><path d='M22 2L12 12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><rect x='14' y='2' width='8' height='8' rx='2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span><span class='font-bold text-yellow-800'>Design Work</span></div>
      <strong>Our design work</strong> showcases the best in <strong>landscaping innovation</strong> for <strong>Seattle</strong> and the Pacific Northwest. We blend creative vision with advanced technology, including <strong>AI-driven design tools</strong>, to deliver outdoor spaces that are both beautiful and functional. Our team understands the unique climate and terrain of <strong>Seattle</strong>, ensuring every project is tailored for local conditions. Whether you need a modern garden, sustainable landscape, or a complete transformation, our <strong>design work</strong> stands out for quality, creativity, and local expertise. Discover how we use the latest trends and future technology to create lasting value for your property in <strong>Seattle</strong> and surrounding areas.`
    },
    {
      id: "comprehensive",
      title: "Comprehensive Approach",
      content: `<div class='flex items-start gap-3 mb-2'><span class='inline-flex items-center justify-center bg-indigo-100 rounded-full p-2'><svg xmlns='http://www.w3.org/2000/svg' class='lucide lucide-layers w-6 h-6 text-indigo-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><polygon points='12 2 2 7 12 12 22 7 12 2' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><polyline points='2 17 12 22 22 17' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><polyline points='2 12 12 17 22 12' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span><span class='font-bold text-indigo-800'>Comprehensive Landscaping</span></div>
      Our <strong>comprehensive approach</strong> combines <strong>expert hardscaping</strong> knowledge with <strong>professional irrigation design</strong>, ensuring every project enhances both <strong>beauty</strong> and <strong>functionality</strong>. From <strong>engineered retaining walls</strong> and <strong>custom paver patios</strong> to <strong>water-efficient irrigation systems</strong> and <strong>drainage solutions</strong>, we create outdoor spaces that maximize <strong>curb appeal</strong> while solving complex drainage challenges. What sets us apart is our <strong>deep expertise</strong> in <strong>Seattle's unique landscaping</strong> needs. Our solutions are precisely engineered to handle the <strong>Pacific Northwest's rainfall patterns</strong> while ensuring <strong>long-term stability</strong> and <strong>lasting beauty</strong> in our region's demanding climate. Choose us for <strong>comprehensive landscaping services</strong> in Seattle and beyond.`
    },
    {
      id: "environmental",
      title: "Environmental Stewardship", 
      content: `<div class='flex items-start gap-3 mb-2'><span class='inline-flex items-center justify-center bg-green-100 rounded-full p-2'><svg xmlns='http://www.w3.org/2000/svg' class='lucide lucide-leaf w-6 h-6 text-green-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path d='M2 22C2 22 2 15 8 9C14 3 22 2 22 2C22 2 21 10 15 16C9 22 2 22 2 22Z' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span><span class='font-bold text-green-800'>Eco-Friendly</span></div>
      We're committed to <strong>sustainable practices</strong> that conserve resources, protect local ecosystems, and minimize our <strong>environmental impact</strong> while creating beautiful outdoor spaces. Our <strong>eco-friendly landscaping</strong> solutions use native plants, water-efficient irrigation, and organic materials to support biodiversity and reduce waste. Choose us for <strong>green landscaping</strong> in <strong>Seattle</strong> and the <strong>Pacific Northwest</strong>.`
    },
    {
      id: "local-expertise",
      title: "Local Expertise",
      content: `<div class='flex items-start gap-3 mb-2'><span class='inline-flex items-center justify-center bg-blue-100 rounded-full p-2'><svg xmlns='http://www.w3.org/2000/svg' class='lucide lucide-map-pin w-6 h-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path d='M12 21C12 21 5 13.5 5 9.5C5 6.46243 7.46243 4 10.5 4C13.5376 4 16 6.46243 16 9.5C16 13.5 12 21 12 21Z' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/><circle cx='12' cy='9.5' r='2.5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg></span><span class='font-bold text-blue-800'>Seattle Experts</span></div>
      With over <strong>25 years of specialized experience</strong> in <strong>hardscaping</strong> and <strong>irrigation services</strong> throughout <strong>Seattle</strong>, our expert team designs and installs custom <strong>retaining walls</strong>, <strong>paver patios</strong>, and <strong>professional irrigation systems</strong> engineered specifically for the <strong>Pacific Northwest climate</strong>. We understand the unique soil, weather, and drainage challenges of our region, ensuring every project is built to last. Trust our <strong>local expertise</strong> for your next landscaping project.`
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

  // Helper for Isaac label position (tweak as needed for your image)
  const isaacLabelStyle = {
    position: 'absolute',
    bottom: '18%', // adjust as needed
    right: '22%', // adjust as needed
    background: 'rgba(0,0,0,0.7)',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '1rem',
    fontWeight: 600,
    zIndex: 10,
    pointerEvents: 'none',
  };

  return (
    <section className={cn(
      "bg-gradient-to-b from-gray-50 to-white overflow-hidden relative",
      isHomePage ? "pt-4 md:pt-6" : "pt-16 md:pt-20"
    )}>
      <div className="container-custom max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Team Section - Integrated with showcase */}
        <div className={cn(
          "mb-24",
          isHomePage ? "pt-4" : "pt-16"
        )} id="team">
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

          <div className="mb-16 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative w-full max-w-2xl aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-200 group cursor-pointer"
              onClick={() => { setLightboxOpen(true); setLightboxIndex(-1); }}
              tabIndex={0}
              role="button"
              aria-label="Expand team photo"
            >
              <Image
                src="https://i.imgur.com/KngV7VK.jpg"
                alt="Owners"
                fill
                className="object-cover object-center transition-transform duration-300 group-hover:scale-110"
                priority
                style={{objectPosition: 'center 60%'}} // focus more on people
              />
              {/* Overlay caption */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-6 py-4 flex flex-col items-start">
                <span className="text-white text-lg font-semibold drop-shadow">Owners</span>
                <span className="text-white text-xs mt-1 opacity-80">Click to expand</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 2xl:gap-20 items-center min-h-[80vh]">
          {/* Desktop Design Work Heading + Image Group */}
          <div className="hidden lg:flex flex-col lg:col-span-6 xl:col-span-7 items-center">
            <h3 className="text-lg md:text-2xl font-bold text-blue-900 text-center bg-white/80 rounded-xl px-4 py-2 shadow-md mb-2">
              Our Design Work: Before & After Transformations
            </h3>
            <div className="relative overflow-hidden rounded-3xl shadow-2xl w-full">
              {/* Desktop Before/After Slider */}
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
                        onClick={() => openImageLightbox('before', slideIndex)}
                      >
                        <Image
                          src={beforeAfterImages[slideIndex].before}
                          alt={`Before ${slideIndex + 1}`}
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
                        onClick={() => openImageLightbox('after', slideIndex)}
                      >
                        <Image
                          src={beforeAfterImages[slideIndex].after}
                          alt={`After ${slideIndex + 1}`}
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
          {/* Mobile Design Work Heading + Image Group */}
          <div className="block lg:hidden w-full mb-8">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-base md:text-xl font-bold text-blue-900 text-center bg-white/80 rounded-xl px-3 py-1.5 shadow mb-1">
                Our Design Work: Before & After Transformations
              </h3>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl w-full">
                {/* Mobile Before/After Slider */}
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
                          onClick={() => openImageLightbox('before', slideIndex)}
                        >
                          <Image
                            src={beforeAfterImages[slideIndex].before}
                            alt={`Before ${slideIndex + 1}`}
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
                          onClick={() => openImageLightbox('after', slideIndex)}
                        >
                          <Image
                            src={beforeAfterImages[slideIndex].after}
                            alt={`After ${slideIndex + 1}`}
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
                            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: area.content }} />
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

        {/* Lightbox for before/after images */}
        {imageLightboxOpen && (
          <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={closeImageLightbox}>
            <button
              className="absolute top-4 right-4 z-10 text-white bg-black/60 p-3 rounded-full"
              onClick={e => { e.stopPropagation(); closeImageLightbox(); }}
              aria-label="Close expanded image"
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/60 p-3 rounded-full"
              onClick={goToPrevLightbox}
              aria-label="Previous image"
            >
              <ArrowLeft size={28} />
            </button>
            <button
              className="absolute right-16 top-1/2 -translate-y-1/2 z-10 text-white bg-black/60 p-3 rounded-full"
              onClick={goToNextLightbox}
              aria-label="Next image"
            >
              <ArrowRight size={28} />
            </button>
            <div className="relative w-full max-w-4xl max-h-[90vh] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-200 flex items-center justify-center bg-black" onClick={e => e.stopPropagation()}>
              <Image
                src={getLightboxImage().src}
                alt={getLightboxImage().alt}
                fill
                className="object-contain"
                priority
                quality={100}
              />
              <div className={`absolute top-6 left-6 bg-black/80 text-white px-6 py-2 rounded-full text-sm font-bold`}>
                {getLightboxImage().label}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// Simple CountUp component for statistics
function CountUp({ target, className, duration = 2 }: { target: string, className?: string, duration?: number }) {
  // Detect if the stat is a decimal with a slash (e.g., 4.8/5)
  const decimalMatch = target.match(/^(\d+\.?\d*)\/(\d+)$/);
  const [count, setCount] = useState(decimalMatch ? 0 : (target.match(/\d+/) ? "0" : target));
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLParagraphElement>(null);
  
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
    if (decimalMatch) {
      const endValue = parseFloat(decimalMatch[1]);
      const denominator = decimalMatch[2];
      const step = endValue / (duration * 60); // 60fps
      let currentValue = 0;
      const timer = setInterval(() => {
        currentValue += step;
        if (currentValue >= endValue) {
          setCount(`${endValue.toFixed(1)}/${denominator}`);
          clearInterval(timer);
        } else {
          setCount(`${currentValue.toFixed(1)}/${denominator}`);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    } else {
      const targetValue = target.replace(/\D/g, '');
      const hasPlus = target.includes('+');
      const suffix = hasPlus ? '+' : '';
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
          setCount(targetValue + suffix);
          clearInterval(timer);
        } else {
          setCount(Math.floor(currentValue).toString() + suffix);
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  };
  
  return <p ref={counterRef} className={className}>{count}</p>;
}