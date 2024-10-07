"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { placeholderBlurhash } from "../lib/placeholderBlurhash";
import { gsap } from "gsap";

interface BlurImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export default function BlurImage({ src, alt, className, ...props }: BlurImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const tl = gsap.timeline();

    const onLoad = () => {
      setIsLoading(false);
      tl.to(img, {
        filter: "blur(0px)",
        duration: 0.7,
        ease: "power2.out"
      });
    };

    img.style.filter = "blur(20px)";
    img.style.backgroundImage = `url(${placeholderBlurhash})`;
    img.style.backgroundSize = "cover";

    if (img.complete) {
      onLoad();
    } else {
      img.onload = onLoad;
    }

    return () => {
      img.onload = null;
    };
  }, [src]);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${placeholderBlurhash})`,
            filter: "blur(20px)"
          }}
        />
      )}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={cn(className, "transition-all duration-700 ease-in-out w-full h-full object-cover")}
        {...props}
      />
    </div>
  );
}
