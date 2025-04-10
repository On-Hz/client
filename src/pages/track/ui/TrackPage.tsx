import React from "react";
import { Ratings, Reviews } from "@/features/track";
import "./style.css";
import { Track } from "@/features/track/detail/ui/Track";
import "./style.css";

export const TrackPage: React.FC = () => {
  return (
    <div id="sg-page">
      <div className="flex items-center justify-between hz-top">
        <Track />
        <Ratings />
      </div>
      <div className="my-[60px]">
        <Reviews />
      </div>
    </div>
  );
};
