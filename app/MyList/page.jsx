"use client";
import { useState } from "react";
import { useMovies } from "@/app/context/MovieContext";
import Navbar from "@/app/components/Navbar";

export default function MyTopList() {
  const { allMovies, myTopList, addToTopList, removeFromTopList, updateTopListRank } = useMovies();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = searchQuery 
    ? allMovies.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 8)
    : [];

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20 px-6">
      <Navbar />

      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-yellow-500 uppercase">Kişisel En İyilerim</h1>
            <p className="text-gray-500 text-sm font-medium">Sıralamayı değiştirince diğer filmler otomatik kayar.</p>
          </div>
          <button 
            onClick={() => setIsOverlayOpen(true)}
            className="bg-white text-black font-black px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all flex items-center gap-2 shadow-lg active:scale-95"
          >
            <span>+</span> FİLM EKLE
          </button>
        </header>

        {/* Sıralı Liste */}
        <div className="space-y-4">
          {myTopList.map((movie) => (
            <div key={movie.id} className="flex items-center gap-6 bg-[#111] p-4 rounded-2xl border border-white/5 group hover:border-yellow-500/30 transition-all">
              <input 
                type="number" 
                value={movie.userRank}
                onChange={(e) => updateTopListRank(movie.id, e.target.value)}
                className="w-14 h-14 bg-black border-2 border-yellow-500/20 rounded-xl text-center text-xl font-black text-yellow-500 outline-none focus:border-yellow-500 transition-all"
              />
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="w-16 h-24 object-cover rounded-xl shadow-2xl" alt="" />
              <div className="flex-1">
                <h3 className="text-xl font-bold uppercase tracking-tighter">{movie.title}</h3>
                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">IMDb {movie.vote_average.toFixed(1)}</p>
              </div>
              <button 
                onClick={() => removeFromTopList(movie.id)} 
                className="opacity-0 cursor-pointer group-hover:opacity-100 p-3 text-gray-500 hover:text-red-500 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Ekleme Overlay */}
        {isOverlayOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsOverlayOpen(false)} />
            
            <div className="relative bg-[#111] w-full max-w-2xl p-8 rounded-[2.5rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.9)]">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tighter">Listene Ekle</h2>
                <button onClick={() => setIsOverlayOpen(false)} className="text-gray-500 hover:text-white text-2xl">×</button>
              </div>

              <input 
                autoFocus
                type="text"
                placeholder="Hangi filmi arıyorsun?"
                className="w-full bg-black border border-white/5 p-5 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all mb-8 text-lg"
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Arama Sonuçları Alanı */}
              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {searchResults.map(movie => (
                  <div 
                    key={movie.id} 
                    onClick={() => { addToTopList(movie); setIsOverlayOpen(false); setSearchQuery(""); }}
                    className="flex items-center gap-5 p-4 bg-white/[0.02] hover:bg-yellow-500 rounded-2xl cursor-pointer transition-all group border border-white/5 hover:border-transparent"
                  >
                    {/* Resim ve Metin Arasındaki Boşluk gap-5 ile sağlandı */}
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="w-14 h-20 object-cover rounded-lg shadow-lg" alt="" />
                    <div className="flex-1">
                        <div className="font-black text-md uppercase tracking-tight group-hover:text-black transition-colors">{movie.title}</div>
                        <div className="text-xs text-gray-500 group-hover:text-black/60 font-bold uppercase">{movie.release_date?.split('-')[0]}</div>
                    </div>
                    <div className="bg-white/5 group-hover:bg-black/20 px-4 py-2 rounded-xl text-[10px] font-black group-hover:text-black transition-all">
                        EKLE
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}