import React from "react"
import { Metadata } from "next"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import StickyQuoteButton from "@/components/sticky-quote-button"

export const metadata: Metadata = {
  title: "Professional Landscaping Services in Auburn | Your Company",
  description: "Expert landscaping and outdoor design services in Auburn. Transform your outdoor space with our professional services. Free quote & consultation.",
}

export default function AuburnPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Landscaping Services in Auburn</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Your trusted partner for professional landscaping services in Auburn. We transform outdoor 
          spaces into beautiful, functional environments that enhance your property.
        </p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold">Auburn's Premier Landscaping Service</h2>
          <p className="text-muted-foreground">
            We've been serving the Auburn community for years, delivering high-quality landscaping 
            solutions tailored to the unique environment and style preferences of Auburn residents.
          </p>
          <p className="text-muted-foreground">
            Our expertise spans hardscaping, garden design, irrigation systems, and sustainable 
            landscaping practices that thrive in Auburn's climate.
          </p>
          <Button variant="default" className="mt-4">
            View Our Services <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="rounded-lg overflow-hidden aspect-video bg-muted">
          {/* Image placeholder for Auburn landscape */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Auburn Landscape Image
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Why Choose Us in Auburn</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 border rounded-lg space-y-3">
            <h3 className="text-xl font-semibold">Local Expertise</h3>
            <p className="text-muted-foreground">
              Our team understands Auburn's soil conditions, climate patterns, and local regulations, ensuring optimal results for your property.
            </p>
          </div>
          <div className="p-6 border rounded-lg space-y-3">
            <h3 className="text-xl font-semibold">Custom Designs</h3>
            <p className="text-muted-foreground">
              We create personalized outdoor spaces that reflect your style while complementing Auburn's natural beauty.
            </p>
          </div>
          <div className="p-6 border rounded-lg space-y-3">
            <h3 className="text-xl font-semibold">Quality Materials</h3>
            <p className="text-muted-foreground">
              We source premium materials that withstand Auburn's weather conditions while providing lasting beauty.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Auburn Service Areas</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {["North Auburn", "Lakeland Hills", "West Auburn", "Downtown Auburn"].map((area) => (
            <div key={area} className="p-4 border rounded-lg text-center">
              <p className="font-medium">{area}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted p-8 rounded-lg">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Ready to Transform Your Auburn Property?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Our Auburn team is ready to bring your vision to life.
          </p>
          <Button size="lg" className="mt-4">
            Get Your Free Quote
          </Button>
        </div>
      </section>
      
      <StickyQuoteButton />
    </div>
  )
}