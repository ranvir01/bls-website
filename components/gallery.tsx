"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Zoom } from 'swiper/modules';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/zoom';

interface GalleryImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  images: GalleryImage[];
  className?: string;
}

export const Gallery = ({ images, className }: GalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <div className={className}>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div 
                className="relative h-64 md:h-72 cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="w-full max-w-6xl h-full max-h-[80vh]" onClick={(e) => e.stopPropagation()}>
              <Swiper
                modules={[Navigation, Pagination, Zoom]}
                initialSlide={activeIndex}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                zoom={{ maxRatio: 3 }}
                className="h-full"
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center">
                    <div className="swiper-zoom-container">
                      <div className="relative w-full h-full" style={{ aspectRatio: '16/9' }}>
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-contain"
                          sizes="100vw"
                          quality={90}
                        />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};