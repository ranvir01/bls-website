"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Phone, Mail, Clock, MapPin } from 'lucide-react';
import Image from 'next/image';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  subject: z.string().min(2, { message: "Subject is required" }).optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormData = z.infer<typeof formSchema>;

export const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch('https://formspree.io/f/xzzdagdw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) throw new Error('Failed to submit form');
      
      setSubmitSuccess(true);
      reset();
      
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Contact Seattle's Hardscaping & Irrigation Experts</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get in touch to discuss your hardscaping or irrigation project in Seattle. Our 
            specialists are ready to help solve your property's unique challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Professional Services Card */}
          <div className="lg:col-span-4">
            <div className="bg-teal-800 text-white p-6 rounded-lg shadow-md h-full">
              <h3 className="text-xl font-semibold mb-6 border-b border-teal-700 pb-2">
                Professional Hardscaping & Irrigation Services
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-teal-200">Call Us</h4>
                    <a href="tel:2532170814" className="text-white hover:text-teal-200 transition-colors">
                      (253) 217-0814
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-teal-200">Email Us</h4>
                    <a href="mailto:blue_landscaping@yahoo.com" className="text-white hover:text-teal-200 transition-colors break-all">
                      blue_landscaping@yahoo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-teal-200">Business Hours</h4>
                    <p className="text-teal-100">Mon - Sat: 7am - 6pm</p>
                    <p className="text-teal-100">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-teal-300 mr-3 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-medium text-sm text-teal-200">Service Area</h4>
                    <p className="text-teal-100">Seattle & Greater Puget Sound</p>
                    <p className="text-teal-100">King County & Surrounding Areas</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Request Information Form */}
          <div className="lg:col-span-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Request Information</h3>
              
              <p className="text-gray-600 mb-6">
                Fill out the form below to discuss your landscaping project. 
                We specialize in hardscaping, irrigation systems, and custom outdoor spaces throughout the Greater Seattle area.
              </p>
              
              {submitSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                  Thank you for your message! We'll be in touch soon.
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                  {submitError}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Your name"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                      placeholder="your.email@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="How can we help you?"
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
                    placeholder="Tell us about your project..."
                    {...register('message')}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-teal-700 text-white py-3 rounded font-medium hover:bg-teal-800 transition-colors disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          {/* Service Area Map */}
          <div className="lg:col-span-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-teal-700" />
                <h3 className="text-lg font-semibold text-gray-800">Service Area</h3>
              </div>
              <p className="text-gray-600 mb-4">Professional landscaping services throughout Greater Seattle.</p>
              <div className="relative h-[300px] bg-gray-200 rounded-lg overflow-hidden">
                <Image 
                  src="https://i.imgur.com/ZJZqy90.png" 
                  alt="Seattle Service Area Map"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          
          {/* Service Locations */}
          <div className="lg:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Locations</h3>
              <p className="text-gray-600 mb-4">
                We provide professional landscaping services throughout these Seattle neighborhoods and surrounding areas:
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {[
                  'Seattle', 'Bellevue', 
                  'Kirkland', 'Redmond', 
                  'Mercer Island', 'Shoreline', 
                  'Lake Forest Park', 'Edmonds',
                  'Magnolia', 'West Seattle',
                  'Burien', 'Factoria',
                  'Kent', 'Renton',
                  'Auburn', 'Federal Way',
                  'Covington', 'Maple Valley',
                  'Des Moines', 'Tukwila'
                ].map((location, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-teal-700" />
                    <span className="text-gray-700">{location}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};