"use client"
import { useState } from "react";
import Link from "next/link"; // <a> yerine <Link> kullanmalısın

const Navbar = ({ onSearch }) => {
  const handleSearch = (val) => {
    // Bazı sayfalarda onSearch prop'u gönderilmemiş olabilir, hata almamak için:
    if (onSearch) onSearch(val);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md border-b border-white/10">
      {/* w-full yerine left-0 right-0 kullanımı ve 
         scroll-gutter (global css) ile kayma tamamen durur.
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo - Genişliği sabitleyerek ortanın kaymasını engelleriz */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center gap-1">
              <span className="text-2xl font-black tracking-tighter text-white group-hover:text-yellow-500 transition-colors uppercase">
                {/* Buraya sevgilinin adını yazıyorsun */}
                Hüda's <span className="text-yellow-500 group-hover:text-white transition-colors">Movies</span>
              </span>
              <span className="text-red-600 animate-pulse ml-1 text-xl">❤️</span>
            </Link>
          </div>

          {/* Navigasyon Linkleri - flex-1 ve justify-center ile ortaya sabitleyebiliriz */}
          <div className="hidden md:block flex-1">
            <div className="ml-10 flex items-baseline space-x-6">
              <Link href="/" className="text-white hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">Ana Sayfa</Link>
              <Link href="/RandomMovie" className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">Rastgele Film</Link>
              <Link href="/MyList" className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">Benim Listem</Link>
              <Link href="/Watched" className="text-gray-300 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">İzlediklerim</Link>

            </div>
          </div>

          {/* Arama Barı */}
          <div className="flex-shrink-0 flex items-center bg-gray-800/50 border border-white/10 px-3 py-1.5 rounded-full">
            <input
              type="text"
              placeholder="Film ara..."
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-transparent text-sm text-white outline-none w-32 lg:w-48 transition-all focus:w-40 lg:focus:w-60"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <span className="text-gray-300 flex justify-center items-center gap-2 hover:text-yellow-500 px-3 py-2 text-sm font-medium transition-colors">Por Me Amor
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-red-600 transition-transform duration-300 hover:scale-110"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;