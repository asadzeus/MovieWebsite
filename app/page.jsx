"use client";
import { useState, useEffect } from 'react';
import { useMovies } from "@/app/context/MovieContext"; // Context'i bağladık
import Navbar from './components/Navbar';
import MovieCard from './components/MovieCard';

export default function Home() {
  // Context'ten ihtiyacımız olanları çekiyoruz
  const { allMovies, toggleFavorite, myList, loading } = useMovies();
  
  // Arama için yine yerel bir state kullanıyoruz (ekrandaki listeyi yönetmek için)
  const [filteredMovies, setFilteredMovies] = useState([]); 
  const [searchTerm, setSearchTerm] = useState("");

  // allMovies yüklendiğinde filteredMovies'i doldur
  useEffect(() => {
    if (allMovies) {
      setFilteredMovies(allMovies);
    }
  }, [allMovies]);

  const handleSearch = (query) => {
    setSearchTerm(query);
    const filtered = allMovies.filter(movie => 
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
      <div className="text-yellow-500 text-xl font-bold animate-pulse">Filmler Yükleniyor...</div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#0f0f0f]">
      <Navbar onSearch={handleSearch} />
      
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        {/* Başlık ve Sonuç Sayısı */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-white text-3xl font-bold">Top 1000 Film</h1>
            <p className="text-gray-500 text-sm mt-1">En yüksek puanlı başyapıtlar</p>
          </div>
          <div className="text-gray-400 text-sm">
            {filteredMovies.length} film gösteriliyor
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {filteredMovies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              rank={index + 1} // Sıralama numarası (1'den başlar)
              onToggleFavorite={toggleFavorite}
              isFavorite={myList.some(m => m.id === movie.id)}
            />
          ))}
        </div>
        
        {/* Arama Sonucu Boşsa */}
        {filteredMovies.length === 0 && (
          <div className="text-white text-center mt-20">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-xl opacity-50">"{searchTerm}" ile eşleşen bir film bulunamadı.</p>
            <button 
              onClick={() => handleSearch("")} 
              className="mt-4 text-yellow-500 hover:underline"
            >
              Aramayı temizle
            </button>
          </div>
        )}
      </div>
    </main>
  );
}