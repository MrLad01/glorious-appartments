import React from 'react';
import logo from "@/app/favicon.ico"
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#b39800] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-4">
              <Image src={logo} alt="" height={28} width={30} className="shadow-md" />
              <span className="ml-3 text-xl font-bold text-[#ffffff]">DE GLORIOUS HOMES LITE LTD</span>
            </div>
            <p className="text-sm text-[#ffffff]">
              Experience modern living with top-notch amenities.
            </p>
          </div>
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#ffffff] mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-[#ffffff] hover:text-[#d4b502] transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-[#ffffff] hover:text-[#d4b502] transition-colors">Services</Link></li>
              <li><Link href="/contact" className="text-[#ffffff] hover:text-[#d4b502] transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-[#ffffff] text-center text-[#ffffff] text-sm">
          <p>
            &copy; {new Date().getFullYear()} De Glorious Home Lite. All rights reserved. Designed with{' '}
            <span className="text-[#d4b502]">♥</span> in Abeokuta.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;