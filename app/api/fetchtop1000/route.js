import { NextResponse } from 'next/server';

export async function GET() {
    // .env.local dosyasındaki değişkenleri alıyoruz
    const API_KEY = process.env.TMDB_API; 
    const ACCESS_TOKEN = process.env.TMDB_ACCESS;
    
    const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated';
    
    // Eğer API key yoksa hata döndürelim
    if (!API_KEY) {
        return NextResponse.json({ error: 'API Anahtarı bulunamadı (.env.local kontrol et)' }, { status: 500 });
    }

    try {
        const pageRequests = [];
        // Performans için ilk 5 sayfayı (100 film) çekiyoruz
        for (let i = 1; i <= 50; i++) {
            pageRequests.push(
                fetch(`${BASE_URL}?api_key=${API_KEY}&language=en-EN&page=${i}`, {
                    headers: {
                        // Eğer Access Token (Bearer) kullanmak istersen burası hazır:
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        'Content-Type': 'application/json'
                    },
                    // Verilerin her seferinde taze gelmesi için (isteğe bağlı)
                    next: { revalidate: 3600 } 
                }).then(res => res.json())
            );
        }

        const results = await Promise.all(pageRequests);
        const allMovies = results.flatMap(data => data.results || []);

        const uniqueMovies = Array.from(new Map(allMovies.map(movie => [movie.id, movie])).values());

        const rankedMovies = uniqueMovies.map((movie, index) => ({
            ...movie,
            rank: index + 1
        }));
                
        return NextResponse.json(rankedMovies);
    } catch (error) {
        console.error("API Hatası:", error);
        return NextResponse.json({ error: 'Veri çekilirken bir hata oluştu' }, { status: 500 });
    }
}