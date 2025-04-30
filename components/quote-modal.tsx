"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Calculator, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { createPortal } from 'react-dom';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  phone: z.string().min(10, { message: "Phone number is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  projectLocation: z.string().min(5, { message: "Project location is required" }).optional(),
  projectType: z.string().min(1, { message: "Please select a project type" }),
  projectDetails: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

export const QuoteModal = ({ isOpen, onClose, children }: QuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // Handle mounting state for SSR compatibility
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle escape key and body scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

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
        onClose();
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      setSubmitError('Failed to submit form. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />
          
          {/* Modal container */}
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            aria-modal="true"
            role="dialog"
          >
            {/* Modal content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden my-auto"
              onClick={e => e.stopPropagation()}
              style={{ willChange: "transform, opacity" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center gap-3">
                  <Calculator className="w-6 h-6 text-teal-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Get Your Free Quote</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 72px)' }}>
                <div className="p-6 space-y-4">
                  {submitSuccess ? (
                    <div className="text-center py-8">
                      <div className="bg-green-50 text-green-700 p-6 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Thank You!</h3>
                        <p>We've received your request and will contact you shortly.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      {submitError && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
                          {submitError}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1 text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            {...register('name')}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            placeholder="Your name"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                          )}
                        </div>

                        {/* Phone */}
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium mb-1 text-gray-700">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            {...register('phone')}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            placeholder="(123) 456-7890"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                          )}
                        </div>

                        {/* Email */}
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-700">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            {...register('email')}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            placeholder="your.email@example.com"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>

                        {/* Location */}
                        <div>
                          <label htmlFor="projectLocation" className="block text-sm font-medium mb-1 text-gray-700">
                            Project Location
                          </label>
                          <input
                            type="text"
                            id="projectLocation"
                            {...register('projectLocation')}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            placeholder="Street address, City"
                          />
                          {errors.projectLocation && (
                            <p className="mt-1 text-sm text-red-600">{errors.projectLocation.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {/* Project Type */}
                        <div>
                          <label htmlFor="projectType" className="block text-sm font-medium mb-1 text-gray-700">
                            Project Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="projectType"
                            {...register('projectType')}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                          >
                            <option value="">Select a project type</option>
                            <option value="new-lawn">New Lawn Installation</option>
                            <option value="irrigation">Irrigation System</option>
                            <option value="hardscaping">Hardscaping</option>
                            <option value="retaining-walls">Retaining Walls</option>
                            <option value="patio">Patio Installation</option>
                            <option value="water-features">Water Features</option>
                            <option value="maintenance">Lawn Maintenance</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.projectType && (
                            <p className="mt-1 text-sm text-red-600">{errors.projectType.message}</p>
                          )}
                        </div>

                        {/* Project Details */}
                        <div>
                          <label htmlFor="projectDetails" className="block text-sm font-medium mb-1 text-gray-700">
                            Project Details
                          </label>
                          <textarea
                            id="projectDetails"
                            {...register('projectDetails')}
                            rows={4}
                            className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                            placeholder="Please provide any additional details about your project"
                          ></textarea>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 text-white py-3 rounded-full font-medium hover:bg-teal-700 transition-colors disabled:opacity-70 flex items-center justify-center shadow-lg hover:shadow-xl"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin mr-2 h-5 w-5" />
                            Submitting...
                          </>
                        ) : (
                          'Request Quote'
                        )}
                      </button>
                      <p className="text-center text-sm text-gray-500">
                        We'll get back to you within 24-48 hours with a detailed quote.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Export the QuoteButton component that can be used in server components
export const QuoteButton = ({ 
  children, 
  className 
}: { 
  children: React.ReactNode; 
  className?: string 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>
      
      <QuoteModal 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
};