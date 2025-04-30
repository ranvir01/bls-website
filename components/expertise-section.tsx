"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Droplets, Ruler } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpertiseItem {
  title: string;
  description: string;
  icon: React.ElementType;
  details: {
    title: string;
    description: string;
  }[];
}

const expertiseData: ExpertiseItem[] = [
  {
    title: "Seattle Hardscaping Experts",
    description: "Custom retaining walls, patios, and outdoor living spaces built to last.",
    icon: Shield,
    details: [
      {
        title: "Retaining Walls",
        description: "Engineered solutions for Seattle's challenging terrain, combining stability with aesthetic appeal."
      },
      {
        title: "Custom Patios",
        description: "Personalized outdoor living spaces using premium materials and expert craftsmanship."
      },
      {
        title: "Hardscape Design",
        description: "Innovative designs that blend seamlessly with your property's natural features."
      }
    ]
  },
  {
    title: "Professional Irrigation",
    description: "Water-efficient systems designed for the Pacific Northwest climate.",
    icon: Droplets,
    details: [
      {
        title: "Smart Irrigation Systems",
        description: "Advanced technology for optimal water usage and plant health."
      },
      {
        title: "Maintenance Services",
        description: "Regular system checks and adjustments to ensure peak performance."
      },
      {
        title: "Eco-Friendly Solutions",
        description: "Water conservation features and sustainable irrigation practices."
      }
    ]
  },
  {
    title: "Custom Outdoor Spaces",
    description: "Creating beautiful and functional landscapes for Seattle homes.",
    icon: Ruler,
    details: [
      {
        title: "Landscape Design",
        description: "Custom designs that complement your home's architecture and your lifestyle."
      },
      {
        title: "Project Management",
        description: "Comprehensive oversight from concept to completion."
      },
      {
        title: "Quality Assurance",
        description: "Rigorous quality control and attention to detail on every project."
      }
    ]
  }
];

export const ExpertiseSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn About Our Expertise
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            From engineered retaining walls and custom paver patios to water-efficient irrigation systems,
            we deliver premium solutions that enhance both functionality and beauty.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {expertiseData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div
                className={cn(
                  "bg-white rounded-lg shadow-lg p-6 transition-all duration-300",
                  "hover:shadow-xl hover:-translate-y-1",
                  activeIndex === index ? "ring-2 ring-teal-500" : ""
                )}
              >
                <div className="flex items-start mb-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <item.icon className="w-6 h-6 text-teal-600" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-xl text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full mt-4 flex items-center justify-between text-teal-600 hover:text-teal-700 font-medium"
                >
                  <span>Learn more</span>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 transition-transform duration-300",
                      activeIndex === index ? "rotate-180" : ""
                    )}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: activeIndex === index ? "auto" : 0,
                    opacity: activeIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-4">
                    {item.details.map((detail, idx) => (
                      <div key={idx} className="border-l-2 border-teal-200 pl-4">
                        <h4 className="font-medium text-gray-900 mb-1">
                          {detail.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {detail.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;