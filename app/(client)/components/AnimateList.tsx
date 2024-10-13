"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

const AnimateList = ({ children }: { children: React.ReactNode }) => {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={listRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4"
    >
      {children}
    </div>
  );
}

export default AnimateList