import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import logo from "@/app/favicon.ico"

function Nav() {
  return (
    <nav className="w-full h-[3.6rem] text-[#d4b502] dark:text-white shadow-md dark:border-b flex items-center justify-between px-10 text-[16px]">
          <Link href={`/`} className="flex items-center gap-2"> 
            <Image src={logo} alt="" height={28} width={30} className="shadow-md" />
            Glorious Appartment
          </Link>
          <div className="flex items-center gap-24">
            <Link href={'/'} className='hover:transform hover:scale-110 cursor-pointer transition-all duration-400 hover:border-b-2'>Home</Link>
            <Link href={'/services'} className='hover:transform hover:scale-110 cursor-pointer transition-all duration-400 hover:border-b-2'>Services</Link>
            <Link href={'/contact'} className='hover:transform hover:scale-110 cursor-pointer transition-all duration-400 hover:border-b-2'>Contact Us</Link>
          </div>
          <button>theme toggle</button>
        </nav>
    )
}

export default Nav