"use client"
import { Pause, Play, Book } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const img1 = "/image1.jpg";
  const img2 = "/image2.jpg";
  const img3 = "/image3.jpg";
  const img4 = "/image4.jpg";
  const img5 = "/image5.jpg";
  const img6 = "/image6.jpg";

  const apartmentVideos = [
    "/videos/Apartment3.mp4",
    "/videos/Apartment2.mp4",
  ];

  const [selectedVideo] = useState(() =>
    apartmentVideos[Math.floor(Math.random() * apartmentVideos.length)]
  );


  const handleVideoPlay = () => {
    setIsPlaying(true);
  };

  const handleVideoPause = () => {
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
    setVideoLoaded(false);
    console.log("Video failed to load:", selectedVideo);
  };

  const handleVideoLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
    console.log("Video loaded successfully:", selectedVideo);
  };

  const toggleVideo = () => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch(console.error);
      }
    }
  };


  useEffect(() => {
    const video = document.getElementById('hero-video') as HTMLVideoElement;
    if (video) {
      video.addEventListener('play', handleVideoPlay);
      video.addEventListener('pause', handleVideoPause);
      video.addEventListener('loadeddata', handleVideoLoaded);
      video.addEventListener('error', handleVideoError);

      return () => {
        video.removeEventListener('play', handleVideoPlay);
        video.removeEventListener('pause', handleVideoPause);
        video.removeEventListener('loadeddata', handleVideoLoaded);
        video.removeEventListener('error', handleVideoError);
      };
    }
  }, []);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes slide {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-2520px);
        }
      }
      
      .animate-slide {
        animation: slide 30s linear infinite;
      }
      
      .animate-slide:hover {
        animation-play-state: paused;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);


  return (
    <div className="text-white min-h-screen dark:bg-gray-900">
      <div className="relative h-[90vh] overflow-hidden">
        {/* Fallback background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/image2.jpg')"
          }}
        />

        {!videoError && (
          <video
            id="hero-video"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={handleVideoLoaded}
            onError={handleVideoError}
          >
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}

        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-yellow-400 font-bold leading-tight mb-6">
                Welcome to Glorious Apartment
              </h1>
              <button className="inline-flex items-center px-8 py-4 rounded-sm cursor-pointer bg-transparent border-2 border-[#d4b502] text-[#d4b502] hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold">
                BOOK US NOW
                <Book className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {videoLoaded && !videoError && (
          <div className="absolute bottom-8 left-8 flex items-center space-x-4 z-10">
            <button
              onClick={toggleVideo}
              className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#d4b502]" />
              <span className="text-sm text-white/80">Video Playing</span>
            </div>
          </div>
        )}

        {!videoLoaded && !videoError && (
          <div className="absolute bottom-8 left-8 z-10">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse" />
              <span className="text-sm text-white/80">Loading video...</span>
            </div>
          </div>
        )}
      </div>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#d4b502] mb-4">Our Premium Services</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Experience luxury and comfort with our fully equipped apartments and world-class amenities
            </p>
          </div>

          <div className="relative mb-16 overflow-hidden">
            <div className="flex animate-slide">
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img1}
                  alt="Luxury apartment interior"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img2}
                  alt="Modern bedroom design"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img3}
                  alt="Spacious living room"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img4}
                  alt="Fully equipped kitchen"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img5}
                  alt="Comfortable dining area"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img6}
                  alt="Premium apartment amenities"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              {/* Duplicate images for seamless loop */}
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img1}
                  alt="Luxury apartment interior"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img2}
                  alt="Modern bedroom design"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img3}
                  alt="Spacious living room"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </div>

            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="dark:bg-gray-700 dark:border-0 border shadow-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-48 bg-white dark:bg-gradient-to-br dark:from-[#d4b502]/20 dark:to-[#d4b502]/5 flex items-center justify-center dark:border-0 border-b border-gray-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold dark:text-black">2BR</span>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-700">2 Bedroom Flat</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="dark:text-gray-300 text-gray-600 mb-4">Spacious 2-bedroom apartments perfect for small families or professionals seeking comfort and style.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Fully equipped kitchen</li>
                  <li>• Modern amenities</li>
                  <li>• Secure parking space</li>
                </ul>
              </div>
            </div>

            <div className="dark:bg-gray-700 dark:border-0 border shadow-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-48 bg-white dark:bg-gradient-to-br dark:from-[#d4b502]/20 dark:to-[#d4b502]/5 flex items-center justify-center dark:border-0 border-b border-gray-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold dark:text-black">3BR</span>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-700">3 Bedroom Flat</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="dark:text-gray-300 text-gray-600 mb-4">Luxurious 3-bedroom apartments ideal for larger families who value space and premium living.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• 24hrs power supply</li>
                  <li>• CCTV surveillance</li>
                  <li>• Washing machine</li>
                </ul>
              </div>
            </div>

            <div className="dark:bg-gray-700 dark:border-0 border shadow-md rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-48 bg-white dark:bg-gradient-to-br dark:from-[#d4b502]/20 dark:to-[#d4b502]/5 flex items-center justify-center dark:border-0 border-b border-gray-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold dark:text-black">★</span>
                  </div>
                  <h3 className="text-xl font-bold dark:text-white text-gray-700">Premium Amenities</h3>
                </div>
              </div>
              <div className="p-6">
                <p className="dark:text-gray-300 text-gray-600 mb-4">Experience top-tier amenities designed to make your stay comfortable and convenient.</p>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Conducive environment</li>
                  <li>• Tight security</li>
                  <li>• Modern facilities</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.location.href = '/services'}
              className="inline-flex items-center rounded-lg px-8 py-4 bg-[#d4b502] dark:text-black font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105"
            >
              VIEW ALL SERVICES
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#d4b502] mb-4">Why Choose Glorious Apartment?</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              We provide more than just accommodation - we offer a complete living experience
            </p>
          </div>

          <div className="relative mb-16 overflow-hidden">
            <div className="flex animate-slide">
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img1}
                  alt="Luxury apartment interior"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img2}
                  alt="Modern bedroom design"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img3}
                  alt="Spacious living room"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img4}
                  alt="Fully equipped kitchen"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img5}
                  alt="Comfortable dining area"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img6}
                  alt="Premium apartment amenities"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              {/* Duplicate images for seamless loop */}
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img1}
                  alt="Luxury apartment interior"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img2}
                  alt="Modern bedroom design"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
              <div className="flex-shrink-0 w-80 h-60 mx-4">
                <img
                  src={img3}
                  alt="Spacious living room"
                  className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </div>

            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center shadow-md group dark:bg-gray-700 px-2 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4b502] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-3">24/7 Power Supply</h3>
              <p className="text-sm text-gray-400">Uninterrupted power supply ensuring your comfort at all times</p>
            </div>

            <div className="text-center shadow-md group dark:bg-gray-700 px-2 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4b502] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-3">Maximum Security</h3>
              <p className="text-sm text-gray-400">CCTV surveillance and tight security for your peace of mind</p>
            </div>

            <div className="text-center shadow-md group dark:bg-gray-700 px-2 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4b502] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-3">Prime Location</h3>
              <p className="text-sm text-gray-400">Located in Asero Estate Extension, Abeokuta - a serene environment</p>
            </div>

            <div className="text-center shadow-md group dark:bg-gray-700 px-2 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-[#d4b502] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-3">Premium Comfort</h3>
              <p className="text-sm text-gray-400">Fully equipped with modern amenities for your ultimate comfort</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#d4b502] mb-4">Ready to Book Your Stay?</h2>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto">
              Contact us today to secure your premium apartment and experience luxury living at its finest
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center group shadow-md dark:bg-gray-700 px-1 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold dark:text-white text-gray-700 mb-2">Call Us</h3>
              <p className="text-[#d4b502] font-semibold">+234 803 9636 839</p>
              <p className="text-sm text-gray-400 mt-1">Available 24/7</p>
            </div>

            <div className="text-center group shadow-md dark:bg-gray-700 px-1 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold dark:text-white text-gray-700 mb-2">Email Us</h3>
              <p className="text-[#d4b502] font-semibold text-sm break-all">gloriousapartments2025@gmail.com</p>
              <p className="text-sm text-gray-400 mt-1">Quick response guaranteed</p>
            </div>

            <div className="text-center group shadow-md dark:bg-gray-700 px-1 py-8 rounded-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold dark:text-white text-gray-700 mb-2">Visit Us</h3>
              <p className="text-[#d4b502] font-semibold text-sm">Priscilla Oluwafemi Street</p>
              <p className="text-sm text-gray-400">Asero Estate Extension, Abeokuta</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center px-10 py-4 bg-[#d4b502] dark:text-black font-bold text-lg hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 rounded-md shadow-lg hover:shadow-xl"
            >
              CONTACT US NOW
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}