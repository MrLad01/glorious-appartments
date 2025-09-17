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

const ServicesPage = () => {
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [apartment2BRIndex, setApartment2BRIndex] = useState(0);
  const [apartment3BRIndex, setApartment3BRIndex] = useState(0);
  const [amenitiesIndex, setAmenitiesIndex] = useState(0);

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
  }, []);

  const nextSlide = (currentIndex: number, images: string[], setter: (index: number) => void) => {
    setter((currentIndex + 1) % images.length);
  };

  const prevSlide = (currentIndex: number, images: string[], setter: (index: number) => void) => {
    setter(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Carousel */}
      <section className="relative h-96 overflow-hidden">
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === heroImageIndex ? 'opacity-100' : 'opacity-0'
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#d4b502]">Our Services</h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl px-4">
            Premium Apartments & World-Class Amenities for Your Perfect Stay
          </p>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setHeroImageIndex(index)}
              className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                index === heroImageIndex ? 'bg-[#d4b502]' : 'bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* 2 Bedroom Apartment Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">2 Bedroom Apartments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perfect for small families and professionals seeking comfort and style
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Carousel */}
            <div className="relative">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                {apartment2BR.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === apartment2BRIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`2BR Apartment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                
                {/* Navigation Buttons */}
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

                {/* Image Counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 rounded-full px-3 py-1">
                  <span className="text-white text-sm">
                    {apartment2BRIndex + 1} / {apartment2BR.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#d4b502] rounded-full flex items-center justify-center">
                  <Bed className="w-6 h-6 dark:text-black text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Spacious 2BR Flat</h3>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Our 2-bedroom apartments offer the perfect blend of comfort and functionality. 
                Ideal for couples, small families, or professionals who value quality living spaces.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#d4b502]" />
                  <span className="text-gray-700">2-4 Guests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#d4b502]" />
                  <span className="text-gray-700">Daily/Weekly/Monthly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-[#d4b502]" />
                  <span className="text-gray-700">Premium Rating</span>
                </div>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Fully equipped modern kitchen</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Spacious living and dining area</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Two comfortable bedrooms</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Modern bathroom facilities</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 3 Bedroom Apartment Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">3 Bedroom Apartments</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Luxurious accommodations ideal for larger families who value space and premium living
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6 lg:order-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#d4b502] rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 dark:text-black text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Premium 3BR Flat</h3>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Experience luxury living in our spacious 3-bedroom apartments. Perfect for larger families 
                or groups who don't want to compromise on comfort and style.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-[#d4b502]" />
                  <span className="text-gray-700">4-6 Guests</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-[#d4b502]" />
                  <span className="text-gray-700">Daily/Weekly/Monthly</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-[#d4b502]" />
                  <span className="text-gray-700">Luxury Rating</span>
                </div>
              </div>

              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Three spacious bedrooms</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Large living and dining areas</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Premium kitchen appliances</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#d4b502] rounded-full"></div>
                  <span>Multiple bathroom facilities</span>
                </li>
              </ul>
            </div>

            {/* Carousel */}
            <div className="relative lg:order-2">
              <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
                {apartment3BR.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === apartment3BRIndex ? 'opacity-100' : 'opacity-0'
                    }`}
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
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Amenities</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              World-class facilities and services designed for your ultimate comfort and convenience
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Amenities Carousel */}
            <div className="lg:col-span-2">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl mb-6">
                {amenitiesImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      index === amenitiesIndex ? 'opacity-100' : 'opacity-0'
                    }`}
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
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h3>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-6 h-6 text-[#d4b502]" />
                    <span className="font-semibold text-gray-800">24hrs Power Supply</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-[#d4b502]" />
                    <span className="font-semibold text-gray-800">Maximum Security</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Camera className="w-6 h-6 text-[#d4b502]" />
                    <span className="font-semibold text-gray-800">CCTV Surveillance</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <WashingMachine className="w-6 h-6 text-[#d4b502]" />
                    <span className="font-semibold text-gray-800">Washing Machine</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Car className="w-6 h-6 text-[#d4b502]" />
                    <span className="font-semibold text-gray-800">Secure Parking</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-6 h-6 text-[#d4b502]" />
                    <span className="font-semibold text-gray-800">High-Speed WiFi</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="dark:bg-gradient-to-r shadow-md from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4 text-[#d4b502]">Ready to Book Your Perfect Stay?</h3>
          <p className="text-xl dark:text-gray-300 text-gray-700 mb-8 max-w-2xl mx-auto">
            Experience luxury living at Glorious Apartment. Contact us today to reserve your premium accommodation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+2348039636839"
              className="inline-flex items-center px-8 py-4 bg-[#d4b502] dark:text-black font-bold rounded-lg hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
            >
              📞 Call Now: +234 803 9636 839
            </a>
            <button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center px-8 py-4 border-2 border-[#d4b502] text-[#d4b502] font-bold rounded-lg hover:bg-[#d4b502] dark:hover:text-black hover:text-white transition-all cursor-pointer duration-300"
            >
              Get More Info
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServicesPage;