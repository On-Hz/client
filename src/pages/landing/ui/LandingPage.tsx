import React from "react";
import { TopRateGenre } from "@/features/landing/getLandingPageData/fetchTopRateGenre";
import { TopRateArtists } from "@/features/landing/getLandingPageData/fetchTopRateArtists";
import { TopRateAlbums } from "@/features/landing/getLandingPageData/fetchTopRateAlbums";
import { LatestReviews } from "@/features/landing/getLandingPageData/fetchLatestReviews";
import "./style.css";

// --------------------------------------------------
// MainPage: 최종 페이지
// --------------------------------------------------
export const LandingPage: React.FC = () => {
  return (
    <div className="hz-landing">
      <TopRateGenre />
      <TopRateArtists />
      <TopRateAlbums />
      <LatestReviews />
    </div>
  );
};
