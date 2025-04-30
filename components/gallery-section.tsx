"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: "Modern Backyard Transformation",
    category: "Landscape Design",
    image: "/images/project1.jpg",
    description: "Complete backyard redesign with custom patio and water features"
  },
  {
    title: "Hillside Garden",
    category: "Retaining Walls",
    image: "/images/project2.jpg",
    description: "Engineered retaining walls with integrated garden beds"
  },
  {
    title: "Outdoor Entertainment Area",
    category: "Hardscaping",
    image: "/images/project3.jpg",
    description: "Custom paver patio with built-in firepit and seating"
  },
  {
    title: "Sustainable Garden Design",
    category: "Eco-Friendly",
    image: "/images/project4.jpg",
    description: "Native plant garden with efficient irrigation system"
  }
];

export const GallerySection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">Our Recent Projects</h2>
          <p className="text-xl text-gray-600">
            Explore our portfolio of beautiful landscaping transformations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="relative group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="aspect-w-16 aspect-h-9 relative rounded-xl overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20
                  }}
                  className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                >
                  <span className="text-sm font-medium text-blue-300 mb-2">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-200 mb-4">
                    {project.description}
                  </p>
                  <a
                    href={`/portfolio/${project.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2 text-blue-300 hover:text-blue-200 transition-colors duration-300"
                  >
                    View Project Details
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            View Full Portfolio
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