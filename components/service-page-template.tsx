"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { QuoteButton } from '@/components/quote-button';
import { CompanyExpertiseShowcase } from '@/components/company-expertise-showcase';
import { FAQSection } from '@/components/faq-section';
import { TestimonialsCarousel } from '@/components/testimonials-carousel';

interface ServicePageTemplateProps {
  title: string;
  description: string;
  heroImage: string;
  benefits: string[];
  features: (string | {
    title: string;
    description: string;
  })[];
}

export const ServicePageTemplate = ({
  title,
  description,
  heroImage,
  benefits,
  features,
}: ServicePageTemplateProps) => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={title}
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">{description}</p>
            <div className="flex flex-wrap gap-4">
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
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our {title} Services?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-xl shadow-sm"
              >
                <h3 className="text-xl font-semibold mb-3">{benefit}</h3>
                <p className="text-gray-600">
                  We ensure the highest quality {title.toLowerCase()} services that meet your specific needs.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our {title} Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const featureTitle = typeof feature === 'string' ? feature : feature.title;
              const featureDescription = typeof feature === 'string' 
                ? `Professional ${feature.toLowerCase()} services tailored to your needs.`
                : feature.description;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 backdrop-blur-sm p-6 rounded-xl"
                >
                  <h3 className="text-xl font-semibold mb-3">{featureTitle}</h3>
                  <p className="text-gray-400">{featureDescription}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Expertise */}
      <CompanyExpertiseShowcase />

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your {title} Project?
            </h2>
            <p className="text-xl mb-8">
              Get in touch for a free consultation and quote
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
              Serving the Greater Seattle Area | Licensed & Insured
            </p>
          </div>
        </div>
      </section>
    </>
  );
}; 