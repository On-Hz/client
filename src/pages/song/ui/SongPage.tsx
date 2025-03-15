import React from "react";
import { Album, Ratings, Reviews } from "@/features/song";
import "./style.css";

export const SongPage: React.FC = () => {
  return (
    <div id="sg-page">
      <div className="flex items-center justify-between hz-top">
        <Album />
        <Ratings />
      </div>
      <div className="my-[60px]">
        <Reviews />
      </div>
    </div>
  );
};
