import React from 'react'
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Star, Calendar, Clock, Film, Tv, Users, Sun, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BlurImage from '../BlurImage';

interface Images {
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
}

interface Aired {
  from: string;
  to: string;
}

interface AlternativeTitle {
  type: string;
  title: string;
}

interface Genre {
  name: string;
  slug: string;
}

interface AnimeInfo {
  images: Images;
  aired: Aired;
  _id: string;
  title: string;
  synopsisID: string;
  synopsisEN: string;
  alternative_titles: AlternativeTitle[];
  type: string;
  source: string;
  status: string;
  airing: boolean;
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  popularity: number;
  season: string;
  year: number;
  studios: string[];
  genres: Genre[];
}

const InfoMovie: React.FC<{ animeInfo: AnimeInfo, isLoading: boolean }> = ({ animeInfo, isLoading }) => {
  if (isLoading) {
    return (
      <Card className="mt-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Skeleton className="w-40 h-60 rounded-lg" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-16 rounded-full" />
                ))}
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-6 w-20 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mt-4 bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative w-[200px] rounded-lg overflow-hidden shadow-lg">
          <div className="aspect-[2/3] relative">
            <BlurImage
              width={200}
              height={300}
              src={animeInfo.images.jpg.image_url}
              alt={animeInfo.title}
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1">
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 text-xs bg-black/50 backdrop-blur-md">
                <Star className="w-3 h-3 text-yellow-400" />
                {animeInfo.score}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 text-xs bg-black/50 backdrop-blur-md">
                <Calendar className="w-3 h-3 text-blue-400" />
                {new Date(animeInfo.aired.from).getFullYear()}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 text-xs bg-black/50 backdrop-blur-md">
                <Clock className="w-3 h-3 text-green-400" />
                {animeInfo.duration}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1 px-2 py-0.5 text-xs bg-black/50 backdrop-blur-md">
                {animeInfo.type === 'TV' ? <Tv className="w-3 h-3 text-purple-400" /> : <Film className="w-3 h-3 text-purple-400" />}
                {animeInfo.type}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <h1 className="text-2xl font-bold text-primary bg-clip-text bg-gradient-to-r from-primary to-primary-foreground">{animeInfo.title}</h1>
          <div className="h-fit pr-4">
            <p className="text-sm text-gray-300 leading-relaxed">{animeInfo.synopsisID || animeInfo.synopsisEN}</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {animeInfo.genres.slice(0, 5).map((genre) => (
              <Badge key={genre.slug} variant="outline" className="px-2 py-0.5 text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-200">{genre.name}</Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 bg-gradient-to-br from-background/60 to-background/40 p-4 rounded-lg backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-primary">Details</h3>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Status:</span> {animeInfo.status}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Source:</span> {animeInfo.source}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Film className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Studios:</span> {animeInfo.studios.join(', ')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Popularity:</span> {animeInfo.popularity}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 bg-gradient-to-br from-background/60 to-background/40 p-4 rounded-lg backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-primary">Ratings</h3>
              <div className="grid grid-cols-1 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Rating:</span> {animeInfo.rating}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Scored By:</span> {animeInfo.scored_by}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Season:</span> {animeInfo.season}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <p><span className="font-semibold text-primary">Year:</span> {animeInfo.year}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-background/40 p-4 rounded-lg backdrop-blur-sm">
            <h3 className="text-sm font-semibold text-primary mb-2">Alternative Titles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              {animeInfo.alternative_titles.map((title, index) => (
                <p key={index} className="text-xs"><span className="font-semibold text-primary">{title.type}:</span> {title.title}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InfoMovie