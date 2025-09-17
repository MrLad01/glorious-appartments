"use client"
import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
    <div className="min-h-screen font-sans bg-gray-50">
      <header className="relative h-96 overflow-hidden">
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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[#b39800]">Contact Us</h1>
          <p className="text-xl md:text-2xl font-light max-w-2xl px-4">
            Get in Touch with Glorious Apartment - Your Gateway to Luxury Living
          </p>
        </div>

      
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Let's Connect</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to experience luxury living? Reach out to us through any of these channels, 
              and our team will be delighted to assist you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:transform hover:scale-110 cursor-pointer duration-500 border-l-4 border-[#b39800]">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#b39800] rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 dark:text-black text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
                  <a 
                    href="tel:+2348039636839" 
                    className="text-[#b39800] font-medium hover:text-yellow-600 transition-colors text-lg"
                  >
                    +234 803 9636 839
                  </a>
                  <p className="text-gray-500 mt-1">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:transform hover:scale-110 cursor-pointer duration-500 border-l-4 border-[#b39800]">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#b39800] rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 dark:text-black text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
                  <a 
                    href="mailto:gloriousapartments2025@gmail.com" 
                    className="text-[#b39800] font-medium hover:text-yellow-600 transition-colors break-all"
                  >
                    gloriousapartments2025@gmail.com
                  </a>
                  <p className="text-gray-500 mt-1">Quick response guaranteed</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:transform hover:scale-110 cursor-pointer duration-500 border-l-4 border-[#b39800]">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-[#b39800] rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-8 h-8 dark:text-black text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-[#b39800] font-medium text-lg">
                    Priscilla Oluwafemi Str
                  </p>
                  <p className="text-gray-600">
                    Asero Estate Extension (Kotogbo)<br />
                    Asero, Abeokuta
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all hover:transform hover:scale-110 cursor-pointer duration-500 border-l-4 border-[#b39800]">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#b39800] rounded-full flex items-center justify-center">
                  <Clock className="w-8 h-8 dark:text-black text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Availabilty</h3>
                  <p className="text-gray-600">Monday - Sunday</p>
                  <p className="text-[#b39800] font-medium text-lg">24/7 Support Available</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;