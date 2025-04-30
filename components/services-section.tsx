"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Shield, Leaf, Droplets, Sun, Ruler, Award } from 'lucide-react';

const services = [
  {
    title: "Custom Hardscaping",
    description: "Expert retaining walls, patios, and walkways built to last",
    icon: Shield,
    image: "/images/hardscaping.jpg"
  },
  {
    title: "Landscape Design",
    description: "Beautiful, sustainable designs that enhance your outdoor living",
    icon: Leaf,
    image: "/images/landscape-design.jpg"
  },
  {
    title: "Irrigation Systems",
    description: "Water-efficient systems custom designed for your property",
    icon: Droplets,
    image: "/images/irrigation.jpg"
  },
  {
    title: "Lawn Care & Maintenance",
    description: "Professional lawn care services to keep your yard looking pristine",
    icon: Sun,
    image: "/images/lawn-care.jpg"
  },
  {
    title: "Outdoor Living Spaces",
    description: "Create your dream outdoor entertainment and relaxation areas",
    icon: Ruler,
    image: "/images/outdoor-living.jpg"
  },
  {
    title: "Sustainable Landscaping",
    description: "Eco-friendly solutions that conserve water and support local ecology",
    icon: Award,
    image: "/images/sustainable.jpg"
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Premium Services</h2>
          <p className="text-xl text-gray-600">
            Comprehensive landscaping solutions tailored to your property's unique needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 z-10" />
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <service.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            View All Services
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </a>
        </div>
      </div>
    </section>
  );
}; 