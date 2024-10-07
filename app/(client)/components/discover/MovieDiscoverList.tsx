"use client";
import { useInfiniteQuery } from "react-query";
import { getMovieDiscover } from "@/app/(client)/service/movies.service";
import CardMovie from "../CardMovie";
import { Skeleton } from "@/components/ui/skeleton";
import { useInView } from "react-intersection-observer";
import AnimateList from "../AnimateList";

const MovieDiscoverList = () => {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 1,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["movie-discover"],
      queryFn: ({ pageParam = 1 }) => getMovieDiscover(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.results.movies.length ? nextPage : undefined;
      },
      cacheTime: 5 * 60 * 1000,
    });

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="w-full aspect-[2/3]">
            <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Discover Movies</h1>
      <AnimateList data={data?.pages.map((page) => page.results.movies) || []}>
        {data?.pages.map((page, pageIndex) =>
          page.results.movies.map((movie: any, movieIndex: number) => (
            <CardMovie
              key={`${movie._id || movieIndex}-${pageIndex}`}
              data={movie}
              isLoading={false}
            />
          ))
        )}
      </AnimateList>
      <div ref={loadMoreRef} className="h-20 flex items-center justify-center">
        {isFetchingNextPage ? (
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        ) : hasNextPage ? (
          <button
            onClick={() => fetchNextPage()}
            className="px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Load More
          </button>
        ) : (
          <p className="text-gray-500">No more movies to load</p>
        )}
      </div>
    </div>
  );
};

export default MovieDiscoverList;