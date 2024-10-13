import { History } from "@/app/(server)/schema/user.schema";
import { useQuery } from "react-query";
import { getAnimeDetail } from "../../service/animes.service";
import CardTemplate from "../CardTamplate";
import AnimateList from "../AnimateList";
import { Skeleton } from "@/components/ui/skeleton";

interface AnimeHistoryListProps {
  history: History[]
}

const AnimeHistoryList = ({ history }: AnimeHistoryListProps) => {
  const { data: animeHistory, isLoading } = useQuery({
    queryKey: ["animeHistory", history],
    queryFn: async () => {
      try {
        const res = await Promise.all(
          history.map(async (item) => {
            const data = await getAnimeDetail(item.contentId);
            return { ...data, visitedAt: item.visitedAt };
          })
        );
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    enabled: !!history.length,
  });

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Anime History</h1>
      {isLoading ? (
        <AnimateList>
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
          ))}
        </AnimateList>
      ) : animeHistory && animeHistory.length > 0 ? (
        <AnimateList>
          {animeHistory.map((item, index) => (
            <CardTemplate
              key={index}
              id={item.results._id}
              title={item.results.title}
              year={item.results.year?.toString() || ""}
              poster_url={item.results.images.jpg.image_url || ""}
              type={item.type}
            />
          ))}
        </AnimateList>
      ) : (
        <p>No anime in your history.</p>
      )}
    </div>
  );
}

export default AnimeHistoryList