import React from "react";
import { openModalWithAuthCheck } from "@/shared/helpers";
import { REVIEW_TYPES } from "@/shared/constants";
import StarIcon from "@mui/icons-material/Star";

interface ArtistRatingButtonProps {
  entityId?: number;
  title: string;
}

export const ArtistRatingButton: React.FC<ArtistRatingButtonProps> = ({
  entityId,
  title,
}) => {
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() =>
          openModalWithAuthCheck("createReviewModal", {
            reviewType: REVIEW_TYPES.ARTIST,
            entityId,
            title,
          })
        }
      >
        <StarIcon
            className="text-white"
          />
      </button>
      <p className="text-base">내 평점</p>
    </div>
  );
};
