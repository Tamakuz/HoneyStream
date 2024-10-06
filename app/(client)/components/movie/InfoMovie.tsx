import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Star, Calendar, DollarSign, TrendingUp } from 'lucide-react'
import Image from 'next/image'
import BlurImage from '../BlurImage'

interface Poster {
  poster_url: string;
  resolution: string;
}

interface Genre {
  name: string;
  slug: string;
}

interface UrlStream {
  urlStream: string;
  resolution: string;
}

interface Movie {
  _id: string;
  title: string;
  tagline: string;
  status: string;
  revenue: number;
  release_date: string;
  poster: Poster[];
  popularity: number;
  synopsisEN: string;
  synopsisID: string;
  imdb_id: string;
  tmdb_id: number;
  genres: Genre[];
  budget: number;
  urlStream: UrlStream[];
  createdAt: string;
  updatedAt: string;
  rating: number;
}

interface InfoMovieProps {
  movie: Movie;
  isLoading: boolean;
}

const InfoMovie = ({
  movie,
  isLoading,
}: InfoMovieProps) => {
  if (isLoading) {
    return (
      <div className="space-y-4 mt-6">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex space-x-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  const highestResPoster = movie?.poster.reduce((prev, current) => {
    const prevRes = parseInt(prev.resolution.split('x')[0]);
    const currentRes = parseInt(current.resolution.split('x')[0]);
    return currentRes > prevRes ? current : prev;
  });

  return (
    <div className="flex gap-6 mt-6">
      <div className="flex-shrink-0 w-64">
        {highestResPoster && (
          <BlurImage
            src={highestResPoster.poster_url}
            alt={movie?.title}
            width={256}
            height={384}
            className="rounded-lg shadow-lg"
          />
        )}
      </div>
      <div className="space-y-4 flex-grow">
        <h1 className="text-3xl font-bold">{movie?.title}</h1>
        <p className="text-lg text-muted-foreground italic">{movie?.tagline}</p>
        <div className="flex flex-wrap gap-2">
          {movie?.genres.map((genre) => (
            <Badge key={genre.slug} variant="secondary">{genre.name}</Badge>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-4 h-4" />
            <span>{movie?.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1 text-blue-400">
            <Calendar className="w-4 h-4" />
            <span>{new Date(movie?.release_date).getFullYear()}</span>
          </div>
          <div className="flex items-center gap-1 text-green-400">
            <DollarSign className="w-4 h-4" />
            <span>${(movie?.revenue / 1000000).toFixed(1)}M</span>
          </div>
          <div className="flex items-center gap-1 text-purple-400">
            <TrendingUp className="w-4 h-4" />
            <span>{movie?.popularity.toFixed(0)}</span>
          </div>
        </div>
        <p className="text-sm leading-relaxed">{movie?.synopsisID && movie.synopsisID !== '' ? movie.synopsisID : movie?.synopsisEN}</p>
      </div>
    </div>
  );
};

export default InfoMovie