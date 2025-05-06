"use client";

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Grid, Hammer, Droplets, Waves, Home, Blocks as Brick, 
  Blocks, WrenchIcon, Settings, MapPin, Info, Image as ImageIcon, Phone, 
  MessageSquareQuote, CheckCircle, ArrowRight, Mail, Flame, ArrowUpDown, Sofa, Fence, Scissors, Sprout, Leaf } from 'lucide-react';
import { QuoteButton } from './quote-button';
import { useModal } from './modal-context';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { openModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleQuoteClick = () => {
    onClose(); // Close the mobile menu
    openModal(); // Open the quote modal
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Portfolio', href: '/portfolio', icon: ImageIcon },
    { name: 'Contact', href: '/contact', icon: Phone },
    {
      name: 'Services',
      icon: Grid,
      sections: [
        {
          name: 'Hardscaping',
          icon: Hammer,
          items: [
            { name: 'Patios', href: '/services/hardscaping/patios', icon: Home },
            { name: 'Walkways & Pathways', href: '/services/hardscaping/walkways', icon: Blocks },
            { name: 'Retaining Walls', href: '/services/hardscaping/retaining-walls', icon: Brick },
            { name: 'Driveways', href: '/services/hardscaping/driveways', icon: Blocks },
            { name: 'Outdoor Fire Features', href: '/services/hardscaping/fire-features', icon: Flame },
            { name: 'Steps & Stairs', href: '/services/hardscaping/steps', icon: ArrowUpDown },
            { name: 'Built-in Seating', href: '/services/hardscaping/seating', icon: Sofa },
            { name: 'Water Features', href: '/services/hardscaping/water-features', icon: Waves },
          ],
        },
        {
          name: 'Irrigation',
          icon: Droplets,
          items: [
            { name: 'Irrigation Maintenance', href: '/services/irrigation/irrigation-maintenance', icon: Settings },
            { name: 'Sprinkler Installation', href: '/services/irrigation/sprinkler-installation', icon: Droplets },
            { name: 'Sprinkler Repair', href: '/services/irrigation/sprinkler-repair', icon: WrenchIcon },
          ],
        },
        {
          name: 'Other Services',
          icon: Grid,
          items: [
            { name: 'Fencing', href: '/services/other/fencing', icon: Fence },
            { name: 'Lawn Maintenance', href: '/services/other/lawn-maintenance', icon: Scissors },
            { name: 'Planting & Design', href: '/services/other/planting-design', icon: Sprout },
            { name: 'Sod Installation', href: '/services/other/sod-installation', icon: Leaf },
          ],
        },
      ],
    },
    {
      name: 'Locations',
      icon: MapPin,
      sections: [
        {
          name: 'Seattle & Neighborhoods',
          icon: MapPin,
          items: [
            { name: 'Seattle (All Areas)', href: '/localities/seattle' },
            { name: 'Belltown', href: '/localities/belltown' },
            { name: 'Capitol Hill', href: '/localities/capitol-hill' },
            { name: 'Magnolia', href: '/localities/magnolia' },
            { name: 'West Seattle', href: '/localities/west-seattle' }
          ],
        },
        {
          name: 'Eastside',
          icon: MapPin,
          items: [
            { name: 'Bellevue', href: '/localities/bellevue' },
            { name: 'Kirkland', href: '/localities/kirkland' },
            { name: 'Redmond', href: '/localities/redmond' },
            { name: 'Mercer Island', href: '/localities/mercer-island' },
            { name: 'Issaquah', href: '/localities/issaquah' }
          ],
        },
        {
          name: 'North Seattle Suburbs',
          icon: MapPin,
          items: [
            { name: 'Shoreline', href: '/localities/shoreline' },
            { name: 'Lake Forest Park', href: '/localities/lake-forest-park' },
            { name: 'Edmonds', href: '/localities/edmonds' },
            { name: 'Mountlake Terrace', href: '/localities/mountlake-terrace' }
          ],
        },
        {
          name: 'South King County',
          icon: MapPin,
          items: [
            { name: 'Burien', href: '/localities/burien' },
            { name: 'Tukwila', href: '/localities/tukwila' },
            { name: 'Renton', href: '/localities/renton' },
            { name: 'Kent', href: '/localities/kent' },
            { name: 'Auburn', href: '/localities/auburn' },
            { name: 'Federal Way', href: '/localities/federal-way' },
            { name: 'Des Moines', href: '/localities/des-moines' },
            { name: 'Covington', href: '/localities/covington' },
            { name: 'Maple Valley', href: '/localities/maple-valley' },
            { name: 'SeaTac', href: '/localities/seatac' }
          ],
        },
      ],
    },
  ];

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="relative ml-auto w-full max-w-sm bg-gradient-to-br from-teal-600 via-teal-700 to-teal-900 h-full overflow-y-auto custom-scrollbar"
          >
            {/* Header */}
            <div className="sticky top-0 flex justify-between items-center p-6 border-b border-white/10 bg-gradient-to-br from-teal-600/95 via-teal-700/95 to-teal-900/95 backdrop-blur-lg">
              <Link href="/" onClick={onClose}>
                <div className="relative w-40 h-12">
                  <Image
                    src="/images/logo.png"
                    alt="Blue Landscaping Logo"
                    fill
                    className="object-contain brightness-200"
                  />
                </div>
              </Link>
              
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="space-y-6">
                {navItems.map((item) => (
                  <div key={item.name}>
                    {item.sections ? (
                      <>
                        <button
                          onClick={() => setActiveSection(activeSection === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full text-teal-200 group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                              <item.icon className="h-5 w-5 text-teal-200" />
                            </div>
                            <span className="font-medium text-lg">{item.name}</span>
                          </div>
                          <ChevronDown className={cn(
                            "h-5 w-5 transition-transform duration-300",
                            activeSection === item.name && "rotate-180"
                          )} />
                        </button>
                        
                        <AnimatePresence>
                          {activeSection === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden pl-12"
                            >
                              {item.sections.map((section) => (
                                <div key={section.name} className="mt-4">
                                  <h3 className="text-sm font-medium text-teal-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <section.icon className="h-4 w-4" />
                                    {section.name}
                                  </h3>
                                  <ul className="space-y-2">
                                    {section.items.map((subItem) => (
                                      <li key={subItem.name}>
                                        <Link
                                          href={subItem.href}
                                          onClick={onClose}
                                          className="flex items-center gap-2 text-teal-100 hover:text-teal-200 py-2 transition-colors"
                                        >
                                          {subItem.icon && <subItem.icon className="h-4 w-4" />}
                                          {subItem.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center gap-3 text-teal-200 hover:text-teal-300 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className="font-medium text-lg">{item.name}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-teal-200 text-sm font-medium uppercase tracking-wider mb-4">
                  Contact Us
                </h3>
                
                <div className="space-y-4">
                  <a
                    href="tel:2532170814"
                    className="flex items-center gap-3 text-teal-200 hover:text-teal-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Phone className="h-4 w-4" />
                    </div>
                    (253) 217-0814
                  </a>
                  
                  <a
                    href="mailto:blue_landscaping@yahoo.com"
                    className="flex items-center gap-3 text-teal-200 hover:text-teal-300 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Mail className="h-4 w-4" />
                    </div>
                    blue_landscaping@yahoo.com
                  </a>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-white font-medium mb-4">
                  Ready to transform your outdoor space?
                </h4>
                <QuoteButton
                  className="flex items-center justify-center gap-2 w-full bg-white text-teal-700 py-3.5 px-4 rounded-xl
                    shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base"
                  onClick={handleQuoteClick}
                >
                  <MessageSquareQuote className="h-5 w-5" />
                  Get Your Free Quote
                </QuoteButton>
              </div>
            </div>
          </motion.nav>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};