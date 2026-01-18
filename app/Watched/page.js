"use client";
import { useMovies } from "@/app/context/MovieContext";
import MovieCard from "@/app/components/MovieCard";
import Navbar from "@/app/components/Navbar";
import Link from "next/link";

export default function MyList() {
  const { myList, toggleFavorite, loading } = useMovies();

  if (loading) return (
    <div className="h-screen bg-[#050505] flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-red-600/20 border-t-red-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#050505] text-white pt-24 pb-20">
      <Navbar onSearch={() => {}} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Üst Başlık Alanı */}
        <header className="mb-12 border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
              <span className="text-red-600">❤</span> İzlediklerim
            </h1>
            <p className="text-gray-500 mt-2 font-medium">
              Kalple işaretlediğin tüm filmler burada saklanır.
            </p>
          </div>
          <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-sm font-bold text-gray-400">
            Toplam <span className="text-white">{myList.length}</span> Film
          </div>
        </header>

        {myList.length > 0 ? (
          /* Film Izgarası */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {myList.map((movie) => (
              <div key={movie.id} className="relative">
                <MovieCard 
                  movie={movie} 
                  onToggleFavorite={toggleFavorite}
                  isFavorite={true} // Bu sayfadakiler zaten favori/izlendi
                />
              </div>
            ))}
          </div>
        ) : (
          /* Boş Liste Uyarısı */
          <div className="flex flex-col items-center justify-center py-40 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
            <div className="text-6xl mb-6 grayscale opacity-50">💔</div>
            <h2 className="text-2xl font-bold uppercase tracking-tight">Listen Boş Görünüyor</h2>
            <p className="text-gray-500 mt-2 mb-8 max-w-xs text-center">
              Henüz hiçbir filme kalp atmamışsın. Ana sayfaya dönüp keşfetmeye ne dersin?
            </p>
            <Link 
              href="/" 
              className="bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition-all shadow-xl"
            >
              Filmleri Keşfet
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}