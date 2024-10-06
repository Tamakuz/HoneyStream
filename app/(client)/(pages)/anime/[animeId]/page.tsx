"use client";
import AnimePlay from '@/app/(client)/components/anime/AnimePlay';
import InfoMovie from '@/app/(client)/components/anime/InfoAnime';
import DefaultLayout from '@/app/(client)/components/DefaultLayout';
import SidebarLayout from '@/app/(client)/components/SidebarLayout';
import { getAnimeDetail } from '@/app/(client)/service/animes.service';
import React from 'react'
import { useQuery } from 'react-query';

const AnimeStreamPage = ({ params }: { params: { animeId: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["anime", params.animeId],
    queryFn: () => getAnimeDetail(params.animeId),
    enabled: !!params.animeId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
  });

  return (
    <DefaultLayout>
      <SidebarLayout>
        <div className="py-4">
          <AnimePlay
            episodes={data?.results?.episodes}
            isLoading={isLoading}
          />
          <InfoMovie animeInfo={data?.results} isLoading={isLoading} />
        </div>
      </SidebarLayout>
    </DefaultLayout>
  );
}

export default AnimeStreamPage