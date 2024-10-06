"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useQuery } from "react-query";
import { getBackdropsMoviesHero } from "../../service/movies.service";
import { Skeleton } from "@/components/ui/skeleton";
import BlurImage from "../BlurImage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CarouselHero = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useQuery({
    queryKey: ["moviesHero"],
    queryFn: () => getBackdropsMoviesHero(),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  });

  // if (searchParams.get("type") !== "movie") {
  //   return null;
  // }

  return (
    <Carousel
      plugins={[Autoplay({ delay: 5000 })]}
      opts={{ loop: true, align: "start" }}
      className="w-full mx-auto h-[60vh]"
    >
      <CarouselContent className="-ml-0">
        {data?.results.movies.map((movie: any, index: number) => (
          <CarouselItem key={index} className="h-full pl-0">
            <div className="h-[60vh] relative">
              <BlurImage
                src={movie.backdrop}
                alt={movie.title}
                width={10000}
                height={1000}
                className="object-cover"
              />
              <div className="z-10 absolute top-0 w-full h-full flex flex-col justify-between p-10">
                <p className="font-extrabold text-[48px]">
                  {movie.title}
                </p>
                <div className="flex justify-between px-20">
                  <Button
                    variant="outline"
                    className="bg-[#F9F9F9] hover:bg-[#F9F9F9] text-white font-bold w-[200px] h-[60px] shadow bg-opacity-20 hover:bg-opacity-20 text-2xl"
                  >
                    <Plus className="mr-2 h-6 w-6" />
                    Watchlist
                  </Button>
                  <Button
                    variant="default"
                    className="bg-primary hover:bg-PrimaryYellow text-black font-bold w-[200px] h-[60px] shadow text-2xl"
                  >
                    Watch Now
                  </Button>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute top-0 left-0 w-1/4 h-full bg-gradient-to-r from-black to-transparent"></div>
              <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-black to-transparent"></div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 w-14 h-14 rounded bg-foreground/20 hover:bg-foreground/40 text-primary border-none" />
      <CarouselNext className="right-3 w-14 h-14 rounded bg-foreground/20 hover:bg-foreground/40 text-primary border-none" />
    </Carousel>
  );
};

export default CarouselHero;
