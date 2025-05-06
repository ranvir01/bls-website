'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronDown, ChevronUp, ChevronRight, Hammer, Droplets, Leaf, 
  Home, Blocks, Building2, Flame, Settings, 
  Palette, Trees, Scissors, Sun, Plane, Recycle, Grid
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuoteButton } from '@/components/quote-button';
import { serviceCategories } from '@/data/service-categories';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from './ui/carousel';
import { Modal } from './ui/modal';
import Autoplay from 'embla-carousel-autoplay';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProgressiveImage } from './ui/progressive-image';

interface ServiceFeature {
  text: string;
  icon: React.ElementType;
}

interface ServiceDetails {
  [key: string]: string[];
}

interface Service {
  id: string;
  title: string;
  icon: React.ElementType;
  image: string;
  description: string;
  features: ServiceFeature[];
  details: ServiceDetails;
  link: string;
  subServices: string[];
}

const services: Service[] = [
  {
    id: 'hardscaping',
    title: 'Hardscaping',
    icon: Hammer,
    image: '/images/hardscaping-service.jpg',
    description: 'Transform your outdoor space with expert hardscaping: patios, retaining walls, walkways, driveways, fire features, and more. Our Seattle team builds durable, beautiful hardscape features for lasting value and curb appeal.',
    features: [
      { text: 'Patios & Outdoor Living Spaces', icon: Home },
      { text: 'Retaining Walls & Steps', icon: Blocks },
      { text: 'Driveways & Walkways', icon: Building2 },
      { text: 'Fire Pits & Water Features', icon: Flame },
      { text: 'Built-in Seating', icon: Blocks }
    ],
    details: {
      overview: ['Custom patios, walkways, and driveways', 'Engineered retaining walls for slope management', 'Outdoor fire features and water elements', 'Built-in seating and stonework', 'Expert installation for Seattle climate'],
    },
    link: '/services/hardscaping',
    subServices: [
      'Patios',
      'Walkways & Pathways',
      'Retaining Walls',
      'Driveways',
      'Outdoor Fire Features',
      'Steps & Stairs',
      'Built-in Seating',
      'Water Features',
    ],
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    icon: Droplets,
    image: '/images/irrigation-service.jpg',
    description: 'Keep your landscape healthy and efficient with smart irrigation systems. We design, install, and maintain water-saving solutions for Seattle properties, including drip irrigation, sprinklers, and smart controllers.',
    features: [
      { text: 'Smart Irrigation Systems', icon: Settings },
      { text: 'Sprinkler Installation & Repair', icon: Droplets },
      { text: 'Water Conservation Solutions', icon: Blocks },
      { text: 'Seasonal Adjustments', icon: Settings },
      { text: 'Landscape Lighting Integration', icon: Flame }
    ],
    details: {
      overview: ['Custom irrigation design and installation', 'Smart controllers and water-saving tech', 'Sprinkler and drip system maintenance', 'Seasonal system checks and repairs', 'Landscape lighting integration'],
    },
    link: '/services/irrigation',
    subServices: [
      'Irrigation Maintenance',
      'Sprinkler Installation',
      'Sprinkler Repair',
    ],
  },
  {
    id: 'other',
    title: 'Other Services',
    icon: Grid,
    image: '/images/landscaping-service.jpg',
    description: 'Complete your landscape with fencing, lawn care, planting, sod installation, and more. Our team provides all the finishing touches and ongoing maintenance for a beautiful, functional outdoor space.',
    features: [
      { text: 'Fencing & Privacy Solutions', icon: Blocks },
      { text: 'Lawn Maintenance', icon: Scissors },
      { text: 'Planting & Garden Design', icon: Palette },
      { text: 'Sod Installation', icon: Trees },
      { text: 'Seasonal Cleanups', icon: Sun }
    ],
    details: {
      overview: ['Custom fencing and privacy solutions', 'Lawn care and maintenance', 'Planting and garden design', 'Sod installation for instant lawns', 'Seasonal and ongoing maintenance'],
    },
    link: '/services/other',
    subServices: [
      'Fencing',
      'Lawn Maintenance',
      'Planting & Design',
      'Sod Installation',
    ],
  },
];

