"use client";
import React, { useRef, useEffect } from "react";
import BlurImage from "./BlurImage";
import { Button } from "@/components/ui/button";
import { Plus, Play } from "lucide-react";
import { gsap } from "gsap";
import Link from "next/link";

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
        layout="fill"
        objectFit="cover"
        className="transition-transform duration-300 group-hover:scale-110"
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
        <div className="flex justify-between items-center gap-3 mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full transition-colors duration-300"
          >
            <Plus className="h-5 w-5 text-white drop-shadow" />
          </Button>
          <Link href={`/${type}/${id}`}>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white grow font-bold backdrop-blur-sm rounded-full transition-colors duration-300 flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" /> Watch Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardTamplate;
