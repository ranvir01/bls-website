import React from 'react';
import { ContactForm } from '@/components/contact-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Blue Landscaping Services',
  description: 'Get in touch with our expert landscaping team for a free consultation. We serve the Greater Seattle area with premium landscaping and hardscaping services.',
};

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-transparent z-10" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover scale-110"
          >
            <source src="/videos/landscaping-hero.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Let's Create Your Dream Landscape
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              From initial concept to final installation, we're here to help bring your vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* Map Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Service Area</h2>
            <p className="text-xl text-gray-600">
              Proudly serving the Greater Seattle area with premium landscaping services
            </p>
          </div>

          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d172139.4161662446!2d-122.4821494!3d47.6129432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5490102c93e83355%3A0x102565466944d59a!2sSeattle%2C+WA!5e0!3m2!1sen!2sus!4v1565832331818!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold mb-4">Areas We Serve</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Seattle</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Bellevue</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Kirkland</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Redmond</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}