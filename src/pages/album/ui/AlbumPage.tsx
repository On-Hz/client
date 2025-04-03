import React from "react";
import { Album, AlbumInfo, Ratings, Reviews, Tracks } from "@/features/album";
import "./style.css";

export const AlbumPage: React.FC = () => {
  return (
    <div id="ab-page">
      <div className="flex items-center justify-between hz-top">
        <Album />
        <Ratings />
      </div>
      <div className="my-[60px] flex items-start justify-between hz-bottom">
        <div className="hz-track">
          <Tracks />
        </div>
        <div className="flex-1 min-w-0 pl-[30px] hz-info">
          <AlbumInfo />
        </div>
      </div>
      <Reviews />
    </div>
  );
};
