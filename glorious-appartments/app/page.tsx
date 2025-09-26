"use client"
import { Pause, Play, Book } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Intersection observers for each section
  const [heroRef, heroInView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [whyChooseRef, whyChooseInView] = useInView({ triggerOnce: false, threshold: 0.3 });
  const [contactRef, contactInView] = useInView({ triggerOnce: false, threshold: 0.3 });

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

  // Animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 40, 
        damping: 20, 
        duration: 1.2 
      } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  return (
    <div className="text-white min-h-screen dark:bg-gray-900">
      <div ref={heroRef} className="relative h-[90vh] overflow-hidden">
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
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
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
            <motion.div
              className="max-w-3xl"
              initial="hidden"
              animate={heroInView ? "visible" : "hidden"}
              variants={staggerContainer}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl text-yellow-400 font-bold leading-tight mb-6"
                variants={fadeInUp}
              >
                Welcome to Glorious Apartment
              </motion.h1>
              <motion.button
                className="inline-flex items-center px-8 py-4 rounded-sm cursor-pointer bg-transparent border-2 border-[#d4b502] text-[#d4b502] hover:bg-yellow-400 hover:text-black transition-all duration-300 font-bold"
                variants={fadeInUp}
                whileHover="hover"
                whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              >
                BOOK US NOW
                <Book className="ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {videoLoaded && !videoError && (
            <motion.div
              className="absolute bottom-8 left-8 flex items-center space-x-4 z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1.2 }}
            >
              <motion.button
                onClick={toggleVideo}
                className="p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
                whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </motion.button>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#d4b502]" />
                <span className="text-sm text-white/80">Video Playing</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!videoLoaded && !videoError && (
          <motion.div
            className="absolute bottom-8 left-8 z-10"
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1.2 }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-white/50 animate-pulse" />
              <span className="text-sm text-white/80">Loading video...</span>
            </div>
          </motion.div>
        )}
      </div>

      <section ref={servicesRef} className="py-20 bg-white dark:bg-gray-900 dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-[#d4b502] mb-4"
              variants={fadeInUp}
            >
              Our Premium Services
            </motion.h2>
            <motion.p
              className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Experience luxury and comfort with our fully equipped apartments and world-class amenities
            </motion.p>
          </motion.div>

          <div className="relative mb-16 overflow-hidden">
            <div className="flex animate-slide">
              {[img1, img2, img3, img4, img5, img6, img1, img2, img3].map((img, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 h-60 mx-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={servicesInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1.2 }}
                >
                  <img
                    src={img}
                    alt={`Apartment image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  />
                </motion.div>
              ))}
            </div>

            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10 dark:bg-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10 dark:bg-none"></div>
          </div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {[
              { title: "2 Bedroom Flat", icon: "2BR", description: "Spacious 2-bedroom apartments perfect for small families or professionals seeking comfort and style.", features: ["Fully equipped kitchen", "Modern amenities", "Secure parking space"] },
              { title: "3 Bedroom Flat", icon: "3BR", description: "Luxurious 3-bedroom apartments ideal for larger families who value space and premium living.", features: ["24hrs power supply", "CCTV surveillance", "Washing machine"] },
              { title: "Premium Amenities", icon: "★", description: "Experience top-tier amenities designed to make your stay comfortable and convenient.", features: ["Conducive environment", "Tight security", "Modern facilities"] }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="dark:bg-gray-700 dark:border-0 border shadow-md rounded-xl overflow-hidden"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              >
                <div className="h-48 bg-white dark:bg-gradient-to-br dark:from-[#d4b502]/20 dark:to-[#d4b502]/5 flex items-center justify-center dark:border-0 border-b border-gray-300">
                  <div className="text-center">
                    <motion.div
                      className="w-16 h-16 bg-[#d4b502] dark:bg-[#dcc752] rounded-full flex items-center justify-center mx-auto mb-4"
                      whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
                    >
                      <span className="text-2xl font-bold dark:text-black">{item.icon}</span>
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-700">{item.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="dark:text-gray-300 text-gray-600 mb-4">{item.description}</p>
                  <ul className="text-sm text-gray-400 space-y-1">
                    {item.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1.2 }}
          >
            <motion.button
              onClick={() => window.location.href = '/services'}
              className="inline-flex items-center rounded-lg px-8 py-4 bg-[#d4b502] dark:text-[#fcfbf7] font-bold hover:bg-yellow-300 transition-all duration-300"
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 200, damping: 15 } }}
            >
              VIEW ALL SERVICES
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>

      <section ref={whyChooseRef} className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-[#d4b502] mb-4"
              variants={fadeInUp}
            >
              Why Choose Glorious Apartment?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              We provide more than just accommodation - we offer a complete living experience
            </motion.p>
          </motion.div>

          <div className="relative mb-16 overflow-hidden">
            <div className="flex animate-slide">
              {[img1, img2, img3, img4, img5, img6, img1, img2, img3].map((img, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 w-80 h-60 mx-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={whyChooseInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1.2 }}
                >
                  <img
                    src={img}
                    alt={`Apartment image ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  />
                </motion.div>
              ))}
            </div>

            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10 dark:bg-none"></div>
            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10 dark:bg-none"></div>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate={whyChooseInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {[
              { title: "24/7 Power Supply", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />, description: "Uninterrupted power supply ensuring your comfort at all times" },
              { title: "Maximum Security", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />, description: "CCTV surveillance and tight security for your peace of mind" },
              { title: "Prime Location", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />, description: "Located in Asero Estate Extension, Abeokuta - a serene environment" },
              { title: "Premium Comfort", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />, description: "Fully equipped with modern amenities for your ultimate comfort" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center shadow-md group dark:bg-gray-700 px-2 py-8 rounded-lg"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              >
                <motion.div
                  className="w-20 h-20 bg-gradient-to-br from-[#d4b502] to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
                >
                  <svg className="w-10 h-10 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </motion.div>
                <h3 className="text-lg font-semibold dark:text-white text-gray-700 mb-3">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={contactRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl font-bold text-[#d4b502] mb-4"
              variants={fadeInUp}
            >
              Ready to Book Your Stay?
            </motion.h2>
            <motion.p
              className="text-xl text-gray-500 dark:text-white max-w-3xl mx-auto"
              variants={fadeInUp}
            >
              Contact us today to secure your premium apartment and experience luxury living at its finest
            </motion.p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={staggerContainer}
          >
            {[
              { title: "Call Us", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />, info: "+234 803 9636 839", subtext: "Available 24/7" },
              { title: "Email Us", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />, info: "gloriousapartments2025@gmail.com", subtext: "Quick response guaranteed" },
              { title: "Visit Us", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />, info: "Priscilla Oluwafemi Street", subtext: "Asero Estate Extension, Abeokuta" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center group shadow-md dark:bg-gray-700 px-1 py-8 rounded-lg"
                variants={fadeInUp}
                whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              >
                <motion.div
                  className="w-16 h-16 bg-[#d4b502] rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
                >
                  <svg className="w-8 h-8 dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {item.icon}
                  </svg>
                </motion.div>
                <h3 className="text-lg font-bold dark:text-white text-gray-700 mb-2">{item.title}</h3>
                <p className="text-[#d4b502] font-semibold text-sm break-all">{item.info}</p>
                <p className="text-sm text-gray-400 mt-1">{item.subtext}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1.2 }}
          >
            <motion.button
              onClick={() => window.location.href = '/contact'}
              className="inline-flex items-center px-10 py-4 bg-[#d4b502] dark:text-[#fcfbf7] font-bold text-lg hover:bg-yellow-300 transition-all duration-300 rounded-md shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 200, damping: 15 } }}
              whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 200, damping: 15 } }}
            >
              CONTACT US NOW
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
