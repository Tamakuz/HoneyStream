"use client";

import React from "react";
import { useQuery } from "react-query";
import { getHomeMovieList } from "../../service/movies.service";
import CardMovie from "../CardMovie";
import { Skeleton } from "@/components/ui/skeleton";
import MovieHero from "./MovieHero";
import AnimateList from "../AnimateList";

const MoviesList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["homeMovieList"],
    queryFn: () => getHomeMovieList(),
    staleTime: Infinity, // Prevent refetching
    cacheTime: Infinity, // Keep the data in cache indefinitely
  });

  if (isLoading) {
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
      <MovieHero />
      <AnimateList data={data?.results.movies}>
        {data?.results.movies.map((movie: any, index: number) => (
          <CardMovie key={index} data={movie} isLoading={false} />
        ))}
      </AnimateList>
    </>
  );
};

export default MoviesList;
