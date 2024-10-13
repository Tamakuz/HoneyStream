import React from "react";
import { useQuery } from "react-query";
import {
  getBackdropsAnimeHero,
  getHomeAnimeList,
} from "../../service/animes.service";
import { Skeleton } from "@/components/ui/skeleton";
import CardAnime from "../CardAnime";
import AnimeHero from "./AnimeHero";
import AnimateList from "../AnimateList";
const AnimesList = () => {
  const { data: animeList, isLoading: isLoadingAnimeList } = useQuery({
    queryKey: ["homeAnimeList"],
    queryFn: () => getHomeAnimeList(),
    staleTime: Infinity, // Prevent refetching
    cacheTime: Infinity, // Keep the data in cache indefinitely
  });

  const { data: animeHero, isLoading: isLoadingAnimeHero } = useQuery({
    queryKey: ["animeHero"],
    queryFn: () => getBackdropsAnimeHero(),
    staleTime: Infinity, // Prevent refetching
    cacheTime: Infinity,
  });

  if (isLoadingAnimeList || isLoadingAnimeHero) {
    return (
      <>
        <div className="h-[60vh] relative rounded-lg overflow-hidden">
          <Skeleton className="w-full h-full" />
          <div className="absolute z-10 top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex gap-4 p-4">
            <Skeleton className="w-[250px] h-[375px] rounded-lg" />
            <div className="flex-1">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-6 w-1/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-10 w-1/3" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4">
          {[...Array(20)].map((_, index) => (
            <div key={index} className="w-full aspect-[2/3]">
              <Skeleton className="w-full h-full rounded-lg" />
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <AnimeHero anime={animeHero?.results.animes[0]} />
      <AnimateList data={animeList?.results.animes}>
        {animeList?.results.animes.map((anime: any, index: number) => (
          <CardAnime key={index} data={anime} isLoading={false} />
        ))}
      </AnimateList>
    </>
  );
};

export default AnimesList;
