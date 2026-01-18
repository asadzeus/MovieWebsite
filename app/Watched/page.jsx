"use client";
import { useMovies } from "@/app/context/MovieContext";
import MovieCard from "@/app/components/MovieCard";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default function Watched() {
  const { myList, toggleFavorite, loading } = useMovies();

  // Filmleri orijinal rank değerine göre küçükten büyüğe sıralıyoruz
  // Eğer rank yoksa (beklenmedik durum) en sona atar.
  const sortedByRank = [...myList].sort((a, b) => (a.rank || 999) - (b.rank || 999));

  if (loading) return (
    <div className="h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      <Navbar onSearch={() => {}} />

      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
              <span className="text-red-600 animate-pulse">❤</span> İZLEDİKLERİM
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Kalple işaretlediğin tüm filmler orijinal sıralamasına göre burada.
            </p>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-gray-400 shadow-inner">
            Koleksiyon: <span className="text-white">{myList.length}</span> Film
          </div>
        </header>

        {sortedByRank.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {sortedByRank.map((movie) => (
              <div key={movie.id} className="relative group transition-transform duration-300">
                <MovieCard 
                  movie={movie} 
                  onToggleFavorite={toggleFavorite}
                  isFavorite={true}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 bg-white/[0.02] rounded-[2rem] border border-dashed border-white/10">
            <div className="text-6xl mb-6 grayscale opacity-30">🎬</div>
            <h2 className="text-2xl font-bold uppercase tracking-tight text-gray-400">Henüz bir film eklenmedi</h2>
            <p className="text-gray-600 mt-2 mb-8 max-w-xs text-center text-sm">
              Birlikte izlediğiniz filmlere kalp atarak bu sayfayı canlandırabilirsin.
            </p>
            <Link 
              href="/" 
              className="bg-white text-black px-10 py-3 rounded-full font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all shadow-[0_10px_30px_rgba(255,255,255,0.1)] active:scale-95"
            >
              KEŞFETMEYE BAŞLA
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}