// Imgur links for hardscaping gallery
const hardscapingImages = [
  'https://i.imgur.com/gNOWitQ.jpg',
  'https://i.imgur.com/S0SCwEP.jpg',
  'https://i.imgur.com/rONx6pN.jpg',
  'https://i.imgur.com/krNpok4.jpg',
  'https://i.imgur.com/WxjPT00.jpg',
  'https://i.imgur.com/ihMJotj.jpg',
  'https://i.imgur.com/IM63yVK.jpg',
  'https://i.imgur.com/WalHE5M.jpg',
  'https://i.imgur.com/iuOTAoq.jpg',
  'https://i.imgur.com/wDBAf8S.jpg',
  'https://i.imgur.com/lK3DW9m.jpg',
  'https://i.imgur.com/vaAE2xG.jpg',
  'https://i.imgur.com/IbU3PZH.jpg',
  'https://i.imgur.com/tlBRoZQ.jpg',
  'https://i.imgur.com/Vn4NTeS.jpg',
  'https://i.imgur.com/01wyJYX.jpg',
  'https://i.imgur.com/iI4T9B9.jpg',
  'https://i.imgur.com/xrJCGj8.jpg',
  'https://i.imgur.com/beK9wHi.jpg',
  'https://i.imgur.com/IE7g7jQ.jpg',
  'https://i.imgur.com/xlGUzbO.jpg',
  'https://i.imgur.com/Z1fqC0W.jpg',
  'https://i.imgur.com/3YCtVmB.jpg',
  'https://i.imgur.com/W4rJQVT.jpg',
  'https://i.imgur.com/kZT1SN0.jpg',
  'https://i.imgur.com/HsOg2ir.jpg',
  'https://i.imgur.com/Kg5cNlS.jpg',
  'https://i.imgur.com/aAuWL1A.jpg',
  'https://i.imgur.com/pzVfDKZ.jpg',
  'https://i.imgur.com/Ie2Az1m.jpg',
  'https://i.imgur.com/8pQpJzJ.jpg',
  'https://i.imgur.com/1LbzU5m.jpg',
  'https://i.imgur.com/fqpLd95.jpg',
  'https://i.imgur.com/JMydFBT.jpg',
  'https://i.imgur.com/meLTFWW.jpg',
  'https://i.imgur.com/IhXP84p.jpg',
  'https://i.imgur.com/ieMuskv.jpg',
  'https://i.imgur.com/zM33JVe.jpg',
  'https://i.imgur.com/Ti3plls.jpg',
  'https://i.imgur.com/cYefFPu.jpg',
  'https://i.imgur.com/pMywawC.jpg',
  'https://i.imgur.com/p5jQQCe.jpg',
  'https://i.imgur.com/YAIIZ80.jpg',
  'https://i.imgur.com/pDES5RU.jpg',
  'https://i.imgur.com/Q9tSlNG.jpg',
  'https://i.imgur.com/nxGpCQx.jpg',
];

// Imgur links for irrigation gallery
const irrigationImages = [
  'https://i.imgur.com/jzBsjww.jpg',
  'https://i.imgur.com/KP4cslY.jpg',
  'https://i.imgur.com/LkN1m9v.jpg',
  'https://i.imgur.com/CYMUEYS.jpg',
  'https://i.imgur.com/AKFKlal.jpg',
  'https://i.imgur.com/DMC2c2v.jpg',
  'https://i.imgur.com/9rWWTOJ.jpg',
  'https://i.imgur.com/UPQn98E.jpg',
  'https://i.imgur.com/EZEIB0b.jpg',
  'https://i.imgur.com/y17JRRL.jpg',
  'https://i.imgur.com/8Kk2pvf.jpg',
  'https://i.imgur.com/oH7Zioq.jpg',
  'https://i.imgur.com/SXby7oE.jpg',
  'https://i.imgur.com/H90g2lh.jpg',
  'https://i.imgur.com/1W7h4KQ.jpg',
  'https://i.imgur.com/Q1ITpfM.jpg',
  'https://i.imgur.com/emc78kf.jpg',
  'https://i.imgur.com/9xXwPeo.jpg',
  'https://i.imgur.com/p4pchFK.jpg',
];

