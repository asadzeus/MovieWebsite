"use client";
import { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [allMovies, setAllMovies] = useState([]);
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Filmleri bir kere çek ve hafızaya al
    fetch('/api/fetchtop1000')
      .then(res => res.json())
      .then(data => {
        setAllMovies(data);
        setLoading(false);
      });

    // LocalStorage'dan listeyi yükle
    const savedList = JSON.parse(localStorage.getItem("myList") || "[]");
    setMyList(savedList);
  }, []);

  const toggleFavorite = (movie) => {
    const isExist = myList.find(m => m.id === movie.id);
    let updatedList = isExist 
      ? myList.filter(m => m.id !== movie.id) 
      : [...myList, movie];
    
    setMyList(updatedList);
    localStorage.setItem("myList", JSON.stringify(updatedList));
  };

  const updateUserRank = (movieId, newRank) => {
  const updatedList = myList.map(movie => 
    movie.id === movieId ? { ...movie, userRank: parseInt(newRank) } : movie
  );
  // Sıralamaya göre diziyi otomatik yeniden düzenle (Küçükten büyüğe)
  const sortedList = updatedList.sort((a, b) => (a.userRank || 999) - (b.userRank || 999));
  
  setMyList(sortedList);
  localStorage.setItem("myList", JSON.stringify(sortedList));
};

// MovieProvider içine ekle:
const [myTopList, setMyTopList] = useState([]);

useEffect(() => {
  const savedTopList = JSON.parse(localStorage.getItem("myTopList") || "[]");
  setMyTopList(savedTopList);
}, []);

const addToTopList = (movie) => {
  if (!myTopList.find(m => m.id === movie.id)) {
    const newList = [...myTopList, { ...movie, userRank: myTopList.length + 1 }];
    setMyTopList(newList);
    localStorage.setItem("myTopList", JSON.stringify(newList));
  }
};

const removeFromTopList = (id) => {
  const newList = myTopList.filter(m => m.id !== id);
  setMyTopList(newList);
  localStorage.setItem("myTopList", JSON.stringify(newList));
};

const updateTopListRank = (id, newRank) => {
  let targetRank = parseInt(newRank);
  if (isNaN(targetRank) || targetRank < 1) return;

  // 1. Önce listeyi kopyala ve değiştirdiğimiz filmle diğerlerini ayır
  let otherMovies = myTopList.filter(m => m.id !== id);
  const targetMovie = myTopList.find(m => m.id === id);

  // 2. Diğer filmleri mevcut sıralarına göre diz
  otherMovies.sort((a, b) => a.userRank - b.userRank);

  // 3. Araya yerleştirme (Splice mantığı)
  // Diğer filmlerin arasına yeni sırasına göre enjekte ediyoruz
  otherMovies.splice(targetRank - 1, 0, targetMovie);

  // 4. Tüm listeyi yeni indexlerine göre tekrar numaralandır (1, 2, 3...)
  const finalList = otherMovies.map((m, index) => ({
    ...m,
    userRank: index + 1
  }));

  setMyTopList(finalList);
  localStorage.setItem("myTopList", JSON.stringify(finalList));
};


  return (
    <MovieContext.Provider value={{ allMovies, myList, toggleFavorite, loading, updateUserRank, myTopList, addToTopList, removeFromTopList, updateTopListRank}}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => useContext(MovieContext);