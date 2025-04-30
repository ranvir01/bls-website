'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What areas of Seattle do you service?",
    answer: "We serve the entire Greater Seattle area, including Ballard, Capitol Hill, Queen Anne, Bellevue, Mercer Island, and surrounding communities. Our team is familiar with the unique landscaping challenges and regulations of each neighborhood."
  },
  {
    question: "How do you handle Seattle's specific drainage challenges?",
    answer: "We specialize in Pacific Northwest drainage solutions, implementing systems that effectively manage our region's heavy rainfall. This includes French drains, permeable pavers, rain gardens, and strategic grading to prevent water accumulation and protect your property's foundation."
  },
  {
    question: "What's your process for retaining wall projects?",
    answer: "Our retaining wall process begins with a thorough site evaluation and soil assessment. We then create engineered designs that account for slope, drainage, and local building codes. All our walls are built with proper drainage systems and are structurally engineered for Seattle's wet climate."
  },
  {
    question: "Do you offer eco-friendly landscaping options?",
    answer: "Yes! We specialize in sustainable landscaping practices including native plant selection, water-efficient irrigation systems, rain water harvesting, and permeable hardscaping materials. Our designs focus on reducing water consumption while maintaining beautiful, thriving landscapes."
  },
  {
    question: "What maintenance services do you provide after installation?",
    answer: "We offer comprehensive maintenance packages that include seasonal care, irrigation system checks, hardscape inspections, and ongoing landscape maintenance. Our team provides detailed care instructions and can create a customized maintenance schedule for your property."
  },
  {
    question: "How do you price your landscaping projects?",
    answer: "Each project is uniquely priced based on scope, materials, and complexity. We provide detailed, itemized quotes after a thorough site evaluation. Our quotes include material costs, labor, permits if required, and a clear timeline. We're transparent about costs and don't have hidden fees."
  },
  {
    question: "What warranties do you offer on your work?",
    answer: "We stand behind our work with comprehensive warranties. Hardscaping installations come with a 5-year structural warranty, plants have a 1-year warranty (with proper maintenance), and irrigation systems are covered for 2 years. We also offer extended warranty options for additional peace of mind."
  },
  {
    question: "How do you handle project delays due to weather?",
    answer: "Being experienced in Seattle's climate, we plan projects around typical weather patterns and build weather contingencies into our timelines. We communicate proactively about any weather-related delays and have efficient strategies to protect ongoing work during inclement weather."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">
            Get answers to common questions about our landscaping services and process
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-6 py-4 flex items-center justify-between gap-4"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 