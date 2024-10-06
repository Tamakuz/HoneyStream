"use client";

import { useSearchParams } from 'next/navigation';
import MoviesList from './MoviesList';
import AnimesList from './AnimesList';

const HomeList = () => {
  const searchParams = useSearchParams();

  return searchParams.get("type") === "movie" ? <MoviesList /> : <AnimesList />;
}

export default HomeList