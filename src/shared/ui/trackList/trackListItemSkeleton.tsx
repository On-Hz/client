import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const TrackListItemSkeleton: React.FC = () => {
  return (
    <li className="flex items-center justify-between px-2 py-3 transition-colors hover:bg-gray2">
      <div className="flex items-center space-x-3">
        <Skeleton 
          variant="rectangular" 
          width={56} 
          height={56} 
          sx={{ borderRadius: 4 }} 
        />
        <div>
          <Skeleton variant="text" width={120} height={20} />
          <Skeleton variant="text" width={160} height={16} style={{ marginTop: 4 }} />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" width={32} height={32} />
        <div className="flex items-center">
          <Skeleton variant="text" width={20} height={24} />
        </div>
      </div>
    </li>
  );
};
