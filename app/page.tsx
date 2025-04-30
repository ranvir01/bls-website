import React from 'react';
import { HeroHome } from '@/components/hero-home';
import { CompanyExpertiseShowcase } from '@/components/company-expertise-showcase';
import AnimatedTestimonials from '@/components/AnimatedTestimonials';
import { FAQSection } from '@/components/faq-section';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Phone, Calendar, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <HeroHome />
      
      {/* Company Expertise Showcase Section */}
      <CompanyExpertiseShowcase />

      {/* Testimonials Section */}
      <AnimatedTestimonials />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Us Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Transform Your Outdoor Space</h2>
            <p className="text-xl mb-8">
              Schedule your free consultation with our expert landscaping team
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Free Consultation <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="tel:2532170814" 
                className="inline-flex items-center gap-2 border border-white text-white hover:bg-white/10 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                <Phone className="w-5 h-5" /> (253) 217-0814
              </a>
            </div>
            <p className="mt-6 text-gray-400">
              Serving Greater Seattle Area | Licensed & Insured
            </p>
          </div>
        </div>
      </section>
    </>
  );
}