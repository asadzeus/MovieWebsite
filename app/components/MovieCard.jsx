import React from 'react';

const MovieCard = ({ movie, isFavorite, onToggleFavorite }) => {

  //console.log(movie)

  return (
    <a href={`/movie/${movie.id}`}>
    <div className="group relative bg-[#1a1a1a] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-yellow-500/10 border border-white/5">
      <div className="relative aspect-[2/3] overflow-hidden">
        <div className="absolute top-2 left-2 z-10 bg-yellow-500 text-black text-[10px] font-black px-2 py-1 rounded shadow-lg">
          #{movie.rank || rank}
        </div>
        <img
          src={movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/500x750?text=Resim+Yok'}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite(movie);
          }}
          className="absolute top-2 right-2 z-10 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:scale-110 transition-all group/btn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-colors duration-300 ${isFavorite ? 'fill-red-600 text-red-600' : 'text-white'}`}
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill={isFavorite ? "currentColor" : "none"}
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <p className="text-xs text-gray-300 line-clamp-3 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
            {movie.overview || "Film detayı bulunamadı."}
          </p>
        </div>
      </div>

      {/* Alt Bilgi */}
      <div className="p-4">

        <div className="alttop flex justify-between items-center w-full">
          <h3 className="text-white font-bold text-sm line-clamp-1 group-hover:text-yellow-500 transition-colors">
            {movie.title}
          </h3>

        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center bg-yellow-400/10 px-2 py-0.5 rounded">
            <span className="text-yellow-500 text-[10px] mr-1">★</span>
            <span className="text-yellow-500 text-xs font-bold">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>

          </div>
          <span className="text-gray-500 text-[11px]">
            {movie.release_date?.split('-')[0]}
          </span>
        </div>
      </div>
    </div>
    </a>
  );
};

export default MovieCard;