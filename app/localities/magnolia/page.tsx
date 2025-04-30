"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { MapPin } from "lucide-react";
import ContactFormSection from "@/components/contact-form-section";
import ServicesGrid from "@/components/services-grid";

export default function MagnoliaPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="h-5 w-5 text-green-600" />
            <span className="text-green-600 font-medium">Magnolia, Seattle</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Premier Landscaping Services in Magnolia
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Transform your Magnolia property with our expert landscaping services. We bring over two decades of experience in creating and maintaining beautiful outdoor spaces in this cherished Seattle neighborhood.
          </p>
        </div>
      </section>

      {/* Area Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Why Choose Us for Your Magnolia Property
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                Deep understanding of Magnolia's unique landscape and climate conditions, ensuring optimal results for your property.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
              <p className="text-gray-600">
                Tailored landscaping approaches that complement Magnolia's distinctive architectural styles and natural beauty.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Sustainable Practices</h3>
              <p className="text-gray-600">
                Eco-friendly landscaping methods that preserve and enhance Magnolia's natural environment.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesGrid />

      {/* Contact Form */}
      <ContactFormSection />
    </main>
  );
}