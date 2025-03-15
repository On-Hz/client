import React from "react";
import {
  TopRateAlbums,
  TopRateArtists,
  TopRateGenre,
  LatestReviews,
} from "@/features/landing";
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
