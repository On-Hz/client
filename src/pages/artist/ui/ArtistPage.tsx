import React from "react";
import { Outlet } from "react-router-dom";
import { ArtistBanner } from "@/widgets/artist";

export const ArtistPage: React.FC = () => {
  return (
    <div className="min-h-screen text-black bg-white">
      <ArtistBanner />
      <Outlet />
    </div>
  );
};
