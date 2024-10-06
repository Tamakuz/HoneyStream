"use client"
import { useState, useEffect } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

const MoviePlay = ({ urlStream, isLoading }: { urlStream: Array<{ urlStream: string; resolution: string }>; isLoading: boolean }) => {
  const [selectedServer, setSelectedServer] = useState(0)
  const [isChangingServer, setIsChangingServer] = useState(false)

  useEffect(() => {
    if (isChangingServer) {
      const timer = setTimeout(() => {
        setIsChangingServer(false)
      }, 1000) // Adjust this value to control how long the loading state lasts

      return () => clearTimeout(timer)
    }
  }, [isChangingServer])

  const handleServerChange = (index: number) => {
    setIsChangingServer(true)
    setSelectedServer(index)
  }

  return (
    <div className='w-full h-full'>
      <div className='aspect-video rounded-md mb-4'>
        {isLoading || isChangingServer ? (
          <Skeleton className='w-full h-full aspect-video' />
        ) : (
          <iframe src={urlStream?.[selectedServer]?.urlStream} frameBorder="0" allowFullScreen className='w-full h-full aspect-video' />
        )}
      </div>
      <div className='flex flex-wrap gap-2'>
        {urlStream?.map((server, index) => (
          <Button
            key={index}
            variant={selectedServer === index ? 'default' : 'outline'}
            onClick={() => handleServerChange(index)}
            disabled={isChangingServer}
          >
            Server {index + 1} ({server.resolution})
          </Button>
        ))}
      </div>
    </div>
  )
}

export default MoviePlay