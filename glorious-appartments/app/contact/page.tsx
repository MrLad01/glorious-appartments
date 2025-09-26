"use client"
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ContactUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Intersection observers for header and main sections
  const [headerRef, headerInView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [mainRef, mainInView] = useInView({ triggerOnce: false, threshold: 0.3 });

  const carouselImages = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="min-h-screen font-sans bg-gray-50 dark:bg-gray-900">
      <header ref={headerRef} className="relative h-96 overflow-hidden">
        <div className="relative w-full h-full">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image}
                alt={`Glorious Apartment ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-4 text-[#b39800]"
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-light max-w-2xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
          >
            Get in Touch with Glorious Apartment - Your Gateway to Luxury Living
          </motion.p>
        </div>

        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
        >
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-[#b39800]' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </motion.div>
      </header>

      <main ref={mainRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-4xl font-bold text-gray-900 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={mainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Let's Connect
            </motion.h2>
            <motion.p
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={mainInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              Ready to experience luxury living? Reach out to us through any of these channels, 
              and our team will be delighted to assist you.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Phone,
                title: 'Call Us',
                content: (
                  <>
                    <a 
                      href="tel:+2348039636839" 
                      className="text-[#b39800] font-medium hover:text-yellow-600 transition-colors text-lg"
                    >
                      +234 803 9636 839
                    </a>
                    <p className="text-gray-500 mt-1">Available 24/7</p>
                  </>
                ),
                delay: 0.4
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: (
                  <>
                    <a 
                      href="mailto:gloriousapartments2025@gmail.com" 
                      className="text-[#b39800] font-medium hover:text-yellow-600 transition-colors break-all"
                    >
                      gloriousapartments2025@gmail.com
                    </a>
                    <p className="text-gray-500 mt-1">Quick response guaranteed</p>
                  </>
                ),
                delay: 0.5
              },
              {
                icon: MapPin,
                title: 'Visit Us',
                content: (
                  <>
                    <p className="text-[#b39800] font-medium text-lg">
                      Priscilla Oluwafemi Str
                    </p>
                    <p className="text-gray-600">
                      Asero Estate Extension (Kotogbo)<br />
                      Asero, Abeokuta
                    </p>
                  </>
                ),
                delay: 0.6
              },
              {
                icon: Clock,
                title: 'Availability',
                content: (
                  <>
                    <p className="text-gray-600">Monday - Sunday</p>
                    <p className="text-[#b39800] font-medium text-lg">24/7 Support Available</p>
                  </>
                ),
                delay: 0.7
              }
            ].map(({ icon: Icon, title, content, delay }, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border-l-4 border-[#b39800]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={mainInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{
                  duration: 0.6,
                  ease: 'easeOut',
                  delay,
                  scale: { type: 'spring', stiffness: 200, damping: 10 }
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-[#b39800] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-8 h-8 dark:text-black text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-300 mb-2">{title}</h3>
                    {content}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
