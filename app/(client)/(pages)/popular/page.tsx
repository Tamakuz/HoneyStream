"use client";
import React, { Suspense } from 'react'
import DefaultLayout from '../../components/DefaultLayout';
import SidebarLayout from '../../components/SidebarLayout';
import { useSearchParams } from 'next/navigation';
import MoviePopularList from '../../components/popular/MoviePopularList';
import AnimePopularList from '../../components/popular/AnimePopularList';

const PopularContent = () => {
  const searchParams = useSearchParams();
  return searchParams.get('type') === 'movie' ? <MoviePopularList /> : <AnimePopularList />;
}

const PopularPage = () => {
  return (
    <DefaultLayout>
      <SidebarLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <PopularContent />
        </Suspense>
      </SidebarLayout>
    </DefaultLayout>
  )
}

export default PopularPage