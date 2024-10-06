"use client";
import React from "react";
import DefaultLayout from "../../components/DefaultLayout";
import SidebarLayout from "../../components/SidebarLayout";
import { useSearchParams } from "next/navigation";
import MovieTopRatedList from "../../components/top-rated/MovieTopRatedList";
import AnimeTopRatedList from "../../components/top-rated/AnimeTopRatedList";

const TopRatedPage = () => {
  const searchParams = useSearchParams();
  return (
    <DefaultLayout>
      <SidebarLayout>
        {searchParams.get("type") === "movie" ? (
          <MovieTopRatedList />
        ) : (
          <AnimeTopRatedList />
        )}
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default TopRatedPage;
