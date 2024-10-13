'use client'

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus, Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { client } from "../lib/hc";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface ButtonAddWatchlistProps {
  contentId: string;
  type: 'movie' | 'anime';
}

const ButtonAddWatchlist = ({ contentId, type }: ButtonAddWatchlistProps) => {
  const {data: session, update} = useSession();
  const [isWatchlist, setIsWatchlist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userWatchlist = (session?.user as any)?.watchlist;
    if (Array.isArray(userWatchlist)) {
      const isInWatchlist = userWatchlist.some(item => 
        item.contentId === contentId && item.type === type
      );
      setIsWatchlist(isInWatchlist);
    }
  }, [session?.user, contentId, type]);

  const toggleWatchlist = async () => {
    if (!session?.user) {
      toast.error("Please login to add to watchlist");
      return;
    }

    setIsLoading(true);
    try {
      const res = await client.api.watchlist.$post({
        json: {
          contentId,
          type,
          userId: (session?.user as any)?.id as string,
        },
      });

      const data = (await res.json()) as { error?: string; message?: string };

      if (res.status === 400 || res.status === 500) {
        if (data.error) {
          toast.error(data.error);
        } else {
          toast.error("An error occurred");
        }
      } else {
        setIsWatchlist(true);
        if (data.message) {
          toast.success(data.message);
          update(() => {
            return {
              ...session?.user,
              watchlist: [...(session?.user as any)?.watchlist, contentId],
            };
          });
        } else {
          toast.success("Content added to watchlist");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleWatchlist}
      disabled={isLoading}
      className={cn(
        "backdrop-blur-sm rounded-full transition-all duration-300 aspect-square",
        isWatchlist
          ? "bg-green-500 hover:bg-green-600 rotate-12"
          : "bg-white/20 hover:bg-white/40"
      )}
    >
      {isLoading ? (
        <Loader2 className="h-2 w-2 sm:h-3 sm:w-3 md:h-5 md:w-5 text-white drop-shadow animate-spin" />
      ) : isWatchlist ? (
        <Check className="h-2 w-2 sm:h-3 sm:w-3 md:h-5 md:w-5 text-white drop-shadow" />
      ) : (
        <Plus className="h-2 w-2 sm:h-3 sm:w-3 md:h-5 md:w-5 text-white drop-shadow" />
      )}
    </Button>
  );
}

export default ButtonAddWatchlist