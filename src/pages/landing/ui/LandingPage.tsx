import React from "react";
import { TopRateAlbums } from "@/features/landing/getLandingPageData/fetchTopRateAlbums";
import { TopRateArtists } from "@/features/landing/getLandingPageData/fetchTopRateArtists";
import { TopRateGenre } from "@/features/landing/getLandingPageData/fetchTopRateGenre";
import { LatestReviews } from "@/features/landing/getLandingPageData/fetchLatestReviews";
import "./style.css";

export const LandingPage: React.FC = () => {
  return (
    <div className="hz-landing">
      <TopRateAlbums />
      <TopRateArtists />
      <TopRateGenre />
      <LatestReviews />
    </div>
  );
};
