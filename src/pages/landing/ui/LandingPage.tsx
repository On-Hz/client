import React from "react";
import {
  TopRateAlbums,
  TopRateArtists,
  GenreSelection,
  LatestReviews,
} from "@/features/landing";
import "./style.css";

export const LandingPage: React.FC = () => {
  return (
    <div className="hz-landing">
      <TopRateAlbums />
      <TopRateArtists />
      <GenreSelection />
      <LatestReviews />
    </div>
  );
};
