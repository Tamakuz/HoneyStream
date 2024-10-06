"use client";
import React, { Suspense } from "react";
import DefaultLayout from "../../components/DefaultLayout";
import SidebarLayout from "../../components/SidebarLayout";
import { useSearchParams } from "next/navigation";
import MovieTopRatedList from "../../components/top-rated/MovieTopRatedList";
import AnimeTopRatedList from "../../components/top-rated/AnimeTopRatedList";

const TopRatedContent = () => {
  const searchParams = useSearchParams();
  return searchParams.get("type") === "movie" ? (
    <MovieTopRatedList />
  ) : (
    <AnimeTopRatedList />
  );
};

const TopRatedPage = () => {
  return (
    <DefaultLayout>
      <SidebarLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <TopRatedContent />
        </Suspense>
      </SidebarLayout>
    </DefaultLayout>
  );
};

export default TopRatedPage;
