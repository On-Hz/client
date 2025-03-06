import React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./style.css";

export const AlbumCardSkeleton: React.FC = () => {
  return (
    <div className="flex-shrink-0 rounded-lg hz-album-item bg-gray2">
      <div className="overflow-hidden rounded-lg rounded-b-none rounded-bl-none aspect-square">
        <Skeleton
          variant="rectangular"
          animation="wave"
          className="w-full aspect-square"
        />
      </div>
      <div className="p-5 space-y-1">
        <Skeleton variant="text" animation="wave" width="80%" height={16} />
        <Skeleton variant="text" animation="wave" width="60%" height={20} />
      </div>
    </div>
  );
};
