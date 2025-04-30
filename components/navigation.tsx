"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, Grid, Hammer, Droplets, Waves, Home, Blocks as Brick, Blocks, WrenchIcon, Settings, MapPin, Info, Image as ImageIcon, Phone, MessageSquareQuote, CheckCircle, ArrowRight, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNav } from './mobile-nav';
import { QuoteButton } from './quote-button';
import { useModal } from './modal-context';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openModal } = useModal();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle body scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden'; // Also lock html element
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = ''; // Restore html element
    }
    
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const closeMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Portfolio', href: '/portfolio', icon: ImageIcon },
    { name: 'Contact', href: '/contact', icon: Phone },
    {
      name: 'Services',
      href: '/services',
      dropdown: true,
      icon: Grid,
      items: [
        {
          name: 'Hardscaping',
          icon: Hammer,
          items: [
            { name: 'Water Features', href: '/services/hardscaping/water-features', icon: Waves },
            { name: 'Patio Installation', href: '/services/hardscaping/patio-installation', icon: Home },
            { name: 'Retaining Walls', href: '/services/hardscaping/retaining-walls', icon: Brick },
            { name: 'Driveway Paving', href: '/services/hardscaping/driveway-paving', icon: Blocks },
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
      ],
      mainItem: {
        name: 'All Services',
        href: '/services',
        icon: Grid,
        description: 'View our complete range of services'
      }
    },
    {
      name: 'Locations',
      href: '#',
      dropdown: true,
      icon: MapPin,
      items: [
        {
          name: 'Seattle & Neighborhoods',
          icon: MapPin,
          items: [
            { name: 'Seattle (All Areas)', href: '/localities/seattle', description: 'Including all Seattle neighborhoods' },
            { name: 'Belltown', href: '/localities/belltown', description: 'Seattle neighborhood' },
            { name: 'Capitol Hill', href: '/localities/capitol-hill', description: 'Seattle neighborhood' },
            { name: 'Magnolia', href: '/localities/magnolia', description: 'Seattle neighborhood' },
            { name: 'West Seattle', href: '/localities/west-seattle', description: 'Seattle neighborhood' }
          ],
        },
        {
          name: 'Eastside',
          icon: MapPin,
          items: [
            { name: 'Bellevue', href: '/localities/bellevue', description: 'Including Factoria' },
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

  // Animation variants
  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const dropdownItemVariants = {
    hidden: { opacity: 0, y: -5, height: 0 },
    visible: { 
      opacity: 1, 
      y: 0, 
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-[60] transition-all duration-300',
        scrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' 
          : 'bg-white/90 backdrop-blur-sm py-3'
      )}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center relative z-[999]" onClick={closeMenu}>
            <div className="relative w-44 h-12 md:w-56 md:h-16">
              <Image
                src="/images/logo.png"
                alt="Blue Landscaping Logo"
                fill
                priority
                sizes="(max-width: 768px) 11rem, 14rem"
                className="object-contain drop-shadow-sm brightness-90 hover:brightness-110 hover:scale-105 transition-all duration-300"
              />
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className={cn(
              "md:hidden flex items-center justify-center",
              "rounded-full z-[10000] relative transition-all duration-300",
              isOpen 
                ? "bg-white text-teal-700 shadow-lg p-3" 
                : "bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md hover:shadow-lg p-3"
            )}
            onClick={handleMenuToggle}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 ml-auto">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                {item.dropdown ? (
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 font-medium transition-colors rounded-md",
                      "text-blue-800 hover:text-blue-600 hover:bg-blue-50",
                      activeDropdown === item.name && "bg-blue-50 text-blue-700"
                    )}
                    onClick={() => toggleDropdown(item.name)}
                    aria-expanded={activeDropdown === item.name}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      activeDropdown === item.name && "rotate-180"
                    )} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 font-medium transition-colors rounded-md",
                      "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                    )}
                  >
                    <span>{item.name}</span>
                  </Link>
                )}

                {/* Desktop Dropdown */}
                {item.dropdown && (
                  <div className="absolute left-0 mt-2 w-[800px] bg-white rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[65]">
                    {item.mainItem && (
                      <Link
                        href={item.mainItem.href}
                        className="block p-4 hover:bg-gray-50 border-b border-gray-100"
                      >
                        <div className="flex items-center gap-3">
                          <item.mainItem.icon className="h-5 w-5 text-teal-600" />
                          <div>
                            <div className="font-medium text-gray-900">{item.mainItem.name}</div>
                            <div className="text-sm text-gray-500">{item.mainItem.description}</div>
                          </div>
                        </div>
                      </Link>
                    )}
                    <div className="grid grid-cols-4 gap-6 p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                      {item.items?.map((section, idx) => (
                        <div key={idx} className="space-y-4">
                          {section.name && (
                            <h5 className="font-semibold text-blue-800 text-sm uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-gray-100">
                              {section.icon && <section.icon className="h-4 w-4" />}
                              <span>{section.name}</span>
                            </h5>
                          )}
                          <ul className="space-y-1">
                            {(section.items || [section]).map((subItem, subIdx) => (
                              <li key={subIdx}>
                                <Link
                                  href={subItem.href || "#"}
                                  className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-all duration-200 hover:translate-x-1 text-sm group relative"
                                  onClick={closeMenu}
                                >
                                  <div className="flex items-center gap-2">
                                    {subItem.icon && <subItem.icon className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />}
                                    <span>{subItem.name}</span>
                                  </div>
                                  {subItem.description && (
                                    <span className="text-xs text-gray-400 ml-6">{subItem.description}</span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <QuoteButton 
              className="btn-primary text-white rounded-md px-5 py-2.5 font-semibold shadow-md hover:shadow-lg
                transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 active:translate-y-0
                bg-blue-500 hover:bg-blue-600"
              onClick={openModal}
            />
          </nav>
        </div>
      </div>

      {/* Portal-based Mobile Navigation */}
      <MobileNav isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
};