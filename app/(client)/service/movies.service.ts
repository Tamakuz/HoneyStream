import { client } from "../lib/hc";
export const getBackdropsMoviesHero = async () => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/movies/popular?api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  
  if (data.statusCode === 200 && data.status === "success") {
    const tmdbRequests = data.results.movies.map(async (movie: any) => {
      const tmdbRes = await fetch(`https://api.themoviedb.org/3/movie/${movie.tmdb_id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`);
      
      return tmdbRes.json();
    });

    const tmdbData = await Promise.all(tmdbRequests);
    
    const moviesWithBackdrops = data.results.movies.map((movie: any, index: number) => {
      const backdrop_path = tmdbData[index]?.backdrop_path;
      return {
        ...movie,
        backdrop: backdrop_path 
          ? `https://image.tmdb.org/t/p/original${backdrop_path}`
          : null // or a default image URL if you prefer
      };
    });
    
    return {
      ...data,
      results: {
        ...data.results,
        movies: moviesWithBackdrops
      }
    };
  }
  
  return data;
};

export const getHomeMovieList = async () => {
  const randomPage = Math.floor(Math.random() * 20) + 1;
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/movies/popular?page=${randomPage}&limit=40&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getMovieDiscover = async (page: number) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/movies/discover?page=${page}&limit=20&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getMoviePopular = async (page: number) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/movies/popular?page=${page}&limit=20&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getMovieTopRated = async (page: number) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/movies/top-rated?page=${page}&limit=20&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};
export const getMovieDetail = async (movieId: string) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/movie/${movieId}?api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};

export const getMovieSearch = async (query: string) => {
  const res = await fetch(`https://ripleystream.vercel.app/api/v1/search?query=${query}&type=movies&api_token=${process.env.NEXT_PUBLIC_RIPLEYSTREAM_API_TOKEN}`);
  const data = await res.json();
  return data;
};
export const getCommentsMovie = async (contentId: string) => {
  const res = await client.api.comment[':contentId'][':type'].$get({
    param: {
      contentId,
      type: 'movie'
    }
  })

  const data = await res.json()
  return data
};


