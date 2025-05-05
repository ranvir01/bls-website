'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import { QuoteButton } from '@/components/quote-button';

interface ServiceAreaTemplateProps {
  city: string;
  region: string;
  backgroundImage: string;
  description: string;
  features: string[];
  testimonial?: {
    name: string;
    text: string;
    location: string;
  };
}

export const ServiceAreaTemplate = ({
  city,
  region,
  backgroundImage,
  description,
  features,
  testimonial
}: ServiceAreaTemplateProps) => {
  return (
    <>
      {/* Hero Section with Dynamic Background */}
      <section className="relative min-h-[60vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={`${city} landscaping`}
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
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Landscaping in {city}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              {description}
            </p>
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

      {/* Services Section */}
      <section className="py-20 bg-gray-900">
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
                <h3 className="text-xl font-semibold text-white mb-3">{feature}</h3>
                <p className="text-gray-400">
                  Professional {feature.toLowerCase()} services tailored to your {city} property.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {testimonial && (
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl max-w-3xl mx-auto"
            >
              <p className="text-xl text-gray-300 italic mb-4">"{testimonial.text}"</p>
              <div className="text-white">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.location}</p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Ready to Transform Your {city} Property?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <QuoteButton className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg flex items-center gap-2 text-lg font-semibold transition-all">
              Get Started <ArrowRight className="w-5 h-5" />
            </QuoteButton>
            <a
              href="tel:2532170814"
              className="border border-white hover:bg-white/10 text-white px-8 py-4 rounded-lg flex items-center gap-2 text-lg font-semibold transition-all"
            >
              <Phone className="w-5 h-5" /> Call Us Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
}; 