"use client"
import React, { useState, useEffect } from 'react';
import {
  Home,
  Bed,
  Wifi,
  Car,
  Shield,
  Zap,
  WashingMachine,
  Camera,
  ChevronLeft,
  ChevronRight,
  Star,
  Users,
  Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ServicesPage = () => {
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [apartment2BRIndex, setApartment2BRIndex] = useState(0);
  const [apartment3BRIndex, setApartment3BRIndex] = useState(0);
  const [amenitiesIndex, setAmenitiesIndex] = useState(0);

  // Intersection observers for each section
  const [heroRef, heroInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [apartment2BRRef, apartment2BRInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [apartment3BRRef, apartment3BRInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [amenitiesRef, amenitiesInView] = useInView({ triggerOnce: false, threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ triggerOnce: false, threshold: 0.1 });

  // Hero carousel images
  const heroImages = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg"
  ];

  // 2 Bedroom apartment images
  const apartment2BR = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
  ];

  // 3 Bedroom apartment images
  const apartment3BR = [
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
  ];

  // Amenities images
  const amenitiesImages = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
  ];

  // Auto-advance hero carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex(prev => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Auto-advance apartment carousels
  useEffect(() => {
    const interval2BR = setInterval(() => {
      setApartment2BRIndex(prev => (prev + 1) % apartment2BR.length);
    }, 6000);

    const interval3BR = setInterval(() => {
      setApartment3BRIndex(prev => (prev + 1) % apartment3BR.length);
    }, 7000);

    const intervalAmenities = setInterval(() => {
      setAmenitiesIndex(prev => (prev + 1) % amenitiesImages.length);
    }, 8000);

    return () => {
      clearInterval(interval2BR);
      clearInterval(interval3BR);
      clearInterval(intervalAmenities);
    };
  }, [apartment2BR.length, apartment3BR.length, amenitiesImages.length]);

  const nextSlide = (currentIndex: number, images: string[], setter: (index: number) => void) => {
    setter((currentIndex + 1) % images.length);
  };

  const prevSlide = (currentIndex: number, images: string[], setter: (index: number) => void) => {
    setter(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Hero Section with Carousel */}
      <section ref={heroRef} className="relative h-96 overflow-hidden">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${index === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}
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
            className="text-4xl md:text-6xl font-bold mb-4 text-[#d4b502]"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            Our Services
          </motion.h1>
          <motion.p
            className="text-lg md:text-2xl font-light max-w-3xl px-4"
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.04 }}
          >
            Premium Apartments & World-Class Amenities for Your Perfect Stay
          </motion.p>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${index === heroImageIndex ? 'bg-[#d4b502]' : 'bg-white/50 hover:bg-white/80'}`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 2 Bedroom Apartment Section */}
        <section ref={apartment2BRRef} className="mb-20">
          <div className="text-center mb-12">
            <motion.h2
              className="lg:text-4xl text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={apartment2BRInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              2 Bedroom Apartments
            </motion.h2>
            <motion.p
              className="lg:text-xl text-base text-gray-600 dark:text-gray-300  max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={apartment2BRInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.04 }}
            >
              Perfect for small families and professionals seeking comfort and style
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Carousel */}
            <div className="relative">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                {apartment2BR.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === apartment2BRIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={image}
                      alt={`2BR Apartment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <button
                  onClick={() => prevSlide(apartment2BRIndex, apartment2BR, setApartment2BRIndex)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => nextSlide(apartment2BRIndex, apartment2BR, setApartment2BRIndex)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-4 left-4 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {apartment2BRIndex + 1} / {apartment2BR.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={apartment2BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#d4b502] rounded-full flex items-center justify-center">
                  <Bed className="w-6 h-6 dark:text-black text-white" />
                </div>
                <motion.h3
                  className="lg:text-2xl text-xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: 20 }}
                  animate={apartment2BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                >
                  Spacious 2BR Flat
                </motion.h3>
              </div>

              <motion.p
                className="md:text-xl text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                animate={apartment2BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
              >
                Our 2-bedroom apartments offer the perfect blend of comfort and functionality.
                Ideal for couples, small families, or professionals who value quality living spaces.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users, text: '2-4 Guests', delay: 0.7 },
                  { icon: Calendar, text: 'Daily/Weekly/Monthly', delay: 0.8 },
                  { icon: Star, text: 'Premium Rating', delay: 0.9 },
                ].map(({ icon: Icon, text, delay }, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={apartment2BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay }}
                  >
                    <Icon className="w-5 h-5 text-[#d4b502]" />
                    <span className="text-gray-700 dark:text-gray-400 md:text-lg text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>

              <ul className="space-y-3 md:grid md:grid-cols-2 text-gray-700 dark:text-gray-400 md:text-lg text-sm">
                {[
                  'Fully equipped modern kitchen',
                  'Spacious living and dining area',
                  'Two comfortable bedrooms',
                  'Modern bathroom facilities',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={apartment2BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

        {/* 3 Bedroom Apartment Section */}
        <section ref={apartment3BRRef} className="mb-20">
          <div className="text-center mb-12">
            <motion.h2
              className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={apartment3BRInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              3 Bedroom Apartments
            </motion.h2>
            <motion.p
              className="md:text-xl text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={apartment3BRInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.04 }}
            >
              Luxurious accommodations ideal for larger families who value space and premium living
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              className="space-y-6 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={apartment3BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#d4b502] rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 dark:text-black text-white" />
                </div>
                <motion.h3
                  className="md:text-2xl text-xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={apartment3BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.5 }}
                >
                  Premium 3BR Flat
                </motion.h3>
              </div>

              <motion.p
                className="md:text-lg text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                initial={{ opacity: 0, x: -20 }}
                animate={apartment3BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.6 }}
              >
                Experience luxury living in our spacious 3-bedroom apartments. Perfect for larger families
                or groups who don't want to compromise on comfort and style.
              </motion.p>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { icon: Users, text: '4-6 Guests', delay: 0.7 },
                  { icon: Calendar, text: 'Daily/Weekly/Monthly', delay: 0.8 },
                  { icon: Star, text: 'Luxury Rating', delay: 0.9 },
                ].map(({ icon: Icon, text, delay }, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={apartment3BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay }}
                  >
                    <Icon className="w-5 h-5 text-[#d4b502]" />
                    <span className="text-gray-700 dark:text-gray-400 md:text-lg text-sm">{text}</span>
                  </motion.div>
                ))}
              </div>

              <ul className="space-y-3 md:grid md:grid-cols-2 text-gray-700 dark:text-gray-400 md:text-lg text-sm">
                {[
                  'Three spacious bedrooms',
                  'Large living and dining areas',
                  'Premium kitchen appliances',
                  'Multiple bathroom facilities',
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={apartment3BRInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 + index * 0.1 }}
                  >
                    <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Carousel */}
            <div className="relative lg:order-2">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                {apartment3BR.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === apartment3BRIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={image}
                      alt={`3BR Apartment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <button
                  onClick={() => prevSlide(apartment3BRIndex, apartment3BR, setApartment3BRIndex)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => nextSlide(apartment3BRIndex, apartment3BR, setApartment3BRIndex)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-4 left-4 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {apartment3BRIndex + 1} / {apartment3BR.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities Section */}
        <section ref={amenitiesRef} className="mb-20">
          <div className="text-center mb-12">
            <motion.h2
              className="md:text-4xl text-2xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={amenitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              Premium Amenities
            </motion.h2>
            <motion.p
              className="md:text-xl text-base text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={amenitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.04 }}
            >
              World-class facilities and services designed for your ultimate comfort and convenience
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Amenities Carousel */}
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
                {amenitiesImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${index === amenitiesIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      src={image}
                      alt={`Amenity ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}

                <button
                  onClick={() => prevSlide(amenitiesIndex, amenitiesImages, setAmenitiesIndex)}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={() => nextSlide(amenitiesIndex, amenitiesImages, setAmenitiesIndex)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>

                <div className="absolute bottom-4 right-4 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {amenitiesIndex + 1} / {amenitiesImages.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Amenities List */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 50 }}
              animate={amenitiesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              <motion.h3
                className="md:text-2xl text-lg font-bold text-gray-900 dark:text-white mb-6"
                initial={{ opacity: 0, x: 20 }}
                animate={amenitiesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
              >
                What We Offer
              </motion.h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: '24hrs Power Supply', delay: 0.6 },
                  { icon: Shield, text: 'Maximum Security', delay: 0.7 },
                  { icon: Camera, text: 'CCTV Surveillance', delay: 0.8 },
                  { icon: WashingMachine, text: 'Washing Machine', delay: 0.9 },
                  { icon: Car, text: 'Secure Parking', delay: 1.0 },
                  { icon: Wifi, text: 'High-Speed WiFi', delay: 1.1 },
                ].map(({ icon: Icon, text, delay }, index) => (
                  <motion.div
                    key={index}
                    className="bg-white dark:bg-transparent dark:border dark:text-gray-400 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={amenitiesInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      ease: 'easeOut',
                      delay,
                      scale: { type: 'spring', stiffness: 200, damping: 10 },
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-6 h-6 text-[#d4b502]" />
                      <span className="font-semibold text-gray-800 dark:text-gray-400 md:text-lg text-sm">{text}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section ref={contactRef} className="dark:bg-gradient-to-r shadow-md from-gray-900 dark:from-gray-800 to-gray-800 rounded-2xl p-12 text-center text-white">
          <motion.h3
            className="md:text-3xl text-xl font-bold mb-4 text-[#d4b502]"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Ready to Book Your Perfect Stay?
          </motion.h3>
          <motion.p
            className="md:text-xl text-sm dark:text-gray-300 text-gray-700 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.04 }}
          >
            Experience luxury living at De Glorious Home. Contact us today to reserve your premium accommodation.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="tel:+2348039636839"
              className="inline-flex items-center px-8 py-4 bg-[#d4b502] dark:text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform md:text-sm text-xs"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={contactInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                scale: { type: 'spring', stiffness: 200, damping: 10 },
              }}
            >
              📞 Call Now: +234 803 9636 839
            </motion.a>
            <motion.button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center px-8 py-4 border-2 border-[#d4b502] text-[#d4b502] font-bold rounded-lg transition-all cursor-pointer duration-300 md:text-lg text-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={contactInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: 0.04,
                scale: { type: 'spring', stiffness: 200, damping: 10 },
              }}
            >
              Get More Info
            </motion.button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;