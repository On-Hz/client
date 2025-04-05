import React from "react";
import { Ratings, Reviews } from "@/features/track";
import "./style.css";
import { Album } from "@/features/track/detail/ui/Album";
import "./style.css";

export const TrackPage: React.FC = () => {
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
