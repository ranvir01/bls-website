import React from 'react';
import Image from 'next/image';

export default function StepsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 w-full">
        <Image src="/images/hardscaping-steps.jpg" alt="Steps & Stairs" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Steps & Stairs</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Custom Steps & Stairs</h2>
        <p className="mb-6 text-lg text-gray-700">Add beauty and function to your landscape with expertly crafted steps and stairs. We design and build stone, concrete, and paver steps that blend seamlessly with your outdoor environment.</p>
        <ul className="list-disc pl-6 mb-8 text-gray-700">
          <li>Stone and concrete steps</li>
          <li>Integrated with retaining walls</li>
          <li>Safe, durable construction</li>
          <li>Custom designs for any elevation</li>
        </ul>
        <a href="/contact" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">Request a Free Quote</a>
      </section>
    </div>
  );
} 
