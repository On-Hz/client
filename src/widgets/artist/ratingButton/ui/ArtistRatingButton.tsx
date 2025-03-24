import React from "react";
import {
  openModalWithAuthCheck,
  getReviewModalOptions,
} from "@/shared/helpers";
import { REVIEW_TYPES } from "@/shared/constants";
import StarIcon from "@mui/icons-material/Star";

interface ArtistRatingButtonProps {
  entityId?: number;
  title: string;
  userRating: number;
  reviewId?: number;
}

export const ArtistRatingButton: React.FC<ArtistRatingButtonProps> = ({
  entityId,
  title,
  userRating,
  reviewId,
}) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          const reviewType = REVIEW_TYPES.ARTIST;
          const reviewModalOptions = getReviewModalOptions({
            reviewType,
            userRating,
            entityId,
            title,
            reviewId,
          });

          if (reviewModalOptions) {
            const { reviewModalName, modalOptions } = reviewModalOptions;
            openModalWithAuthCheck(reviewModalName, modalOptions);
          }
        }}
      >
        {userRating > -1 ? (
          <div className="relative group">
            <div className="text-[40px] group-hover:hidden">{userRating}</div>
            <div className="hidden group-hover:block">
              <StarIcon className="text-white" />
            </div>
          </div>
        ) : (
          <StarIcon className="text-white" />
        )}
      </button>
      <p className="text-base">내 평점</p>
    </div>
  );
};
