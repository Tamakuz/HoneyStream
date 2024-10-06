"use client";
import React from 'react'
import DefaultLayout from '../../components/DefaultLayout';
import SidebarLayout from '../../components/SidebarLayout';
import { useSearchParams } from 'next/navigation';
import MovieDiscoverList from '../../components/discover/MovieDiscoverList';
import AnimeDiscoverList from '../../components/discover/AnimeDiscoverList';

const DiscoverPage = () => {
  const searchParams = useSearchParams();
  return (
    <DefaultLayout>
      <SidebarLayout>
        {searchParams.get('type') === 'movie' ? <MovieDiscoverList /> : <AnimeDiscoverList />}
      </SidebarLayout>
    </DefaultLayout>
  );
}

export default DiscoverPage