// Imgur links for other services gallery
const otherServicesImages = [
  'https://i.imgur.com/ac5J7DP.jpg',
  'https://i.imgur.com/TRSuzIt.jpg',
  'https://i.imgur.com/PwTnP1V.jpg',
  'https://i.imgur.com/fcuXlOI.jpg',
  'https://i.imgur.com/TrOMn93.jpg',
  'https://i.imgur.com/Gp7p8rn.jpg',
  'https://i.imgur.com/bXUelJe.jpg',
  'https://i.imgur.com/4rQXFgr.jpg',
  'https://i.imgur.com/QkYDlxb.jpg',
  'https://i.imgur.com/cW5U6SQ.jpg',
  'https://i.imgur.com/0yszzEK.jpg',
  'https://i.imgur.com/9iTCouu.jpg',
  'https://i.imgur.com/Z4FDFMh.jpg',
  'https://i.imgur.com/fLtQURL.jpg',
  'https://i.imgur.com/30vqK2G.jpg',
  'https://i.imgur.com/9mAnZGw.jpg',
  'https://i.imgur.com/CqckNYx.jpg',
  'https://i.imgur.com/1hZGbAl.jpg',
  'https://i.imgur.com/MRdn7QA.jpg',
  'https://i.imgur.com/xPoK3O9.jpg',
  'https://i.imgur.com/u0ngIw5.jpg',
  'https://i.imgur.com/haU73uK.jpg',
  'https://i.imgur.com/oQaMbnI.jpg',
  'https://i.imgur.com/u3SGBMG.jpg',
  'https://i.imgur.com/Oh7X8e3.jpg',
  'https://i.imgur.com/qKo8vfZ.jpg',
  'https://i.imgur.com/YsV0DLp.jpg',
  'https://i.imgur.com/hqSfibV.jpg',
  'https://i.imgur.com/gG5h7Zu.jpg',
  'https://i.imgur.com/62hxRnY.jpg',
  'https://i.imgur.com/KGYTzxd.jpg',
  'https://i.imgur.com/TkQ9QVb.jpg',
  'https://i.imgur.com/s85ERoS.jpg',
  'https://i.imgur.com/6ufmNMb.jpg',
  'https://i.imgur.com/vLoG0qT.jpg',
  'https://i.imgur.com/vekuodq.jpg',
  'https://i.imgur.com/8ZePdi5.jpg',
  'https://i.imgur.com/LkWTnyz.jpg',
  'https://i.imgur.com/v9ZdiZx.jpg',
  'https://i.imgur.com/PCWNVxb.jpg',
  'https://i.imgur.com/oGHOa8b.jpg',
  'https://i.imgur.com/BzVWsTq.jpg',
  'https://i.imgur.com/TKANgyr.jpg',
  'https://i.imgur.com/cXTjSEa.jpg',
  'https://i.imgur.com/BtR9L5l.jpg',
  'https://i.imgur.com/567ip1q.jpg',
  'https://i.imgur.com/LxTuww5.jpg',
  'https://i.imgur.com/WLxRsiB.jpg',
];

function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface GalleryProps {
  images: string[];
  onImageClick: (img: string) => void;
}

function HardscapingGallery({ images, onImageClick }: GalleryProps) {
  const plugins = React.useMemo(() => [Autoplay({ delay: 3000, stopOnInteraction: false })], []);
  return (
    <Carousel opts={{ loop: true }} plugins={plugins} className="relative">
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={img} className="flex justify-center items-center">
            <div className="relative w-full h-64 cursor-pointer group" onClick={() => onImageClick(img)}>
              <ProgressiveImage
                src={img}
                alt={`Hardscaping example ${idx + 1}`}
                fill
                className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md" />
    </Carousel>
  );
}

