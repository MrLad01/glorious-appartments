"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import logo from "@/app/favicon.ico"

function Nav() {
  // Intersection observer for nav
  const [navRef, navInView] = useInView({ triggerOnce: false, threshold: 0.3 })

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
        duration: 1.2 
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
        duration: 1.2 
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
      `}</style>
      
      <motion.nav
        ref={navRef}
        className="w-full h-[3.6rem] text-[#d4b502] dark:text-white shadow-md dark:border-b flex items-center justify-between px-10 text-[16px]"
        initial="hidden"
        animate={navInView ? "visible" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.3
            }
          }
        }}
      >
        <motion.div variants={fadeInUp}>
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
              {/* Globe-like rotating highlight */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 highlight-sweep"></div>
            </motion.div>
            <motion.span 
              className="font-light transition-all duration-300 group-hover:text-yellow-400 dark:group-hover:text-yellow-300"
              variants={fadeInUp}
            >
              Glorious Apartment
            </motion.span>
          </Link>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-8 md:gap-16 lg:gap-24"
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
          {[
            { href: '/', label: 'Home', delay: 0.4 },
            { href: '/services', label: 'Services', delay: 0.5 },
            { href: '/contact', label: 'Contact Us', delay: 0.6 }
          ].map((item, index) => (
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
        
        <div className="w-24"></div> {/* Spacer to balance the layout */}
        {/* <button>theme toggle</button> */}
      </motion.nav>
    </>
  )
}

export default Nav