"use client";
import React, { Suspense } from 'react'
import DefaultLayout from '../../components/DefaultLayout';
import SidebarLayout from '../../components/SidebarLayout';
import { useSearchParams } from 'next/navigation';
import MovieDiscoverList from '../../components/discover/MovieDiscoverList';
import AnimeDiscoverList from '../../components/discover/AnimeDiscoverList';

const DiscoverContent = () => {
  const searchParams = useSearchParams();
  return searchParams.get('type') === 'movie' ? <MovieDiscoverList /> : <AnimeDiscoverList />;
}

const DiscoverPage = () => {
  return (
    <DefaultLayout>
      <SidebarLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <DiscoverContent />
        </Suspense>
      </SidebarLayout>
    </DefaultLayout>
  );
}

export default DiscoverPage