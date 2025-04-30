import { Hero } from '@/components/hero';
import { QuoteButton } from '@/components/quote-modal';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About Us | Blue Landscaping Services',
  description: 'Learn about Blue Landscaping Services, our mission, values, and the team behind our professional landscaping and hardscaping services in Seattle.',
};

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Blue Landscaping"
        subtitle="Professional landscaping services since 2005"
        image="https://images.pexels.com/photos/589/garden-green-grass-spring.jpg"
        size="md"
      />

      {/* Company Story Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src="https://images.pexels.com/photos/1416382/pexels-photo-1416382.jpeg"
                alt="Blue Landscaping team at work"
                fill
                className="object-cover rounded-lg shadow-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-teal-700">
                Our Story
              </h2>
              <p className="text-gray-700 mb-4">
                Blue Landscaping Services was founded in 2005 by John Thompson, a landscape architect with a passion for creating beautiful, functional outdoor spaces. What started as a small one-man operation has grown into one of Seattle's most trusted landscaping companies.
              </p>
              <p className="text-gray-700 mb-4">
                Over the years, we've built a reputation for quality craftsmanship, attention to detail, and exceptional customer service. Our team has expanded to include expert landscapers, hardscape specialists, irrigation technicians, and designers who share our founder's vision and commitment to excellence.
              </p>
              <p className="text-gray-700 mb-6">
                Today, we continue to serve the Seattle area with pride, transforming ordinary outdoor spaces into extraordinary landscapes that enhance our clients' lives and property values.
              </p>
              <QuoteButton />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="section-padding bg-teal-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Mission & Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Blue Landscaping, we're guided by a clear mission and strong values that inform everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-teal-700">Our Mission</h3>
              <p className="text-gray-700">
                To create beautiful, sustainable outdoor environments that enhance our clients' quality of life while respecting and preserving the natural world around us. We strive to exceed expectations through innovative design, quality craftsmanship, and exceptional service.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4 text-teal-700">Our Vision</h3>
              <p className="text-gray-700">
                To be the leading landscaping company in the Seattle area, recognized for our commitment to sustainability, innovation, and customer satisfaction. We envision a community where every outdoor space contributes positively to the environment and provides joy to those who use it.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 text-teal-700 text-center">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Quality", description: "We never compromise on quality and take pride in delivering excellent results that stand the test of time." },
                { title: "Integrity", description: "We operate with honesty and transparency in all our dealings with clients, employees, and partners." },
                { title: "Sustainability", description: "We're committed to environmentally responsible practices that conserve resources and protect our ecosystem." },
                { title: "Innovation", description: "We continually seek new ideas, techniques, and solutions to improve our services and results." },
                { title: "Reliability", description: "We honor our commitments and can be counted on to deliver what we promise, when we promise it." },
                { title: "Customer Focus", description: "We listen carefully to our clients' needs and preferences, making their satisfaction our top priority." }
              ].map((value, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-1">{value.title}</h4>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our skilled professionals bring years of experience and passion to every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "John Thompson", title: "Founder & Lead Designer", image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" },
              { name: "Sarah Johnson", title: "Landscape Architect", image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" },
              { name: "Michael Chen", title: "Hardscape Specialist", image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" },
              { name: "Emily Rodriguez", title: "Irrigation Expert", image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-gray-600">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-teal-700 text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Blue Landscaping</h2>
            <p className="text-teal-100 max-w-3xl mx-auto">
              When you work with us, you benefit from our expertise, commitment to quality, and passion for creating beautiful outdoor spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Experienced Team",
                description: "With over 15 years in the industry, our team brings expertise and skill to every project."
              },
              {
                title: "Custom Solutions",
                description: "We tailor our services to your specific needs, preferences, and property characteristics."
              },
              {
                title: "Quality Materials",
                description: "We use only the highest quality materials to ensure durability and longevity."
              },
              {
                title: "Sustainable Practices",
                description: "Our eco-friendly approach conserves resources and protects the environment."
              },
              {
                title: "Comprehensive Services",
                description: "From design to installation to maintenance, we handle all aspects of your landscape needs."
              },
              {
                title: "Guaranteed Satisfaction",
                description: "We stand behind our work with a satisfaction guarantee on all our services."
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-teal-600 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                <p className="text-teal-100">{benefit.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/contact" className="btn-primary bg-white text-teal-700 hover:bg-teal-50">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>

      {/* Certifications & Affiliations */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Certifications & Affiliations</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              We maintain the highest standards through professional certifications and industry affiliations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              "Washington State Landscaping Association",
              "Certified Irrigation Technicians",
              "Sustainable Landscaping Certification",
              "Better Business Bureau A+ Rating"
            ].map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="h-16 flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                    <span className="text-teal-700 font-bold text-xl">{index + 1}</span>
                  </div>
                </div>
                <p className="font-semibold text-gray-800">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}