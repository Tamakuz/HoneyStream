import { Skeleton } from '@/components/ui/skeleton';
import React from 'react'
import CardTamplate from './CardTamplate';

interface AnimeData {
  _id: string;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  year: number;
}

const CardAnime = ({
  data,
  isLoading,
}: {
  data: AnimeData;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="w-full aspect-[2/3]">
        <Skeleton className="w-full h-full rounded-lg" />
      </div>
    );
  }

  const posterUrl = data.images.jpg.image_url;

  return (
    <>
      <CardTamplate
        id={data._id}
        title={data.title}
        year={data?.year}
        poster_url={posterUrl}
        type="anime"
      />
    </>
  );
};

export default CardAnime