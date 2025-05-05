import React from 'react';
import Image from 'next/image';

export default function FireFeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 w-full">
        <Image src="/images/hardscaping-fire-features.jpg" alt="Outdoor Fire Features" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Outdoor Fire Features</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Custom Outdoor Fire Features</h2>
        <p className="mb-6 text-lg text-gray-700">Create a warm and inviting atmosphere with custom-built fire pits and fireplaces. Our team designs and installs fire features that become the centerpiece of your outdoor living space.</p>
        <ul className="list-disc pl-6 mb-8 text-gray-700">
          <li>Stone and brick fire pits</li>
          <li>Outdoor fireplaces</li>
          <li>Gas and wood-burning options</li>
          <li>Integrated seating and lighting</li>
        </ul>
        <a href="/contact" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">Request a Free Quote</a>
      </section>
    </div>
  );
} 