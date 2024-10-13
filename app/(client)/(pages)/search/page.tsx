"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from 'react-query';
import SidebarLayout from '../../components/SidebarLayout';
import DefaultLayout from '../../components/DefaultLayout';
import { getMovieSearch } from '../../service/movies.service';
import { getAnimeSearch } from '../../service/animes.service';
import CardMovie from '../../components/CardMovie';
import CardAnime from '../../components/CardAnime';
import { Skeleton } from '@/components/ui/skeleton';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const type = searchParams?.get('type') || 'movie';

  const { data, isLoading, error } = useQuery(
    ['search', query, type],
    () => type === 'movie' ? getMovieSearch(query) : getAnimeSearch(query),
    { enabled: !!query }
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="w-full aspect-[2/3]">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!data || !data.results) {
    return <div>No results found.</div>;
  }

  const items = data.results[type === 'movie' ? 'movies' : 'animes'] || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {items.map((item: any) => (
        type === 'movie' 
          ? <CardMovie key={item._id} data={item} isLoading={false} />
          : <CardAnime key={item._id} data={item} isLoading={false} />
      ))}
    </div>
  );
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';
  const type = searchParams?.get('type') || 'movie';

  return (
    <DefaultLayout>
      <SidebarLayout>
        <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
        <SearchResults />
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default SearchPage;