// src/shared/ui/reviewCard/ReviewBannerSkeleton.tsx
import React from "react";
import Skeleton from "@mui/material/Skeleton";

export const ReviewBannerSkeleton: React.FC = () => {
  return (
    <section className="review-banner">
      <div className="flex items-center hz-top">
        <div className="hz-container">
          <div className="relative hz-cover">
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            />
          </div>
          <div className="hz-album">
            <Skeleton variant="rectangular" width={150} height={150} />
          </div>
        </div>
      </div>

      <div className="mt-4 hz-ab-info">
        <div className="flex mb-2">
          <Skeleton variant="text" width={60} height={20} />
          <span className="mx-2 text-gray text-[14px]">|</span>
          <Skeleton variant="text" width={80} height={20} />
        </div>
        <Skeleton variant="text" width="80%" height={32} />
        <Skeleton variant="text" width="60%" height={28} className="mt-1" />
      </div>
    </section>
  );
};
