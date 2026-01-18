"use client";
import { useEffect, useState } from "react";
import { useMovies } from "@/app/context/MovieContext";
import Navbar from "@/app/components/Navbar";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function MovieDetail() {
  const { id } = useParams();
  const { allMovies } = useMovies();
  const [movie, setMovie] = useState(null);
  const [userComment, setUserComment] = useState("");
  const [userRating, setUserRating] = useState(0);

  useEffect(() => {
    const foundMovie = allMovies.find(m => m.id.toString() === id);
    setMovie(foundMovie);

    const localData = JSON.parse(localStorage.getItem(`movie_review_${id}`) || "{}");
    setUserComment(localData.comment || "");
    setUserRating(localData.rating || 0);
  }, [id, allMovies]);

  const handleSaveReview = () => {
    localStorage.setItem(`movie_review_${id}`, JSON.stringify({ comment: userComment, rating: userRating }));
    toast.success("Notların başarıyla kaydedildi!", {
      icon: '🎬',
      duration: 3000
    });
  };

  if (!movie) return <div className="h-screen bg-black flex items-center justify-center text-yellow-500 animate-pulse font-bold">Yükleniyor...</div>;

  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20">
      <Navbar onSearch={() => { }} />

      {/* HERO SECTION */}
      <div className="relative h-[85vh] w-full">
        {/* Arka Plan Görseli */}
        <div className="absolute inset-0">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            className="w-full h-full object-cover opacity-40"
            alt=""
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        </div>

        {/* İçerik */}
        <div className="absolute inset-0 flex items-end px-6 md:px-20 pb-16">
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-end w-full">
            {/* Poster */}
            <div className="hidden md:block w-72 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl overflow-hidden border border-white/10 transform -rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>

            {/* Metinler */}
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-2 text-xs font-bold">
                <span className="bg-yellow-500 text-black px-2 py-1 rounded tracking-tighter uppercase">IMDb {movie.vote_average.toFixed(1)}</span>
                <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded uppercase">{movie.release_date.split('-')[0]}</span>
                <span className="bg-white/10 backdrop-blur-md px-2 py-1 rounded uppercase tracking-widest">{movie.original_language}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                {movie.title}
              </h1>
              <p className="text-gray-400 max-w-3xl text-lg leading-relaxed font-light italic">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* USER INTERACTION SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 -mt-10 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Kişisel Not Paneli */}
          <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-yellow-500">✎</span> Kişisel Notlarım
            </h3>
            <textarea
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="w-full bg-black/40 border border-white/5 rounded-2xl p-6 text-gray-200 outline-none focus:ring-2 focus:ring-yellow-500/50 transition-all resize-none mb-4 min-h-[150px]"
              placeholder="Film hakkındaki düşüncelerini buraya yaz..."
            />
            <button
              onClick={handleSaveReview}
              className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-black uppercase tracking-tighter hover:bg-yellow-400 hover:scale-105 active:scale-95 transition-all w-full md:w-auto"
            >
              İncelemeyi Kaydet
            </button>
          </div>

          {/* Puanlama Paneli */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl flex flex-col justify-center items-center text-center">
            <h3 className="text-xl font-bold mb-2">Senin Puanın</h3>
            <div className="text-6xl font-black text-yellow-500 mb-4 tracking-tighter">
              {userRating || "0"}<span className="text-2xl text-white/20">/10</span>
            </div>
            <input
              type="range" min="0" max="10" step="0.5"
              value={userRating}
              onChange={(e) => setUserRating(e.target.value)}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-yellow-500 mb-6"
            />
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">
              {userRating >= 8 ? "Efsane!" : userRating >= 5 ? "İzlenebilir" : "Kararsızım"}
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}