function IrrigationGallery({ images, onImageClick }: GalleryProps) {
  const plugins = React.useMemo(() => [Autoplay({ delay: 3000, stopOnInteraction: false })], []);
  return (
    <Carousel opts={{ loop: true }} plugins={plugins} className="relative">
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={img} className="flex justify-center items-center">
            <div className="relative w-full h-64 cursor-pointer group" onClick={() => onImageClick(img)}>
              <ProgressiveImage
                src={img}
                alt={`Irrigation example ${idx + 1}`}
                fill
                className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md" />
    </Carousel>
  );
}

function OtherServicesGallery({ images, onImageClick }: GalleryProps) {
  const plugins = React.useMemo(() => [Autoplay({ delay: 3000, stopOnInteraction: false })], []);
  return (
    <Carousel opts={{ loop: true }} plugins={plugins} className="relative">
      <CarouselContent>
        {images.map((img, idx) => (
          <CarouselItem key={img} className="flex justify-center items-center">
            <div className="relative w-full h-64 cursor-pointer group" onClick={() => onImageClick(img)}>
              <ProgressiveImage
                src={img}
                alt={`Landscaping example ${idx + 1}`}
                fill
                className="object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-[1.02]"
                unoptimized={true}
              />
              <div className="absolute inset-0 bg-black/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white shadow-md" />
    </Carousel>
  );
}

export const ProfessionalServices = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showMore, setShowMore] = useState(false);
  const [showSubServices, setShowSubServices] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImgIdx, setModalImgIdx] = useState<number | null>(null);
  const shuffledImagesRef = React.useRef(shuffleArray(hardscapingImages));
  const shuffledImages = shuffledImagesRef.current;
  const handleImageClick = (img: string) => {
    const idx = shuffledImages.indexOf(img);
    setModalImgIdx(idx);
    setModalOpen(true);
  };
  const handlePrev = () => {
    if (modalImgIdx === null) return;
    setModalImgIdx((prev) => (prev === 0 ? shuffledImages.length - 1 : (prev as number) - 1));
  };
  const handleNext = () => {
    if (modalImgIdx === null) return;
    setModalImgIdx((prev) => (prev === shuffledImages.length - 1 ? 0 : (prev as number) + 1));
  };
  // Keyboard navigation for modal
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOpen, modalImgIdx]);

  const toggleDetails = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    setShowSubServices(null);
  };

  // Add irrigation modal state
  const [modalIrrigationOpen, setModalIrrigationOpen] = useState(false);
  const [modalIrrigationImgIdx, setModalIrrigationImgIdx] = useState<number | null>(null);
  const shuffledIrrigationImagesRef = React.useRef(shuffleArray(irrigationImages));
  const shuffledIrrigationImages = shuffledIrrigationImagesRef.current;
  const handleIrrigationImageClick = (img: string) => {
    const idx = shuffledIrrigationImages.indexOf(img);
    setModalIrrigationImgIdx(idx);
    setModalIrrigationOpen(true);
  };
  const handleIrrigationPrev = () => {
    if (modalIrrigationImgIdx === null) return;
    setModalIrrigationImgIdx((prev) => (prev === 0 ? shuffledIrrigationImages.length - 1 : (prev as number) - 1));
  };
  const handleIrrigationNext = () => {
    if (modalIrrigationImgIdx === null) return;
    setModalIrrigationImgIdx((prev) => (prev === shuffledIrrigationImages.length - 1 ? 0 : (prev as number) + 1));
  };
  useEffect(() => {
    if (!modalIrrigationOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleIrrigationPrev();
      if (e.key === 'ArrowRight') handleIrrigationNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalIrrigationOpen, modalIrrigationImgIdx]);

  // Add other services modal state
  const [modalOtherOpen, setModalOtherOpen] = useState(false);
  const [modalOtherImgIdx, setModalOtherImgIdx] = useState<number | null>(null);
  const shuffledOtherImagesRef = React.useRef(shuffleArray(otherServicesImages));
  const shuffledOtherImages = shuffledOtherImagesRef.current;
  const handleOtherImageClick = (img: string) => {
    const idx = shuffledOtherImages.indexOf(img);
    setModalOtherImgIdx(idx);
    setModalOtherOpen(true);
  };
  const handleOtherPrev = () => {
    if (modalOtherImgIdx === null) return;
    setModalOtherImgIdx((prev) => (prev === 0 ? shuffledOtherImages.length - 1 : (prev as number) - 1));
  };
  const handleOtherNext = () => {
    if (modalOtherImgIdx === null) return;
    setModalOtherImgIdx((prev) => (prev === shuffledOtherImages.length - 1 ? 0 : (prev as number) + 1));
  };
  useEffect(() => {
    if (!modalOtherOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleOtherPrev();
      if (e.key === 'ArrowRight') handleOtherNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [modalOtherOpen, modalOtherImgIdx]);

  const pathname = usePathname();
  const isPortfolioPage = pathname === '/portfolio';

  return (
    <section className={cn(
      "py-20 bg-white",
      isPortfolioPage && "pt-32 md:pt-40"
    )}>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {modalImgIdx !== null && (
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Previous image"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="relative mx-auto w-full max-w-[95vw] md:max-w-4xl lg:max-w-5xl h-[60vh] rounded-2xl shadow-2xl overflow-hidden">
              <ProgressiveImage
                src={shuffledImages[modalImgIdx]}
                alt={`Expanded hardscaping example ${modalImgIdx + 1}`}
                fill
                className="object-contain bg-gray-200 rounded-2xl"
                unoptimized={true}
              />
            </div>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Next image"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
      </Modal>
      <Modal isOpen={modalIrrigationOpen} onClose={() => setModalIrrigationOpen(false)}>
        {modalIrrigationImgIdx !== null && (
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <button
              onClick={handleIrrigationPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Previous image"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="relative mx-auto w-full max-w-[95vw] md:max-w-4xl lg:max-w-5xl h-[60vh] rounded-2xl shadow-2xl overflow-hidden">
              <ProgressiveImage
                src={shuffledIrrigationImages[modalIrrigationImgIdx]}
                alt={`Expanded irrigation example ${modalIrrigationImgIdx + 1}`}
                fill
                className="object-contain bg-gray-200 rounded-2xl"
                unoptimized={true}
              />
            </div>
            <button
              onClick={handleIrrigationNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Next image"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
      </Modal>
      <Modal isOpen={modalOtherOpen} onClose={() => setModalOtherOpen(false)}>
        {modalOtherImgIdx !== null && (
          <div className="relative flex items-center justify-center min-h-[60vh]">
            <button
              onClick={handleOtherPrev}
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Previous image"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="relative mx-auto w-full max-w-[95vw] md:max-w-4xl lg:max-w-5xl h-[60vh] rounded-2xl shadow-2xl overflow-hidden">
              <ProgressiveImage
                src={shuffledOtherImages[modalOtherImgIdx]}
                alt={`Expanded other services example ${modalOtherImgIdx + 1}`}
                fill
                className="object-contain bg-gray-200 rounded-2xl"
                unoptimized={true}
              />
            </div>
            <button
              onClick={handleOtherNext}
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg"
              aria-label="Next image"
            >
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        )}
      </Modal>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Expert Landscaping & Hardscaping Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seattle's trusted experts for hardscaping, irrigation, and landscaping. We design, build, and maintain beautiful, functional outdoor spaces tailored to the Pacific Northwest climate.
          </p>
          <button
            className="mt-4 text-blue-700 font-medium underline hover:text-blue-900 transition-colors"
            onClick={() => setShowMore((v) => !v)}
            aria-expanded={showMore}
            aria-controls="expert-readmore"
          >
            {showMore ? 'Read Less' : 'Read More'}
          </button>
          <AnimatePresence>
            {showMore && (
              <motion.div
                id="expert-readmore"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 text-base text-gray-700 max-w-2xl mx-auto bg-blue-50 rounded-lg p-4">
                  Our experienced team delivers premium hardscaping, irrigation, and landscaping services. From slope stabilization and water-efficient irrigation to custom patios and garden design, we solve complex outdoor challenges for Seattle homeowners.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 rounded-t-xl overflow-hidden">
                {service.id === 'hardscaping' ? (
                  <>
                    <HardscapingGallery images={shuffledImages} onImageClick={handleImageClick} />
                    {/* Overlay with responsive positioning and text size - add semi-transparent background for readability */}
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-5 z-10 pointer-events-none">
                      <div className="flex items-center bg-black/40 rounded px-3 py-1">
                        <service.icon className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg mr-2" />
                        <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">{service.title}</h2>
                      </div>
                    </div>
                  </>
                ) : service.id === 'irrigation' ? (
                  <>
                    <IrrigationGallery images={shuffledIrrigationImages} onImageClick={handleIrrigationImageClick} />
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-5 z-10 pointer-events-none">
                      <div className="flex items-center bg-black/40 rounded px-3 py-1">
                        <service.icon className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg mr-2" />
                        <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">{service.title}</h2>
                      </div>
                    </div>
                  </>
                ) : service.id === 'other' ? (
                  <>
                    <OtherServicesGallery images={shuffledOtherImages} onImageClick={handleOtherImageClick} />
                    <div className="absolute bottom-3 md:bottom-4 left-3 md:left-5 z-10 pointer-events-none">
                      <div className="flex items-center bg-black/40 rounded px-3 py-1">
                        <service.icon className="h-5 w-5 md:h-6 md:w-6 text-white drop-shadow-lg mr-2" />
                        <h2 className="text-lg md:text-xl font-bold text-white drop-shadow-lg">{service.title}</h2>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </>
                )}
              </div>

              <div className="p-6">
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">Key Features:</h3>
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600 group">
                        <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition-colors">
                          <feature.icon className="h-4 w-4" />
                        </div>
                        <span>{feature.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <button
                    onClick={() => toggleDetails(service.id)}
                    className="w-full inline-flex items-center justify-between gap-2 text-blue-600 hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 rounded-lg px-4 py-2.5 transition-colors"
                  >
                    <span>Learn More</span>
                    {expandedId === service.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedId === service.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {service.id === 'hardscaping' && (
                            <div className="mb-6">
                              <HardscapingGallery images={shuffledImages} onImageClick={handleImageClick} />
                            </div>
                          )}
                          {service.id === 'irrigation' && (
                            <div className="mb-6">
                              <IrrigationGallery images={shuffledIrrigationImages} onImageClick={handleIrrigationImageClick} />
                            </div>
                          )}
                          {service.id === 'other' && (
                            <div className="mb-6">
                              <OtherServicesGallery images={shuffledOtherImages} onImageClick={handleOtherImageClick} />
                            </div>
                          )}
                          <div className="grid grid-cols-1 gap-4">
                            {Object.entries(service.details).map(([category, items]) => (
                              <div key={category} className="bg-gray-50 rounded-lg p-4">
                                <h4 className="font-medium text-gray-900 mb-2 capitalize">
                                  {category}
                                </h4>
                                <ul className="space-y-1">
                                  {items.map((item, idx) => (
                                    <li key={idx} className="text-gray-600 flex items-center gap-2">
                                      <ChevronRight className="h-4 w-4 text-blue-500 shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          <button
                            onClick={() => setShowSubServices(showSubServices === service.id ? null : service.id)}
                            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                          >
                            View Full Service Details
                            <ChevronDown className={`h-4 w-4 transition-transform ${showSubServices === service.id ? 'rotate-180' : ''}`} />
                          </button>
                          <AnimatePresence>
                            {showSubServices === service.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="mt-4 bg-blue-50 rounded-lg p-4">
                                  <h4 className="font-medium text-blue-900 mb-2">Services in {service.title}</h4>
                                  <ul className="space-y-1">
                                    {service.subServices.map((sub, idx) => (
                                      <li key={idx} className="text-blue-800 flex items-center gap-2">
                                        <ChevronRight className="h-4 w-4 text-blue-500 shrink-0" />
                                        {sub}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <QuoteButton className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Get a Free Quote
            <ChevronRight className="h-5 w-5" />
          </QuoteButton>
        </div>
      </div>
    </section>
  );
}; 