"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { ContactFormSection } from "@/components/contact-form-section";
import { ServicesGrid } from "@/components/services-grid";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { LocalityHero } from "@/components/locality-hero";
import { localityData } from "@/data/locality-data";
import { serviceCategories } from "@/data/service-categories";

interface LocalityPageTemplateProps {
  locality: string;
}

export const LocalityPageTemplate: React.FC<LocalityPageTemplateProps> = ({
  locality
}) => {
  const data = localityData[locality];

  if (!data) {
    throw new Error(`No data found for locality: ${locality}`);
  }

  return (
    <main className="min-h-screen bg-white">
      <LocalityHero
        title={data.title}
        description={data.description}
        backgroundImage={data.backgroundImage}
      />

      {/* Services Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services in {locality.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
          </h2>
          <ServicesGrid categories={serviceCategories} />
        </div>
      </section>

      {/* Area Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose Us for Your {locality.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Property?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
                <p className="text-gray-600">
                  With years of experience in {locality.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}, 
                  we understand the unique character of the area and how to enhance your property while preserving its charm.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Sustainable Practices</h3>
                <p className="text-gray-600">
                  We use eco-friendly methods and materials that align with the local environment, 
                  ensuring your landscape thrives while minimizing its ecological impact.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Contact Form */}
      <ContactFormSection />
    </main>
  );
}; 