import React from "react";
import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Review } from "../model/types";
import { useLatestReviews } from "../api/getLatestReviews";
import Rating from "@mui/material/Rating";
import { LatestReviewsSkeleton } from "./LatestReviewsSkeleton";

const renderReviewPage = (reviews: Review[]) => (
  <div>
    {reviews.map((review) => (
      <div
        key={review.id}
        className="flex flex-col bg-white border rounded p-7 border-gray5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-56">
            <img
              src={review.userImage}
              alt={review.userName}
              className="mr-2 rounded-full h-7 w-7"
            />
            <p className="overflow-hidden font-semibold line-clamp-1">
              {review.userName}
            </p>
          </div>
          <Rating value={review.rating} precision={0.5} readOnly />
        </div>
        <div className="flex items-start gap-4 mt-7">
          <img
            src={review.cover}
            alt={review.userName}
            className="object-cover w-20 rounded aspect-square"
          />
          <div>
            <p className="w-56 overflow-hidden text-sm text-gray-600 line-clamp-4">
              {review.reviewText}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
);
const renderSkeletonReviews = (idx?: number): JSX.Element => (
  <div>
    <LatestReviewsSkeleton key={`album-skeleton-${idx}`} />
  </div>
);
export const LatestReviews: React.FC = () => {
  const { data, isLoading } = useLatestReviews();
  return (
    <CarouselSection
      title="최신 리뷰"
      items={data || []}
      renderPage={renderReviewPage}
      isLoading={isLoading}
      skeletonArrLength={6}
      skeletonComp={renderSkeletonReviews}
    />
  );
};
