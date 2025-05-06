import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function IrrigationPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-96 w-full">
        <Image src="/images/irrigation-main.jpg" alt="Irrigation Services" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Irrigation Services</h1>
        </div>
      </section>
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-4">Complete Irrigation Solutions</h2>
        <p className="mb-6 text-lg text-gray-700">Keep your landscape healthy and green with our professional irrigation services. We offer installation, repair, and maintenance for all types of irrigation systems, ensuring efficient water use and lush results.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Sprinkler Installation</h3>
            <p className="mb-4 text-gray-700">Custom-designed sprinkler systems for optimal coverage and water efficiency.</p>
            <Link href="/services/irrigation/sprinkler-installation" className="text-blue-700 font-medium hover:underline">Learn More</Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Sprinkler Repair</h3>
            <p className="mb-4 text-gray-700">Fast, reliable repairs for leaks, broken heads, and system issues.</p>
            <Link href="/services/irrigation/sprinkler-repair" className="text-blue-700 font-medium hover:underline">Learn More</Link>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Irrigation Maintenance</h3>
            <p className="mb-4 text-gray-700">Seasonal check-ups and adjustments to keep your system running smoothly.</p>
            <Link href="/services/irrigation/irrigation-maintenance" className="text-blue-700 font-medium hover:underline">Learn More</Link>
          </div>
        </div>
        <div className="mt-10 text-center">
          <Link href="/contact" className="inline-block bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">Request a Free Quote</Link>
        </div>
      </section>
    </div>
  );
} 
