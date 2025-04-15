import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ArtistBanner } from "@/widgets/artist";

export const ArtistPage: React.FC = () => {
  
  useEffect(() => {
    document.body.classList.add("no-main-padding");
    return () => {
      document.body.classList.remove("no-main-padding");
    };
  }, []);

  return (
    <div className="min-h-screen text-black bg-white">
      <ArtistBanner />
      <Outlet />
    </div>
  );
};
