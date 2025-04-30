"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareQuote } from 'lucide-react';
import { QuoteButton } from './quote-button';

export const StickyQuoteButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [initialAnimation, setInitialAnimation] = useState(true);

  useEffect(() => {
    // Set a timeout to disable the pulse animation after 5 seconds
    const animationTimeout = setTimeout(() => {
      setInitialAnimation(false);
    }, 5000);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const bodyHeight = document.documentElement.scrollHeight;
      
      // Show button when scrolled down 100px and not near bottom
      if (scrollPosition > 100 && (scrollPosition + windowHeight) < (bodyHeight - 100)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(animationTimeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 inset-x-0 mx-auto px-4 z-[97] max-w-[90vw] sm:max-w-[400px] w-full"
        >
          <motion.div
            animate={initialAnimation ? { 
              scale: [1, 1.05, 1],
              y: [0, -5, 0]
            } : { scale: 1, y: 0 }}
            transition={initialAnimation ? { 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2,
              ease: "easeInOut"
            } : {}}
            className={`${initialAnimation ? "animate-pulse" : ""} w-full flex justify-center`}
          >
            <QuoteButton 
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3.5 rounded-full font-semibold
                shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105
                active:translate-y-0 whitespace-nowrap text-center flex items-center justify-center gap-2
                min-w-[200px] sm:min-w-[240px] text-base sm:text-lg w-full"
            >
              <MessageSquareQuote className="h-5 w-5" />
              Get Your Free Quote
            </QuoteButton>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyQuoteButton;