import React from "react";
import { Link } from "react-router-dom";
import { CarouselSection } from "@/shared/ui";
import { Review } from "@/shared/model";
import { useLatestReviews } from "../api/getLatestReviews";
import { LatestReviewsSkeleton } from "./LatestReviewsSkeleton";
import Rating from "@mui/material/Rating";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const renderReviewPage = (reviews: Review[]) => (
  <div>
    {reviews.map((review) => (
      <Link to={`/review/${review.id}`}
        key={review.id}
        className="flex flex-col bg-white border rounded p-7 border-gray5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-56">
            {review.user.profilePath ? (
              <img
                src={review.user.profilePath}
                alt=""
                className="mr-2 rounded-full h-7 w-7"
              />
            ) : (
              <div className="mr-2 rounded-full h-7 w-7">
                <AccountCircleIcon style={{ width: "100%", height: "100%" }} className="text-gray5" />
              </div>
            )}
            <p className="overflow-hidden font-semibold line-clamp-1">
              {review.user.userName}
            </p>
          </div>
          <Rating value={review.rating} precision={0.5} readOnly />
        </div>
        <div className="flex items-start gap-4 mt-7">
          {review.entityFilePath ? (
            <img
              src={review.entityFilePath}
              alt={review.entityId.toString()}
              className="object-cover w-20 rounded aspect-square"
            />
          ) : (
            <div className="object-cover w-20 rounded aspect-square bg-gray3">
              <MusicNoteIcon
                style={{ width: "100%", height: "100%" }}
                className="text-gray2"
              />
            </div>
          )}
          <div>
            <p className="w-56 overflow-hidden text-sm text-gray-600 line-clamp-4">
              {review.content}
            </p>
          </div>
        </div>
      </Link>
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
