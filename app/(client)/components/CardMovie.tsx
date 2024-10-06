import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import BlurImage from "./BlurImage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CardTamplate from "./CardTamplate";

interface MovieData {
  _id: string;
  title: string;
  release_date: string;
  poster: Array<{
    poster_url: string;
    resolution: string;
  }>;
  rating: number;
}

const CardPoster = ({
  data,
  isLoading,
}: {
  data: MovieData;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-[2/3]">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    );
  }

  const posterUrl =
    data.poster.find((p) => p.resolution === "500w")?.poster_url ||
    data.poster[0].poster_url;

  return (
    <>
      <CardTamplate
        id={data._id}
        title={data.title}
        year={new Date(data.release_date).getFullYear().toString()}
        poster_url={posterUrl}
        type="movie"
      />
    </>
  );
};

export default CardPoster;
