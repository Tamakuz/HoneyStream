"use client";
import React, { useRef, useEffect } from "react";
import BlurImage from "./BlurImage";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";
import ButtonAddWatchlist from "./ButtonAddWatchlist";

const CardTamplate = ({
  id,
  title,
  year,
  poster_url,
  type,
}: {
  id: string;
  title: string;
  year: string | number;
  poster_url: string;
  type: string;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const content = contentRef.current;

    if (!card || !content) return;

    gsap.set(content, { opacity: 0, y: 20 });

    const tl = gsap.timeline({ paused: true });

    tl.to(content, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" });

    const playAnimation = () => tl.play();
    const reverseAnimation = () => tl.reverse();

    card.addEventListener("mouseenter", playAnimation);
    card.addEventListener("mouseleave", reverseAnimation);

    return () => {
      card.removeEventListener("mouseenter", playAnimation);
      card.removeEventListener("mouseleave", reverseAnimation);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="w-full aspect-[2/3] relative group overflow-hidden rounded-lg shadow-lg"
    >
      <BlurImage
        src={poster_url}
        alt={title}
        className="transition-transform duration-300 group-hover:scale-110 w-full h-full object-cover"
      />
      <div
        ref={contentRef}
        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-between p-4"
      >
        <div className="mt-auto">
          <h3 className="text-white font-bold text-xl drop-shadow-md line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-white/90 text-sm font-medium drop-shadow">
            {year}
          </p>
        </div>
        <div className="flex gap-1 mt-4 w-full">
          <ButtonAddWatchlist contentId={id} type={type as 'movie' | 'anime'} />
          <Link href={`/${type}/${id}`} className="flex-grow">
            <Button
              variant="default"
              className="bg-primary w-full hover:bg-primary/90 text-white font-bold backdrop-blur-sm rounded-full transition-colors duration-300 flex items-center justify-center gap-1"
            >
              <Play className="h-4 w-4" /> Watch now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardTamplate;
