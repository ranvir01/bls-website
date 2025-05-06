import { Hero } from '@/components/hero';
import { QuoteButton } from '@/components/quote-button';
import Link from 'next/link';

export const metadata = {
  title: 'Client Testimonials | Blue Landscaping Services',
  description: 'Read what our clients say about our landscaping and hardscaping services in Seattle. Real stories from real customers.',
};

export default function TestimonialsPage() {
  return (
    <>
      <Hero
        title="Client Testimonials"
        subtitle="Real stories from satisfied customers"
        image="https://images.pexels.com/photos/169185/pexels-photo-169185.jpeg"
        size="md"
      />
      
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600">
              Don't just take our word for it. Here's what our satisfied customers have to say about our services.
            </p>
          </div>
          
          {/* <TestimonialSlider /> */}
          
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Transform Your Outdoor Space?</h3>
            <p className="text-gray-600 mb-8">
              Contact us today to schedule a consultation and see how we can bring your vision to life.
            </p>
            <QuoteButton className="btn-primary">
              Get a Free Quote
            </QuoteButton>
          </div>
        </div>
      </section>
    </>
  );
}