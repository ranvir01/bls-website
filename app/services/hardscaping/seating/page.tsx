import React from 'react';
import Image from 'next/image';

export default function SeatingPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 w-full">
        <Image src="/images/hardscaping-seating.jpg" alt="Built-in Seating" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Built-in Seating</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Custom Built-in Seating</h2>
        <p className="mb-6 text-lg text-gray-700">Enhance your outdoor living space with stylish and functional built-in seating. We design and construct seating walls and benches that blend perfectly with your landscape and hardscape features.</p>
        <ul className="list-disc pl-6 mb-8 text-gray-700">
          <li>Stone and block seating walls</li>
          <li>Integrated with patios and fire features</li>
          <li>Durable, weather-resistant materials</li>
          <li>Custom designs for any space</li>
        </ul>
        <a href="/contact" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">Request a Free Quote</a>
      </section>
    </div>
  );
} 