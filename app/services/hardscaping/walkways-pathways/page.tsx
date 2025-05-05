import React from 'react';
import Image from 'next/image';

export default function WalkwaysPathwaysPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 w-full">
        <Image src="/images/hardscaping-walkways.jpg" alt="Walkways & Pathways" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Walkways & Pathways</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Custom Walkways & Pathways</h2>
        <p className="mb-6 text-lg text-gray-700">Enhance your landscape with beautifully designed walkways and pathways. Our team crafts durable, attractive paths using pavers, stone, and concrete to complement your outdoor space.</p>
        <ul className="list-disc pl-6 mb-8 text-gray-700">
          <li>Stone and paver walkways</li>
          <li>Curved and straight pathway designs</li>
          <li>Accessible and safe surfaces</li>
          <li>Integration with patios and gardens</li>
        </ul>
        <a href="/contact" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">Request a Free Quote</a>
      </section>
    </div>
  );
} 