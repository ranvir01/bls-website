import React from 'react'
import { Metadata } from 'next'
import { ContactFormSection } from '@/components/contact-form-section'
import { CompanyExpertiseShowcase } from '@/components/company-expertise-showcase'

export const metadata: Metadata = {
  title: 'Professional Landscaping Services in Kirkland, WA',
  description: 'Transform your outdoor space with our expert landscaping services in Kirkland. From garden design to hardscaping, we bring your vision to life.',
}

export default function KirklandPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
          Landscaping Services in Kirkland, Washington
        </h1>
        
        <div className="prose prose-lg max-w-none mb-16">
          <p>
            Welcome to our Kirkland landscaping services. We provide comprehensive landscaping solutions 
            tailored to the unique environment and architectural styles of Kirkland neighborhoods. From 
            waterfront properties to hillside gardens, our expert team brings creativity and precision to 
            every project.
          </p>
        </div>

        <CompanyExpertiseShowcase />
        
        <section className="my-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us for Your Kirkland Property?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Local Expertise</h3>
              <p>
                With years of experience in Kirkland's climate and soil conditions, we know exactly what 
                works best for your property.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Custom Solutions</h3>
              <p>
                Every property in Kirkland is unique. We create customized landscaping solutions that 
                match your specific needs and preferences.
              </p>
            </div>
          </div>
        </section>

        <ContactFormSection />
      </div>
    </main>
  )
}