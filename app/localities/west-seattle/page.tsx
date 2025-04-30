"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import ContactFormSection from "@/components/contact-form-section";

export default function WestSeattlePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Premier Landscaping Services in West Seattle
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your outdoor space with our expert landscaping and hardscaping services in the West Seattle area
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Your Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Service Area Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Serving West Seattle Communities
              </h2>
              <p className="text-gray-600 mb-6">
                We provide comprehensive landscaping services throughout West Seattle, including:
              </p>
              <ul className="grid grid-cols-2 gap-4">
                {[
                  "Alki Beach",
                  "Admiral District",
                  "Junction",
                  "Fauntleroy",
                  "Delridge",
                  "Genesee",
                  "Morgan Junction",
                  "Seaview",
                ].map((area) => (
                  <li key={area} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600" />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="p-6">
              <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <p>(206) 555-0123</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <p>westseattle@example.com</p>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-green-600" />
                  <p>West Seattle, WA 98116</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactFormSection />
    </main>
  );
}