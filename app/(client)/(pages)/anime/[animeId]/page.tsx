"use client";
import AnimePlay from '@/app/(client)/components/anime/AnimePlay';
import InfoMovie from '@/app/(client)/components/anime/InfoAnime';
import DefaultLayout from '@/app/(client)/components/DefaultLayout';
import SidebarLayout from '@/app/(client)/components/SidebarLayout';
import { getAnimeDetail } from '@/app/(client)/service/animes.service';
import { useQuery, useMutation } from 'react-query';
import { useSession } from 'next-auth/react';
import { client } from '@/app/(client)/lib/hc';
import CommentAnime from '@/app/(client)/components/anime/CommentAnime';

const AnimeStreamPage = ({ params }: { params: { animeId: string } }) => {
  const { data: session, update } = useSession();

  const postHistoryMutation = useMutation(
    async () => {
      if ((session?.user as any)?.id) {
        try {
          await client.api.history.$post({
            json: {
              userId: (session?.user as any).id,
              contentId: params.animeId,
              type: "anime",
            },
          });

          update(() => {
            return {
              ...session?.user,
              watchlist: [...(session?.user as any)?.watchlist, params.animeId],
            };
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
  );

  const { data, isLoading } = useQuery({
    queryKey: ["anime", params.animeId],
    queryFn: () => getAnimeDetail(params.animeId),
    onSuccess: () => {
      postHistoryMutation.mutate();
    },
    enabled: !!params.animeId,
    refetchOnWindowFocus: false,
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
          <CommentAnime contentId={params.animeId} />
        </div>
      </SidebarLayout>
    </DefaultLayout>
  );
}

export default AnimeStreamPage