import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./style.css";

export const ArtistAvatarSkeleton: React.FC = () => {
  return (
    <div className="text-center">
      <div className="mb-2 overflow-hidden rounded-full hz-artist-item">
        <Skeleton variant="circular" width="100%" height="100%" />
      </div>
      <div className="flex justify-center">
        <Skeleton variant="text" width="50%" height={20} />
      </div>
    </div>
  );
};
