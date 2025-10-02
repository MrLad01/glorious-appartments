"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import logo from "@/app/favicon.ico"

function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Effect to handle body scroll when menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open')
    } else {
      document.body.classList.remove('mobile-menu-open')
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open')
    }
  }, [isMobileMenuOpen])
  
  // Intersection observer for nav
  const [navRef, navInView] = useInView({ triggerOnce: false, threshold: 0.1 })

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 150, 
        damping: 20, 
        duration: 0.6
      } 
    }
  }

  const bounceIn = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring" as const, 
        stiffness: 300, 
        damping: 10, 
        duration: 0.6
      } 
    }
  }

  const scaleHover = {
    hover: { 
      scale: 1.05, 
      transition: { 
        type: "spring", 
        stiffness: 200, 
        damping: 15 
      } 
    }
  }

  // Mobile menu animations
  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      y: -20,
      transition: {
        type: "spring" as const ,
        stiffness: 300,
        damping: 30
      }
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  }

  const mobileItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 25
      }
    }
  }

  const menuItems = [
    { href: '/', label: 'Home', delay: 0.4 },
    { href: '/services', label: 'Services', delay: 0.5 },
    { href: '/contact', label: 'Contact Us', delay: 0.6 }
  ]

  return (
    <>
      <style jsx global>{`
        @keyframes rotateGlobe {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        
        @keyframes rotateHighlight {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        .globe-rotate {
          animation: rotateGlobe 4s linear infinite;
        }
        
        .globe-rotate:hover {
          animation-duration: 1s;
        }
        
        .highlight-sweep {
          animation: rotateHighlight 3s linear infinite;
        }

        /* Hide scrollbar when mobile menu is open */
        .mobile-menu-open {
          overflow: hidden !important;
        }
      `}</style>
      
      <motion.nav
        ref={navRef}
        className={`w-full h-[3.6rem] text-[#d4b502] ${isMobileMenuOpen ? 'bg-white dark:bg-gray-900' : ''} dark:bg-gray-900 dark:text-white shadow-md dark:border-b flex items-center justify-between px-4 sm:px-6 lg:px-10 text-[16px] relative z-50 transition-colors duration-300`}
        initial="hidden"
        animate={navInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        {/* Logo Section */}
        <motion.div variants={fadeInUp} className="flex-shrink-0">
          <Link href={`/`} className="flex items-center gap-2 text-sm group"> 
            <motion.div 
              className="relative overflow-hidden rounded-full"
              whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
            >
              <Image 
                src={logo} 
                alt="" 
                height={28} 
                width={30} 
                className="shadow-md globe-rotate transition-transform duration-300 group-hover:scale-110" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 highlight-sweep"></div>
            </motion.div>
            <motion.span 
              className="font-light transition-all duration-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-300 hidden xs:block sm:block"
              variants={fadeInUp}
            >
              DE GLORIOUS HOMES LITE LTD
            </motion.span>
            <motion.span 
              className="font-light transition-all duration-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-300 block xs:hidden sm:hidden"
              variants={fadeInUp}
            >
              DE GLORIOUS HOMES LITE LTD
            </motion.span>
          </Link>
        </motion.div>
        
        {/* Desktop Navigation */}
        <motion.div 
          className="hidden lg:flex items-center gap-8 xl:gap-16"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {menuItems.map((item, index) => (
            <motion.div 
              key={index} 
              variants={bounceIn}
              transition={{ delay: item.delay }}
              whileHover={scaleHover}
            >
              <Link 
                href={item.href} 
                className="relative py-2 px-4 rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-yellow-600/10 hover:shadow-lg hover:shadow-yellow-400/20 group"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-300">
                  {item.label}
                </span>
                <div className="absolute bottom-0 left-1/2 h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile Hamburger Button */}
        <motion.button
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 group"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          variants={fadeInUp}
        >
          <motion.span 
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <motion.span 
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <motion.span 
            className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </motion.button>

        {/* Desktop Spacer */}
        <div className="hidden lg:block w-24"></div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl z-40 lg:hidden border-b dark:border-gray-700"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={mobileMenuVariants}
            >
              {/* Menu Header - Logo and X button area */}
              <div className="h-[3.6rem] flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                <Link href={`/`} className="flex items-center gap-2 text-sm group"> 
                  <motion.div 
                    className="relative overflow-hidden rounded-full"
                    whileHover={{ scale: 1.1, transition: { type: "spring", stiffness: 200, damping: 15 } }}
                  >
                    <Image 
                      src={logo} 
                      alt="" 
                      height={28} 
                      width={30} 
                      className="shadow-md globe-rotate transition-transform duration-300 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 highlight-sweep"></div>
                  </motion.div>
                  <span className="font-light transition-all duration-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-300 hidden xs:block sm:block text-[#d4b502] dark:text-white">
                    Glorious Apartment
                  </span>
                  <span className="font-light transition-all duration-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-300 block xs:hidden sm:hidden text-[#d4b502] dark:text-white">
                    GA
                  </span>
                </Link>
                
                <motion.button
                  className="flex flex-col justify-center items-center w-8 h-8 space-y-1 group text-[#d4b502] dark:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span className="block w-6 h-0.5 bg-current rotate-45 translate-y-1.5 transition-all duration-300" />
                  <motion.span className="block w-6 h-0.5 bg-current opacity-0 transition-all duration-300" />
                  <motion.span className="block w-6 h-0.5 bg-current -rotate-45 -translate-y-1.5 transition-all duration-300" />
                </motion.button>
              </div>
              
              {/* Menu Items */}
              <div className="px-4 py-6 space-y-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={mobileItemVariants}
                  >
                    <Link
                      href={item.href}
                      className="block py-3 px-4 rounded-lg text-lg font-medium text-[#d4b502] dark:text-white transition-all duration-300 hover:bg-gradient-to-r hover:from-yellow-400/10 hover:to-yellow-600/10 hover:text-yellow-400 dark:hover:text-yellow-300 hover:shadow-lg hover:shadow-yellow-400/20 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="flex items-center justify-between">
                        {item.label}
                        <motion.span
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          initial={{ x: -10 }}
                          whileHover={{ x: 0 }}
                        >
                          →
                        </motion.span>
                      </span>
                      <div className="h-0.5 w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full mt-1"></div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Nav