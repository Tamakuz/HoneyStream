"use client"
import React, { useEffect, useRef } from "react";
import NavbarBrand from "./NavbarBrand";
import NavbarSearch from "./NavbarSearch";
import NavbarProfile from "./NavbarProfile";
import NavbarTab from "./NavbarTab";
import { gsap } from "gsap";

const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    gsap.fromTo(nav, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 h-fit py-2 transition-colors duration-300 backdrop-blur-md">
      <div className="container flex justify-between items-center">
        <NavbarBrand />
        <NavbarTab />
        <div className="flex items-center gap-2">
          <NavbarSearch />
          <NavbarProfile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
