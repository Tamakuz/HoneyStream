'use client'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BlurImage from '../BlurImage'

interface Image {
  imageUrl: string | null
  resolution: string
}

interface CastMember {
  originalName: string
  characterName: string
  images: Image[]
}

interface CastMovieProps {
  cast: CastMember[]
  isLoading: boolean
}

const CastMovie: React.FC<CastMovieProps> = ({ cast, isLoading }) => {
  const [visibleCast, setVisibleCast] = React.useState(6)

  const renderCastMember = (member: CastMember, index: number) => (
    <div key={index} className="w-full transition-all duration-300 hover:scale-105">
      {member.images[1]?.imageUrl ? (
        <BlurImage
          src={member.images[1].imageUrl}
          alt={member.originalName}
          width={150}
          height={225}
          className="rounded-lg object-cover shadow-md w-full h-auto"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-background/80 rounded-lg flex items-center justify-center shadow-md">
          No Image
        </div>
      )}
      <p className="mt-2 font-semibold text-sm text-primary">{member.originalName}</p>
      <p className="text-sm text-muted-foreground">{member.characterName}</p>
    </div>
  )

  const renderSkeleton = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <div key={index} className="w-full">
          <Skeleton className="w-full aspect-[2/3] rounded-lg" />
          <Skeleton className="h-4 w-3/4 mt-2" />
          <Skeleton className="h-3 w-1/2 mt-1" />
        </div>
      ))}
    </>
  )

  return (
    <Card className="bg-gradient-to-br from-background/70 to-background/50 backdrop-blur-sm border-none shadow-lg">
      <CardHeader className="pb-2 px-0">
        <CardTitle className="text-xl font-semibold flex items-center gap-2 text-primary">
          <Users className="w-5 h-5 text-primary" />
          Cast
        </CardTitle>
      </CardHeader>
      <CardContent className="h-fit p-0">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading ? renderSkeleton() : cast?.slice(0, visibleCast).map(renderCastMember)}
        </div>
        {!isLoading && cast?.length > visibleCast && (
          <div className="mt-4 text-center">
            <Button
              variant="outline"
              onClick={() => setVisibleCast(prev => prev + 6)}
            >
              Load More
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default CastMovie