import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { mockAlbums } from "../../album/api/getAlbumDetailApi";
import { mockUserAlbumRating } from "../api/getTrackRatingsApi";
import { Button } from "@/shared/ui";
import { RatingsSkeleton } from "./RatingsSkeleton";
import {
  openModalWithAuthCheck,
  getReviewModalOptions,
} from "@/shared/helpers";
import { REVIEW_TYPES } from "@/shared/constants";

const RatingSec = () => {
  const album = mockAlbums[0];
  const rating = mockUserAlbumRating[0];

  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 1.5초
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <RatingsSkeleton />
      ) : (
        <div className="flex-1 min-w-0 pl-[40px] hz-right">
          <ul className="flex items-center justify-center border border-gray4 rounded-[10px] gap-10 py-[40px]">
            <li className="text-center">
              <p className="text-[24px]">{album.ratings_count}</p>
              <span className="hz-rating-text text-gray4 text-[14px]">
                총 별점 수
              </span>
            </li>
            <li className="text-center">
              <p className="text-[24px] text-gray4 ">
                <StarIcon
                  className="text-yellow"
                  style={{ width: "24px", height: "24px" }}
                />
                <span className="text-[#1C66E0] px-[5px]">
                  {album.average_rating.toFixed(2)}
                </span>
                / 5
              </p>
              <span className="hz-rating-text  text-gray4 text-[14px]">
                평균 별점
              </span>
            </li>
            <li className="text-center">
              <p className="text-[24px] text-gray4">
                <StarIcon
                  className="text-gray5"
                  style={{ width: "24px", height: "24px" }}
                />
                <span className="px-[5px]">{rating.rating}</span>/ 5
              </p>
              <span className="hz-rating-text  text-gray4 text-[14px]">
                내 별점
              </span>
            </li>
          </ul>
          <div className="flex justify-end mt-[18px]">
            <Button
              onClick={() => {
                const reviewType = REVIEW_TYPES.TRACK;
                const userRating = rating.rating; //userRating
                const entityId = album.id; //track.id
                const title = album.title; //track.title
                const reviewId =
                  userRating > -1 ? rating.id : undefined;

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
              text="리뷰 작성"
            />
          </div>
        </div>
      )}
    </>
  );
};

export const Ratings: React.FC = () => {
  return <RatingSec />;
};
