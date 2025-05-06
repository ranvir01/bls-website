"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { 
  Phone, 
  Mail, 
  Clock, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  ChevronRight,
  Loader2
} from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

// Add SVGs for payment brand icons
const PaymentIcons = {
  Zelle: <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#6F2B8C"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial">Z</text></svg>,
  Venmo: <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#3D95CE"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial">V</text></svg>,
  PayPal: <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#003087"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial">P</text></svg>,
  Cash: <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#27AE60"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial">$</text></svg>,
  Visa: <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#1A1F71"/><text x="16" y="21" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold" fontFamily="Arial">V</text></svg>,
  Mastercard: <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="32" rx="6" fill="#F79E1B"/><circle cx="12" cy="16" r="6" fill="#EA001B"/><circle cx="20" cy="16" r="6" fill="#FFA200" fillOpacity="0.7"/></svg>,
};

export const Footer = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to submit form');
      
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-teal-800 text-white py-24">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="space-y-6 lg:col-span-3">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Blue Landscaping"
                width={180}
                height={60}
                unoptimized={true}
                className="object-contain brightness-150"
              />
            </Link>
            <p className="text-teal-100 text-sm leading-relaxed">
              Expert hardscaping and irrigation solutions in the Greater Seattle area. 
              Specializing in custom retaining walls, patios, and professional irrigation systems 
              designed for the Pacific Northwest climate since 2008.
            </p>
            <div className="space-y-2">
              <p className="text-teal-200 text-sm font-medium">
                License No. BLUELLS880K2
              </p>
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-teal-700 px-2 py-1 rounded text-teal-100 text-xs flex items-center gap-1">{PaymentIcons.Zelle} Zelle</span>
                <span className="bg-teal-700 px-2 py-1 rounded text-teal-100 text-xs flex items-center gap-1">{PaymentIcons.Venmo} Venmo</span>
                <span className="bg-teal-700 px-2 py-1 rounded text-teal-100 text-xs flex items-center gap-1">{PaymentIcons.PayPal} PayPal</span>
                <span className="bg-teal-700 px-2 py-1 rounded text-teal-100 text-xs flex items-center gap-1">{PaymentIcons.Cash} Cash</span>
                <span className="bg-teal-700 px-2 py-1 rounded text-teal-100 text-xs flex items-center gap-1">{PaymentIcons.Visa} Visa</span>
                <span className="bg-teal-700 px-2 py-1 rounded text-teal-100 text-xs flex items-center gap-1">{PaymentIcons.Mastercard} Mastercard</span>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <a href="https://www.instagram.com/blue_landscaping_services/?igsh=c3FrOWd4ZGxoZjll#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="bg-teal-700 p-2 rounded-full hover:bg-teal-600 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
                <Instagram size={20} className="text-teal-200" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 lg:col-span-3">
            <h2 className="text-lg font-semibold border-b border-teal-700 pb-2 tracking-wide">Contact Information</h2>
            
            <div className="space-y-4">
              <div className="flex items-start group">
                <Phone className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0 group-hover:text-teal-200 transition-colors" />
                <div>
                  <h3 className="text-sm font-medium text-teal-300">Phone</h3>
                  <a href="tel:2532170814" className="text-white hover:text-teal-200 transition-colors">
                    (253) 217-0814
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <Mail className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0 group-hover:text-teal-200 transition-colors" />
                <div>
                  <h3 className="text-sm font-medium text-teal-300">Email</h3>
                  <a href="mailto:blue_landscaping@yahoo.com" className="text-white hover:text-teal-200 transition-colors break-all">
                    blue_landscaping@yahoo.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start group">
                <Clock className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0 group-hover:text-teal-200 transition-colors" />
                <div>
                  <h3 className="text-sm font-medium text-teal-300">Hours</h3>
                  <p className="text-teal-100">Mon - Sat: 7am - 6pm</p>
                  <p className="text-teal-100">Sunday: Closed</p>
                </div>
              </div>
              
              <div className="flex items-start group">
                <MapPin className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0 group-hover:text-teal-200 transition-colors" />
                <div>
                  <h3 className="text-sm font-medium text-teal-300 mb-3">Service Areas</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-teal-200 text-sm font-medium mb-2">Seattle & Neighborhoods</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {[
                          'Seattle',
                          'Belltown',
                          'Capitol Hill',
                          'Magnolia',
                          'West Seattle'
                        ].map((location) => (
                          <Link
                            key={location}
                            href={`/service-areas/${location.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-teal-100 hover:text-white transition-colors text-sm flex items-center gap-1"
                          >
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span>{location}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-teal-200 text-sm font-medium mb-2">Eastside</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {[
                          'Bellevue',
                          'Kirkland',
                          'Redmond',
                          'Mercer Island',
                          'Issaquah'
                        ].map((location) => (
                          <Link
                            key={location}
                            href={`/localities/${location.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-teal-100 hover:text-white transition-colors text-sm flex items-center gap-1"
                          >
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span>{location}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-teal-200 text-sm font-medium mb-2">North Seattle Suburbs</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {[
                          'Shoreline',
                          'Lake Forest Park',
                          'Edmonds',
                          'Mountlake Terrace'
                        ].map((location) => (
                          <Link
                            key={location}
                            href={`/localities/${location.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-teal-100 hover:text-white transition-colors text-sm flex items-center gap-1"
                          >
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span>{location}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-teal-200 text-sm font-medium mb-2">South King County</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {[
                          'Burien',
                          'Tukwila',
                          'Renton',
                          'Kent',
                          'Auburn',
                          'Federal Way',
                          'Des Moines',
                          'Covington',
                          'Maple Valley',
                          'SeaTac'
                        ].map((location) => (
                          <Link
                            key={location}
                            href={`/localities/${location.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-teal-100 hover:text-white transition-colors text-sm flex items-center gap-1"
                          >
                            <MapPin className="h-3 w-3 shrink-0" />
                            <span>{location}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Services */}
          <div className="space-y-6 lg:col-span-3">
            <h2 className="text-lg font-semibold border-b border-teal-700 pb-2 tracking-wide">Professional Services</h2>
            
            <Link href="/services" className="inline-block text-white hover:text-teal-300 transition-colors font-medium">
              All Services
            </Link>
            
            <div>
              <h3 className="font-medium text-teal-300 mb-2">Hardscaping</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/hardscaping/patios" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Patios</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/walkways" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Walkways & Pathways</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/retaining-walls" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Retaining Walls</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/driveways" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Driveways</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/fire-features" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Outdoor Fire Features</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/steps" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Steps & Stairs</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/seating" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Built-in Seating</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/hardscaping/water-features" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Water Features</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-teal-300 mb-2">Irrigation</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/irrigation/sprinkler-installation" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Sprinkler Installation</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/irrigation/sprinkler-repair" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Sprinkler Repair</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/irrigation/irrigation-maintenance" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Irrigation Maintenance</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-teal-300 mb-2">Other Services</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/services/other/fencing" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Fencing</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/other/lawn-maintenance" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Lawn Maintenance</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/other/planting-design" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Planting & Design</span>
                  </Link>
                </li>
                <li>
                  <Link href="/services/other/sod-installation" className="flex items-center group text-teal-100 hover:text-white transition-colors hover:translate-x-1 duration-200">
                    <ChevronRight className="h-4 w-4 text-teal-400 mr-2 group-hover:text-teal-300" />
                    <span>Sod Installation</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Contact Form */}
          <div className="space-y-6 lg:col-span-3">
            <h2 className="text-lg font-semibold border-b border-teal-700 pb-2 tracking-wide">Get In Touch</h2>
            
            {submitSuccess && (
              <div className="bg-green-800 border border-green-700 text-white px-4 py-3 rounded mb-4">
                Thank you for your message! We'll be in touch soon.
              </div>
            )}
            
            {submitError && (
              <div className="bg-red-800 border border-red-700 text-white px-4 py-3 rounded mb-4">
                {submitError}
              </div>
            )}
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-teal-300 mb-1">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-2 bg-teal-700 border border-teal-600 rounded-md placeholder-teal-400 text-white focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="Your name"
                    {...register('name')}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-teal-300 mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-4 py-2 bg-teal-700 border border-teal-600 rounded-md placeholder-teal-400 text-white focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="your.email@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-teal-300 mb-1">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-4 py-2 bg-teal-700 border border-teal-600 rounded-md placeholder-teal-400 text-white focus:ring-teal-500 focus:border-teal-500 transition-colors"
                    placeholder="How can we help you?"
                    {...register('message')}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                  )}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-teal-600 text-white py-2 rounded-md font-medium hover:bg-teal-500 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg disabled:opacity-70 flex items-center justify-center"
                aria-label="Send message"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
              
              <p className="text-xs text-teal-400">
                We'll respond to your inquiry within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Copyright & Links */}
      <div className="mt-16 border-t border-teal-700 pt-6">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-teal-300 text-sm">
              &copy; {new Date().getFullYear()} Blue Landscaping Services. All rights reserved.
            </p>
            
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy-policy" className="text-teal-300 hover:text-white hover:underline transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="text-teal-300 hover:text-white hover:underline transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};