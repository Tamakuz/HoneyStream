import { History } from "@/app/(server)/schema/user.schema";
import { useQuery } from "react-query";
import { getMovieDetail } from "../../service/movies.service";
import CardTemplate from "../CardTamplate";
import AnimateList from "../AnimateList";
import { Skeleton } from "@/components/ui/skeleton";

interface MovieHistoryListProps {
  history: History[]
}

const MovieHistoryList = ({ history }: MovieHistoryListProps) => {
  const { data: movieHistory, isLoading } = useQuery({
    queryKey: ["movieHistory", history],
    queryFn: async () => {
      try {
        const res = await Promise.all(
          history.map(async (item) => {
            const data = await getMovieDetail(item.contentId);
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
      <h1 className="text-3xl font-bold">Movie History</h1>
      {isLoading ? (
        <AnimateList>
          {[...Array(8)].map((_, index) => (
            <Skeleton key={index} className="h-[300px] w-full rounded-xl" />
          ))}
        </AnimateList>
      ) : movieHistory && movieHistory.length > 0 ? (
        <AnimateList>
          {movieHistory.map((item, index) => (
            <CardTemplate
              key={index}
              id={item.results._id}
              title={item.results.title}
              year={item.results.year?.toString() || ""}
              poster_url={item.results.poster[1].poster_url || ""}
              type="movie"
            />
          ))}
        </AnimateList>
      ) : (
        <p>No movies in your history.</p>
      )}
    </div>
  );
}

export default MovieHistoryList