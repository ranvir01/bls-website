"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactFormSection from "@/components/contact-form-section";
import ServicesGrid from "@/components/services-grid";

export default function BelltownPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premier Landscaping Services in Belltown, Seattle
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your outdoor space with our expert landscaping services tailored for Belltown&apos;s unique urban environment
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                Get a Free Quote
              </Button>
              <Button size="lg" variant="outline">
                View Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <MapPin className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Service Area</h3>
                  <p className="text-gray-600">Belltown, Seattle, WA</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-gray-600">(206) 555-0123</p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 text-green-600" />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">belltown@example.com</p>
                </div>
              </div>
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