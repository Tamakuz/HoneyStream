"use client";
import DefaultLayout from "@/app/(client)/components/DefaultLayout";
import AlternativeTitle from "@/app/(client)/components/movie/AlternativeTitle";
import CastMovie from "@/app/(client)/components/movie/CastMovie";
import InfoMovie from "@/app/(client)/components/movie/InfoMovie";
import MoviePlay from "@/app/(client)/components/movie/MoviePlay";
import SidebarLayout from "@/app/(client)/components/SidebarLayout";
import { getMovieDetail } from "@/app/(client)/service/movies.service";
import { useSession } from "next-auth/react";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { client } from "@/app/(client)/lib/hc";
import CommentMovie from "@/app/(client)/components/movie/CommentMovie";

const MovieStreamPage = ({ params }: { params: { movieId: string } }) => {
  const { data: session, update } = useSession();

  const postHistoryMutation = useMutation(async () => {
    if ((session?.user as any)?.id) {
      try {
        await client.api.history.$post({
          json: {
            userId: (session?.user as any).id,
            contentId: params.movieId,
            type: "movie",
          },
        });

        update(() => {
          return {
            ...session?.user,
            watchlist: [...(session?.user as any)?.watchlist, params.movieId],
          };
        });
      } catch (error) {
        console.error(error);
      }
    }
  });
  
  const { data, isLoading } = useQuery({
    queryKey: ["movie", params.movieId],
    queryFn: () => getMovieDetail(params.movieId),
    onSuccess: () => {
      postHistoryMutation.mutate();
    },
    enabled: !!params.movieId,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    cacheTime: Infinity,
  });

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
          <CommentMovie contentId={params.movieId} />
        </div>
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default MovieStreamPage;
