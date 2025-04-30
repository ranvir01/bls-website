"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Award, Shield, Clock, Wrench, Users } from 'lucide-react';

const features = [
  {
    title: "25+ Years Experience",
    description: "Over two decades of transforming Seattle properties with expert landscaping solutions",
    icon: Clock
  },
  {
    title: "Licensed & Insured",
    description: "Fully licensed, bonded, and insured for your complete peace of mind",
    icon: Shield
  },
  {
    title: "Expert Team",
    description: "Skilled professionals with extensive training in landscape design and construction",
    icon: Users
  },
  {
    title: "Quality Materials",
    description: "Premium materials sourced from trusted suppliers for lasting results",
    icon: Wrench
  },
  {
    title: "5-Star Service",
    description: "Consistently rated 5 stars by our satisfied customers across Seattle",
    icon: Award
  },
  {
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work with comprehensive service guarantees",
    icon: CheckCircle2
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-6">Why Choose Us</h2>
          <p className="text-xl text-gray-600">
            Delivering excellence in landscaping services across the Greater Seattle area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block bg-blue-50 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Outdoor Space?</h3>
            <p className="text-gray-600 mb-6">
              Get started with a free consultation and estimate for your project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Schedule Consultation
              </a>
              <a
                href="tel:2532170814"
                className="bg-white hover:bg-gray-50 text-blue-600 px-8 py-3 rounded-lg font-semibold transition-all duration-300 border border-blue-200"
              >
                Call (253) 217-0814
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}; 