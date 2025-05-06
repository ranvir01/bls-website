"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Grid, 
  MapPin, 
  Phone, 
  Menu, 
  X, 
  ChevronDown, 
  ChevronUp,
  Hammer,
  Droplets,
  Settings,
  WrenchIcon,
  Blocks,
  Flame,
  StepForward,
  Sofa,
  Waves,
  Info,
  Image as ImageIcon,
  Fence,
  Sprout,
  Scissors,
  Square,
  TreePine
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileNav } from './mobile-nav';
import { QuoteButton } from './quote-button';
import { useModal } from './modal-context';
import { LucideIcon } from 'lucide-react';

interface NavItemBase {
  name: string;
  icon: LucideIcon;
}

interface NavItemWithDropdown extends NavItemBase {
  href: string;
  dropdown: true;
  items: NavSection[];
  mainItem?: {
    name: string;
    href: string;
    icon: LucideIcon;
    description: string;
  };
}

interface NavItemWithoutDropdown extends NavItemBase {
  href: string;
  dropdown?: false;
  items?: never;
  mainItem?: never;
}

type NavItem = NavItemWithDropdown | NavItemWithoutDropdown;

interface NavSection {
  name: string;
  icon: LucideIcon;
  items: NavSectionItem[];
}

interface NavSectionItem {
  name: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
}

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

  const navItems: NavItem[] = [
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
            { name: 'Patios', href: '/services/hardscaping/patios', icon: Home },
            { name: 'Walkways & Pathways', href: '/services/hardscaping/walkways', icon: Blocks },
            { name: 'Retaining Walls', href: '/services/hardscaping/retaining-walls', icon: Square },
            { name: 'Driveways', href: '/services/hardscaping/driveways', icon: Blocks },
            { name: 'Outdoor Fire Features', href: '/services/hardscaping/fire-features', icon: Flame },
            { name: 'Steps & Stairs', href: '/services/hardscaping/steps', icon: StepForward },
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
            { name: 'Sod Installation', href: '/services/other/sod-installation', icon: TreePine },
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
            { name: 'Seattle (All Areas)', href: '/localities/seattle', icon: MapPin, description: 'Including all Seattle neighborhoods' },
            { name: 'Belltown', href: '/localities/belltown', icon: MapPin, description: 'Seattle neighborhood' },
            { name: 'Capitol Hill', href: '/localities/capitol-hill', icon: MapPin, description: 'Seattle neighborhood' },
            { name: 'Magnolia', href: '/localities/magnolia', icon: MapPin, description: 'Seattle neighborhood' },
            { name: 'West Seattle', href: '/localities/west-seattle', icon: MapPin, description: 'Seattle neighborhood' }
          ],
        },
        {
          name: 'Eastside',
          icon: MapPin,
          items: [
            { name: 'Bellevue', href: '/localities/bellevue', icon: MapPin, description: 'Including Factoria' },
            { name: 'Kirkland', href: '/localities/kirkland', icon: MapPin },
            { name: 'Redmond', href: '/localities/redmond', icon: MapPin },
            { name: 'Mercer Island', href: '/localities/mercer-island', icon: MapPin },
            { name: 'Issaquah', href: '/localities/issaquah', icon: MapPin }
          ],
        },
        {
          name: 'North Seattle Suburbs',
          icon: MapPin,
          items: [
            { name: 'Shoreline', href: '/localities/shoreline', icon: MapPin },
            { name: 'Lake Forest Park', href: '/localities/lake-forest-park', icon: MapPin },
            { name: 'Edmonds', href: '/localities/edmonds', icon: MapPin },
            { name: 'Mountlake Terrace', href: '/localities/mountlake-terrace', icon: MapPin }
          ],
        },
        {
          name: 'South King County',
          icon: MapPin,
          items: [
            { name: 'Burien', href: '/localities/burien', icon: MapPin },
            { name: 'Tukwila', href: '/localities/tukwila', icon: MapPin },
            { name: 'Renton', href: '/localities/renton', icon: MapPin },
            { name: 'Kent', href: '/localities/kent', icon: MapPin },
            { name: 'Auburn', href: '/localities/auburn', icon: MapPin },
            { name: 'Federal Way', href: '/localities/federal-way', icon: MapPin },
            { name: 'Des Moines', href: '/localities/des-moines', icon: MapPin },
            { name: 'Covington', href: '/localities/covington', icon: MapPin },
            { name: 'Maple Valley', href: '/localities/maple-valley', icon: MapPin },
            { name: 'SeaTac', href: '/localities/seatac', icon: MapPin }
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
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? 
        "bg-white shadow-md py-2" : 
        "bg-transparent py-3 md:py-5"
    )}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center">
            <div className="relative h-8 sm:h-10 w-36 sm:w-40">
              <Image
                src="/images/logo.png"
                alt="Blue Landscaping Logo"
                fill
                unoptimized={true}
                className={cn(
                  "object-contain transition-opacity duration-300", 
                  scrolled ? "opacity-100" : "opacity-100"
                )}
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.name} className="relative" ref={item.dropdown && activeDropdown === item.name ? menuRef : null}>
                {item.dropdown ? (
                  <button
                    className={cn(
                      "flex items-center gap-1.5 px-2 py-1 font-medium transition-colors rounded-md",
                      scrolled
                        ? "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white hover:text-white hover:bg-black/30 drop-shadow-md",
                      activeDropdown === item.name && (scrolled ? "bg-blue-50 text-blue-700" : "bg-black/30 text-white")
                    )}
                    onClick={() => toggleDropdown(item.name)}
                    aria-expanded={activeDropdown === item.name}
                    style={!scrolled ? {textShadow: '0 2px 4px rgba(0,0,0,0.8)'} : {}}
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
                      scrolled
                        ? "text-blue-800 hover:text-blue-600 hover:bg-blue-50"
                        : "text-white hover:text-white hover:bg-black/30 drop-shadow-md"
                    )}
                    style={!scrolled ? {textShadow: '0 2px 4px rgba(0,0,0,0.8)'} : {}}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
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
                    <div className="grid grid-cols-3 gap-4 p-4">
                      {item.items?.map((section) => (
                        <div key={section.name} className="space-y-2">
                          <div className="flex items-center gap-2 text-teal-600 font-medium">
                            <section.icon className="h-5 w-5" />
                            <h3 className="text-sm">{section.name}</h3>
                          </div>
                          <ul className="space-y-1">
                            {section.items?.map((service) => (
                              <li key={service.name}>
                                <Link
                                  href={service.href}
                                  className="flex items-center gap-2 text-gray-600 hover:text-teal-600 hover:bg-gray-50 p-2 rounded-md transition-colors group"
                                >
                                  {service.icon && (
                                    <div className="flex items-center justify-center w-5 h-5">
                                      <service.icon className="h-4 w-4 text-gray-400 group-hover:text-teal-600 transition-colors" />
                                    </div>
                                  )}
                                  <span className="text-sm">{service.name}</span>
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
          </nav>

          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-center">
            <button
              className="hidden sm:flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors mr-2"
              onClick={openModal}
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden md:inline">Get a Quote</span>
              <span className="inline md:hidden">Quote</span>
            </button>
            
            <button
              className={cn(
                "p-1.5 sm:p-2 rounded-lg transition-colors focus:outline-none",
                scrolled 
                  ? "text-blue-600 hover:bg-blue-50" 
                  : "text-white hover:bg-black/30 bg-black/20"
              )}
              onClick={handleMenuToggle}
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isOpen} onClose={closeMenu} />
    </header>
  );
};