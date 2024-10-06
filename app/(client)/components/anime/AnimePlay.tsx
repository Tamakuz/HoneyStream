import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const AnimePlay = ({
  episodes,
  isLoading,
}: {
  episodes: Array<{ number_episode: string; sources: string }>;
  isLoading: boolean;
}) => {
  const [selectedEpisode, setSelectedEpisode] = useState(0);
  const [isChangingEpisode, setIsChangingEpisode] = useState(false);

  useEffect(() => {
    if (isChangingEpisode) {
      const timer = setTimeout(() => {
        setIsChangingEpisode(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isChangingEpisode]);

  const handleEpisodeChange = (index: number) => {
    setIsChangingEpisode(true);
    setSelectedEpisode(index);
  };

  const handlePreviousEpisode = () => {
    if (selectedEpisode < episodes?.length - 1) {
      handleEpisodeChange(selectedEpisode + 1);
    }
  };

  const handleNextEpisode = () => {
    if (selectedEpisode > 0) {
      handleEpisodeChange(selectedEpisode - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left side: Video player skeleton */}
          <div className="w-full lg:w-3/4">
            <Skeleton className="w-full aspect-video rounded-xl" />
            <div className="flex justify-between mt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>

          {/* Right side: Episodes list skeleton */}
          <div className="w-full lg:w-1/4">
            <Skeleton className="h-8 w-32 mb-4" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {[...Array(12)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-full aspect-square rounded-md flex flex-col items-center justify-center"
                >
                  <Skeleton className="h-4 w-4 mb-1 rounded-full" />
                  <Skeleton className="h-4 w-12" />
                </Skeleton>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side: Video player */}
        <div className="w-full lg:w-3/4">
          <div className="w-full aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden">
            {episodes && episodes?.length > 0 ? (
              <iframe
                src={episodes[selectedEpisode].sources}
                className="w-full h-full"
                allowFullScreen
                title={`Episode ${episodes[selectedEpisode].number_episode}`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-400 font-semibold">
                  No episodes available
                </p>
              </div>
            )}
          </div>
          {/* Episode navigation */}
          <div className="flex justify-between mt-4">
            <Button
              onClick={handlePreviousEpisode}
              disabled={
                selectedEpisode === episodes?.length - 1 ||
                isLoading ||
                isChangingEpisode
              }
              variant="outline"
              className="bg-background/80 hover:bg-background/60 text-primary hover:text-primary/90 transition-colors duration-300"
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button
              onClick={handleNextEpisode}
              disabled={selectedEpisode === 0 || isLoading || isChangingEpisode}
              variant="outline"
              className="bg-background/80 hover:bg-background/60 text-primary hover:text-primary/90 transition-colors duration-300"
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right side: Episodes list */}
        <div className="w-full lg:w-1/4">
          <h2 className="text-2xl font-bold mb-4 text-primary">Episodes</h2>
          <ScrollArea className="pr-4 h-[calc(100vh-16rem)]">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
              {episodes.map((episode, index) => (
                <Button
                  key={index}
                  variant={selectedEpisode === index ? "default" : "outline"}
                  className={cn(
                    "w-full aspect-square flex flex-col items-center justify-center text-center rounded-md transition-all duration-300",
                    selectedEpisode === index
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-background/80 hover:bg-background/60 hover:shadow-sm"
                  )}
                  onClick={() => handleEpisodeChange(index)}
                  disabled={isChangingEpisode}
                >
                  <Play className="h-4 w-4 mb-1" />
                  <span className="font-medium text-sm">
                    {episode.number_episode}
                  </span>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default AnimePlay;
