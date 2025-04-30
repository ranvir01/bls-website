import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Landscaping Services in Des Moines, WA',
  description: 'Professional landscaping and hardscaping services for Des Moines, Washington residents. Transform your outdoor space with our expert team.',
}

export default function DesMoniesLocalityPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col items-center text-center gap-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-1 rounded-full">
            <MapPin size={16} />
            <span className="text-sm font-medium">Des Moines, Washington</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Professional Landscaping Services in Des Moines
          </h1>
          <p className="text-xl text-gray-600">
            Transform your outdoor space with our expert landscaping and hardscaping services tailored for Des Moines properties.
          </p>
        </div>
        
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h2 className="text-3xl font-bold mb-4">Serving Des Moines Since 2010</h2>
              <p className="text-lg max-w-2xl">
                Our team understands the unique climate and soil conditions of the Des Moines area, allowing us to create sustainable and beautiful outdoor environments.
              </p>
            </div>
          </div>
          <div className="relative w-full h-full">
            {/* Image would go here in production */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-blue-800 opacity-80"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <Card>
            <CardHeader>
              <CardTitle>Residential Landscaping</CardTitle>
              <CardDescription>For Des Moines Homeowners</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our residential landscaping services help Des Moines homeowners create beautiful, functional outdoor spaces that enhance property value and enjoyment.</p>
              <Button className="mt-4" variant="outline">Learn More</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Commercial Services</CardTitle>
              <CardDescription>For Local Businesses</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create an impressive first impression for your Des Moines business with our professional commercial landscaping and maintenance services.</p>
              <Button className="mt-4" variant="outline">Learn More</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Waterfront Properties</CardTitle>
              <CardDescription>Specialized Solutions</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We offer specialized landscaping solutions for Des Moines waterfront properties, addressing erosion control and saltwater exposure challenges.</p>
              <Button className="mt-4" variant="outline">Learn More</Button>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-gray-50 p-8 rounded-xl">
          <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Us in Des Moines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Local Expertise</h3>
              <p>Our team has extensive experience working with Des Moines' unique soil conditions, weather patterns, and local regulations.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p>We source the highest quality plants, materials, and supplies that thrive in the Des Moines climate and withstand local weather conditions.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Sustainable Practices</h3>
              <p>Our eco-friendly approach to landscaping helps preserve Des Moines' natural beauty while creating stunning outdoor spaces.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Reliable Service</h3>
              <p>From the initial consultation to ongoing maintenance, we provide reliable, professional service to all our Des Moines clients.</p>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Des Moines Property?</h2>
          <p className="text-xl mb-6">Contact us today for a free consultation and estimate.</p>
          <Button size="lg" className="px-8">Get a Free Quote</Button>
        </div>
      </div>
    </main>
  )
}