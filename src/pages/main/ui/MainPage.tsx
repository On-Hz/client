import React from "react";
import { GenreCard } from "@/features/main/main-genreCard";
import { ArtistAvatar } from "@/features/main/main-artistAvatar";
import { AlbumCard } from "@/features/main/main-albumCard";
import { ReviewCard } from "@/features/main/main-reviewCard";
import "./style.css";

// --------------------------------------------------
// MainPage: 최종 페이지
// --------------------------------------------------
export const MainPage: React.FC = () => {
  return (
    <div className="hz-landing">
      <GenreCard />
      <ArtistAvatar />
      <AlbumCard />
      <ReviewCard />
    </div>
  );
};
