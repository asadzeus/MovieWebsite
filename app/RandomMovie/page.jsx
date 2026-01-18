"use client";
import { useMovies } from "@/app/context/MovieContext";
import MovieCard from "@/app/components/MovieCard";
import Navbar from "@/app/components/Navbar";
import { useState } from "react";

export default function RandomMovie() {
  const { allMovies, toggleFavorite, myList, loading } = useMovies();
  const [randomMovie, setRandomMovie] = useState(null);

  const pickRandom = () => {
    if (allMovies && allMovies.length > 0) {
      const randomIndex = Math.floor(Math.random() * allMovies.length);
      setRandomMovie(allMovies[randomIndex]);
    }
  };

  // Gelişmiş Loading Ekranı
  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0f0f0f] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin mb-4"></div>
        <p className="text-yellow-500 font-bold tracking-widest text-xs uppercase">Veriler Hazırlanıyor</p>
      </div>
    );
  }

  return (
    <main className="h-screen w-full bg-[#0f0f0f] overflow-hidden flex flex-col">
      <Navbar onSearch={() => {}} />
      
      {/* Film Afişi Arka Planı (Opsiyonel Estetik Dokunuş) */}
      {randomMovie && (
        <div 
          className="absolute inset-0 opacity-10 blur-3xl transition-all duration-1000"
          style={{ 
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${randomMovie.poster_path})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-10 relative z-10">
        <div className="max-w-sm w-full text-center">
          <h1 className="text-white text-3xl font-black mb-2 tracking-tighter">NE İZLESEM?</h1>
          <p className="text-gray-500 text-sm mb-6 italic">Kararsız kaldığında senin için seçiyoruz.</p>
          
          <button 
            onClick={pickRandom}
            className="bg-yellow-500 text-black px-6 py-4 rounded-xl font-black hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] active:scale-95 mb-6 w-full uppercase tracking-tighter"
          >
            🎲 Rastgele Bir Film Getir
          </button>

          <div className="flex justify-center items-center">
            {randomMovie ? (
              <div className="w-[250px] transform transition-all animate-in fade-in zoom-in duration-500 shadow-2xl rounded-xl ring-1 ring-white/10">
                 <MovieCard 
                   movie={randomMovie} 
                   onToggleFavorite={toggleFavorite}
                   isFavorite={myList.some(m => m.id === randomMovie.id)}
                 />
              </div>
            ) : (
              <div className="w-[260px] h-[380px] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-600 space-y-4">
                <span className="text-4xl opacity-20">🎬</span>
                <p className="text-xs font-medium uppercase tracking-widest">Seçim yapmanı bekliyoruz</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}