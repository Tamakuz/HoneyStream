"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const AnimateList = ({ children, data }: { children: React.ReactNode, data: unknown[] }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [prevDataLength, setPrevDataLength] = useState(0);

  useEffect(() => {
    if (data && listRef.current) {
      const newItemsCount = data.flat().length - prevDataLength;
      if (newItemsCount > 0) {
        const allItems = Array.from(listRef.current.children);
        const newItems = allItems.slice(-newItemsCount);
        gsap.fromTo(
          newItems,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.5,
            ease: "power3.out",
          }
        );
      }
      setPrevDataLength(data.flat().length);
    }
  }, [data, prevDataLength]);

  return (
    <div
      ref={listRef}
      className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-4"
    >
      {children}
    </div>
  );
}

export default AnimateList