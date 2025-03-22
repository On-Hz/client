import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const LatestReviewsSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white border rounded p-7 border-gray5">
      <div className="flex items-center justify-between">
        <div className="flex items-center w-56">
          <Skeleton
            variant="circular"
            width={28}
            height={28}
            className="mr-2"
          />
          <Skeleton variant="text" width={150} height={20} />
        </div>
        <Skeleton variant="text" width={80} height={24} />
      </div>

      <div className="flex items-start gap-4 mt-7">
        <Skeleton
          variant="rectangular"
          width={80}
          height={80}
          className="rounded"
        />
        <div>
          <Skeleton variant="text" width={224} height={16} />
          <Skeleton
            variant="text"
            width={224}
            height={16}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            variant="text"
            width={224}
            height={16}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            variant="text"
            width={224}
            height={16}
            style={{ marginTop: 8 }}
          />
        </div>
      </div>
    </div>
  );
};
