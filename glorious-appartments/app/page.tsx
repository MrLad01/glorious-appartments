import Image from "next/image";
import Link from "next/link";
import logo from "@/app/favicon.ico"

export default function Home() {
  return (
    <div className="font-sans min-h-screen">
      <main className="">
        <nav className="w-full h-[3.6rem] text-[#d4b502] dark:text-white shadow-md dark:border-b flex items-center justify-between px-10 text-[15px]">
          <Link href={`/`} className="flex items-center gap-2"> 
            <Image src={logo} alt="" height={28} width={30} className="shadow-md" />
            Glorious Appartment
          </Link>
          <div className="flex items-center">
            Links
          </div>
          <button>theme toggle</button>
        </nav>
        <div className="flex w-full h-[80vh] items-center justify-center"> 
          Video Carousel 
        </div>
        <div className="flex w-full h-[60vh] bg-[#d4b50205] items-center justify-center"> 
          Video Carousel 
        </div>
        <div className="flex w-full h-[60vh] items-center justify-center"> 
          Video Carousel 
        </div>
      </main>
      <footer className="">
      </footer>
    </div>
  );
}
