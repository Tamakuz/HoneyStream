"use client";
import DefaultLayout from "../../components/DefaultLayout";
import SidebarLayout from "../../components/SidebarLayout";
import { useSession } from "next-auth/react";
import { useQuery } from "react-query";
import { Loader2 } from "lucide-react";
import CardTemplate from "../../components/CardTamplate";
import { getAnimeDetail } from "../../service/animes.service";
import { getMovieDetail } from "../../service/movies.service";
import AnimateList from "../../components/AnimateList";

const WatchlistPage = () => {
  const { data: session } = useSession();
  const { data: watchlist, isLoading } = useQuery({
    queryKey: ["watchlist", (session?.user as any)?.id],
    queryFn: async () => {
      try {
        const userWatchlist = (session?.user as any)?.watchlist || [];
        const res = await Promise.all(
          userWatchlist.map(async (item: { contentId: string; type: string }) => {
            let data;
            if (item.type === 'anime') {
              data = await getAnimeDetail(item.contentId);
            } else if (item.type === 'movie') {
              data = await getMovieDetail(item.contentId);
            } else {
              throw new Error(`Unknown content type: ${item.type}`);
            }
            return { ...data, type: item.type };
          })
        );
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },       
    enabled: !!session?.user,
  });

  const movieWatchlist = watchlist?.filter(item => item.type === 'movie') || [];
  const animeWatchlist = watchlist?.filter(item => item.type === 'anime') || [];

  return (
    <DefaultLayout>
      <SidebarLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">My Watchlist</h1>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : watchlist && watchlist.length > 0 ? (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Movies</h2>
                {movieWatchlist.length > 0 ? (
                  <AnimateList>
                    {movieWatchlist.map((item, index) => (
                      <CardTemplate
                        key={index}
                        id={item.results._id}
                        title={item.results.title}
                        year={item.results.year?.toString() || ''}
                        poster_url={item.results.poster[1].poster_url || ''}
                        type={item.type}
                      />
                    ))}
                  </AnimateList>
                ) : (
                  <p className="text-center text-gray-500">No movies in your watchlist.</p>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-4">Anime</h2>
                {animeWatchlist.length > 0 ? (
                  <AnimateList>
                    {animeWatchlist.map((item, index) => (
                      <CardTemplate
                        key={index}
                        id={item.results._id}
                        title={item.results.title}
                        year={item.results.year?.toString() || ''}
                        poster_url={item.results.images.jpg.image_url || ''}
                        type={item.type}
                      />
                    ))}
                  </AnimateList>
                ) : (
                  <p className="text-center text-gray-500">No anime in your watchlist.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500">
              Your watchlist is empty. Start adding some movies or anime!
            </p>
          )}
        </div>
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default WatchlistPage;
