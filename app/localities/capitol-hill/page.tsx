"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ContactFormSection } from "@/components/contact-form-section";
import { ServicesGrid } from "@/components/services-grid";
import { TestimonialSlider } from "@/components/TestimonialSlider";

export default function CapitolHillPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premier Landscaping Services in Capitol Hill, Seattle
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your Capitol Hill property with our expert landscaping and hardscaping services. 
              We bring creative designs and sustainable solutions to Seattle's most vibrant neighborhood.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services in Capitol Hill
          </h2>
          <ServicesGrid />
        </div>
      </section>

      {/* Area Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose Us for Your Capitol Hill Property?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
                <p className="text-gray-600">
                  With years of experience in Capitol Hill, we understand the unique character of the neighborhood 
                  and how to enhance your property while preserving its historic charm.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Sustainable Practices</h3>
                <p className="text-gray-600">
                  We use eco-friendly methods and materials that align with Capitol Hill's commitment to 
                  environmental sustainability and urban green spaces.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Capitol Hill Residents Say
          </h2>
          <TestimonialSlider />
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection />
    </main>
  );
}