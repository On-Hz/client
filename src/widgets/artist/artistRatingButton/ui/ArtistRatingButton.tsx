import React from "react";
import { openModalWithAuthCheck } from "@/shared/helpers/modalAuthChkHelper";
import { REVIEW_TYPES } from "@/shared/constants/reviewTypes";

interface ArtistRatingButtonProps {
  entityId: number;
  title: string;
}

export const ArtistRatingButton: React.FC<ArtistRatingButtonProps> = ({
  entityId,
  title,
}) => {
  return (
    <div className="flex flex-col items-center">
      <button
        className="text-4xl focus:outline-none"
        onClick={() =>
          openModalWithAuthCheck("writeReviewModal", {
            reviewType: REVIEW_TYPES.ARTIST,
            entityId,
            title,
          })
        }
      >
        ★
      </button>
      <p className="text-base">내 평점</p>
    </div>
  );
};
