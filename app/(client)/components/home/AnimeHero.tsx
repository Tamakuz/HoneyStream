"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import BlurImage from "../BlurImage";
import { Play, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimeHero = ({ anime }: { anime: any }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);
  const buttonsRef = useRef(null);
  const synopsisRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const image = imageRef.current;
    const title = titleRef.current;
    const info = infoRef.current;
    const buttons = buttonsRef.current;
    const synopsis = synopsisRef.current;

    gsap.set([hero, content, image, title, info, buttons, synopsis], { opacity: 0 });
    gsap.set(content, { y: 50 });
    gsap.set(image, { x: -50 });
    gsap.set([title, info, buttons, synopsis], { y: 20 });

    const tl = gsap.timeline();

    tl.to(hero, {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    })
      .to(image, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .to(content, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      }, "-=0.5")
      .to([title, info, buttons, synopsis], {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.3");

    return () => {
      tl.kill();
    };
  }, [anime]);

  return (
    <div ref={heroRef} className="h-[60vh] relative rounded-lg overflow-hidden">
      <BlurImage
        src={anime?.images.webp.image_url}
        alt={anime?.title}
        width={10000}
        height={1000}
        className="object-cover"
      />
      <div className="absolute z-10 top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm flex gap-4 p-4">
        <div ref={imageRef}>
          <BlurImage
            src={anime?.images.webp.image_url || anime?.images.jpg.image_url}
            alt={anime?.title}
            width={270}
            height={375}
            className="object-cover rounded-lg shadow-lg aspect-[2/3]"
          />
        </div>
        <div ref={contentRef} className="h-fit">
          <h1 ref={titleRef} className="text-2xl font-bold dark:text-white text-black">
            {anime?.title}{" "}
            <span className="text-gray-400">({anime?.year})</span>
          </h1>
          <div ref={infoRef} className="flex flex-wrap items-center mt-4 space-x-4">
            <div className="flex items-center">
              <span
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className:
                    "text-xs font-bold rounded-full mr-2 border-white/20 text-white",
                })}
              >
                {anime?.rating.split(" - ")[0]}
              </span>
              <p className="text-sm font-medium text-white/80">
                {anime?.rating.split(" - ")[1]}
              </p>
            </div>
            <div className="flex items-center">
              <span
                className={buttonVariants({
                  variant: "outline",
                  size: "sm",
                  className:
                    "text-xs font-bold rounded-full mr-2 border-primary text-primary",
                })}
              >
                {anime?.score.toFixed(1)}
              </span>
              <p className="text-sm font-medium text-white/80">Score</p>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-medium text-white/80">
                {anime?.type} • {anime?.episodes} episodes
              </span>
            </div>
          </div>
          <div ref={buttonsRef} className="mt-6 flex gap-4">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-black font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center"
            >
              <Play className="mr-2 h-4 w-4" />
              Watch Now
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2 rounded-full shadow-lg transition-all duration-300 flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Watchlist
            </Button>
          </div>
          <div ref={synopsisRef} className="mt-6 max-w-2xl">
            <h2 className="text-xl font-semibold text-white mb-2">Synopsis</h2>
            <p className="text-sm text-white/80 line-clamp-3 hover:line-clamp-none transition-all duration-300">
              {anime?.synopsisID}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeHero;
