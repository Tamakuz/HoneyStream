"use client";
import React from 'react'
import DefaultLayout from '../../components/DefaultLayout';
import SidebarLayout from '../../components/SidebarLayout';
import { useSearchParams } from 'next/navigation';
import MoviePopularList from '../../components/popular/MoviePopularList';
import AnimePopularList from '../../components/popular/AnimePopularList';


const PopularPage = () => {
  const searchParams = useSearchParams();
  return (
    <DefaultLayout>
      <SidebarLayout>
        {searchParams.get('type') === 'movie' ? <MoviePopularList /> : <AnimePopularList />}
      </SidebarLayout>
    </DefaultLayout>
  )
}

export default PopularPage