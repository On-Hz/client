import React from "react";
import { Link } from "react-router-dom";
import { CarouselSection } from "@/shared/ui";
import { Review } from "@/shared/model";
import { useLatestReviews } from "../api/getLatestReviewsApi";
import { LatestReviewsSkeleton } from "./LatestReviewsSkeleton";
import Rating from "@mui/material/Rating";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ReviewLikeButton } from "@/features/review/list/ui/ReviewLikeButton";


const renderReviewPage = (reviews: Review[]) => (
  <div>
    {reviews.map((review) => (
      <Link
        to={`/review/${review.id}`}
        key={review.id}
        className="flex flex-col bg-white border rounded p-7 border-gray5 w-[410px]  max-800:w-[280px] max-800:p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center w-56">
            {review.user.profilePath ? (
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${review.user.profilePath}`}
                alt=""
                className="mr-2 rounded-full h-7 w-7"
              />
            ) : (
              <div className="mr-2 rounded-full h-7 w-7">
                <AccountCircleIcon
                  style={{ width: "100%", height: "100%" }}
                  className="text-gray5"
                />
              </div>
            )}
            <p className="overflow-hidden font-semibold line-clamp-1">
              {review.user.userName}
            </p>
          </div>
          <Rating value={review.rating} precision={0.5} readOnly />
        </div>
        <div className="flex items-start gap-4 mt-5">
          {review.entityFilePath ? (
            <img
              src={review.entityFilePath}
              alt={review.entityId.toString()}
              className="object-cover w-24 rounded aspect-square"
            />
          ) : (
            <div className="object-cover w-24 rounded aspect-square bg-gray3">
              <MusicNoteIcon
                style={{ width: "100%", height: "100%" }}
                className="text-gray2"
              />
            </div>
          )}
          <div className="flex flex-col justify-between h-24 w-full flex-1">
            <p className="h-auto overflow-hidden text-sm text-gray-600 line-clamp-3">
              {review.content}
            </p>
            <div className="flex justify-end">
              <ReviewLikeButton
                reviewType={review.reviewType}
                reviewId={review.id}
                entityId={review.entityId}
                isLiked={review.isLiked || false}
                likeCount={review.likeCount || 0}
                isOnlyIcon={true}
              />
            </div>
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
