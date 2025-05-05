import React from 'react';
import { HeroHome } from '@/components/hero-home';
import { CompanyExpertiseShowcase } from '@/components/company-expertise-showcase';
import { FAQSection } from '@/components/faq-section';
import { ProfessionalServices } from '@/components/professional-services';
import { Phone, ArrowRight } from 'lucide-react';
import { QuoteButton } from '@/components/quote-button';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';
import { LandscapingPortfolioSection } from '@/components/landscaping-portfolio-section';

export default function Home() {
  return (
    <>
      <HeroHome />
      
      {/* Company Expertise Showcase Section */}
      <CompanyExpertiseShowcase />

      {/* Professional Services Section */}
      <ProfessionalServices />

      {/* Landscaping Portfolio Section */}
      <LandscapingPortfolioSection />

      {/* Testimonials Section */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FAQSection />
    </>
  );
}