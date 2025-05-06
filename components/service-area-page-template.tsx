"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { QuoteButton } from '@/components/quote-button';
import { CompanyExpertiseShowcase } from '@/components/company-expertise-showcase';
import { FAQSection } from '@/components/faq-section';
import { ProfessionalServices } from '@/components/professional-services';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';

interface ServiceAreaPageTemplateProps {
  city: string;
  region: string;
  heroImage: string;
  description: string;
  features: string[];
  testimonial?: {
    name: string;
    text: string;
    location: string;
  };
}

export const ServiceAreaPageTemplate = ({
  city,
  region,
  heroImage,
  description,
  features,
  testimonial
}: ServiceAreaPageTemplateProps) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={`${city} landscaping services`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-blue-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                License: BLUELLS880K2
              </span>
              <span className="bg-green-600/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                Accepting: Zelle, Venmo, PayPal, Cash, Visa, Mastercard
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Landscaping in {city}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              {description}
            </p>
            <div className="flex flex-wrap gap-4 mb-12">
              <QuoteButton className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 text-lg font-semibold transition-all">
                Free Quote <ArrowRight className="w-5 h-5" />
              </QuoteButton>
              <a
                href="tel:2532170814"
                className="border border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg flex items-center gap-2 text-lg font-semibold transition-all"
              >
                <Phone className="w-5 h-5" /> (253) 217-0814
              </a>
            </div>
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm text-white/80">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-center justify-center">
                  <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Expertise Section */}
      <CompanyExpertiseShowcase />

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
            Our Services in {city}, {region}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                    {getFeatureIcon(feature)}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{feature}</h3>
                </div>
                <p className="text-gray-400">
                  Professional {feature.toLowerCase()} services tailored to your {city} property.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services Section */}
      <ProfessionalServices />

      {/* Testimonials Section */}
      <TestimonialsCarousel city={city} testimonial={testimonial} />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your {city} Property?
            </h2>
            <p className="text-xl mb-8">
              Schedule your free consultation with our expert landscaping team
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <QuoteButton className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300">
                Free Consultation <ArrowRight className="w-5 h-5" />
              </QuoteButton>
              <a
                href="tel:2532170814"
                className="border border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <Phone className="w-5 h-5" /> (253) 217-0814
              </a>
            </div>
            <p className="mt-6 text-gray-400">
              Serving {city} and the Greater Seattle Area | Licensed & Insured
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

const getFeatureIcon = (feature: string) => {
  switch (feature.toLowerCase()) {
    case 'landscape design':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
    case 'hardscaping & retaining walls':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>;
    case 'irrigation systems':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    case 'lawn maintenance':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>;
    case 'garden installation':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
    case 'outdoor lighting':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
    case 'bellevue drainage solutions':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>;
    case 'sustainable landscaping':
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
    default:
      return <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
  }
}; 