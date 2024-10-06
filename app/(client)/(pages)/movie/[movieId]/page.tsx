"use client";
import DefaultLayout from "@/app/(client)/components/DefaultLayout";
import AlternativeTitle from "@/app/(client)/components/movie/AlternativeTitle";
import CastMovie from "@/app/(client)/components/movie/CastMovie";
import InfoMovie from "@/app/(client)/components/movie/InfoMovie";
import MoviePlay from "@/app/(client)/components/movie/MoviePlay";
import SidebarLayout from "@/app/(client)/components/SidebarLayout";
import { getMovieDetail } from "@/app/(client)/service/movies.service";
import React from "react";
import { useQuery } from "react-query";

const MovieStreamPage = ({ params }: { params: { movieId: string } }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["movie", params.movieId],
    queryFn: () => getMovieDetail(params.movieId),
    enabled: !!params.movieId,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
  });

  // console.log(data);
  return (
    <DefaultLayout>
      <SidebarLayout>
        <div className="py-4">
          <MoviePlay
            urlStream={data?.results?.urlStream}
            isLoading={isLoading}
          />
          <InfoMovie movie={data?.results} isLoading={isLoading} />
          <AlternativeTitle titles={data?.results?.alternative_titles} />
          <CastMovie cast={data?.results?.cast} isLoading={isLoading} />
        </div>
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default MovieStreamPage;
