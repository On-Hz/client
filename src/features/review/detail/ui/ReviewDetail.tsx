import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { ReviewCardSkeleton } from "@/shared/ui";
import { useDetailReviewInfo } from "../api/detailReviewApi";

import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ReviewSec = () => {
  const { data: review, isLoading } = useDetailReviewInfo("1106");

  return (
    <section className="px-40 py-8 mx-auto">
      {isLoading ? (
        <ReviewCardSkeleton key="1" />
      ) : (
        <div className="px-6 py-4 mb-6 rounded-md bg-gray2">
          <div className="flex flex-col mx-5 mt-4">
            <div className="flex">
              <div className="flex justify-start">
                <FaQuoteLeft className="text-5xl text-gray4" />
              </div>
              <div className="flex items-end justify-center flex-1 pr-12">
                <Rating
                  value={review?.rating}
                  precision={0.5}
                  readOnly
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#FFD231", // 채워진 별 색상
                    },
                    "& .MuiRating-iconEmpty": {
                      color: "#a1a1a1", // 비어있는 별 색상
                    },
                    fontSize: "2rem",
                  }}
                />
              </div>
            </div>
            <div className="items-center justify-center pt-2 text-center px-60">
              <p className="whitespace-pre-wrap">{review?.content}</p>
            </div>

            <div className="flex items-center justify-end pr-4 space-x-2">
              <FaQuoteRight className="text-5xl text-gray4" />
            </div>
            <div className="flex items-end justify-end mt-5">
              <p className="pr-2 font-bold text-gray">
                {review?.user?.userName}
              </p>
              <span className="w-16 h-16 overflow-hidden border rounded-full border-gray3">
                {review?.user?.profilePath ? (
                  <img
                    src={review.user.profilePath}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <AccountCircleIcon
                    className="text-gray5"
                    style={{ width: "100%", height: "100%" }}
                  />
                )}
              </span>
            </div>
          </div>
          <div className="flex justify-between my-2">
            <p className="text-sm text-gray">좋아요</p>
            <p className="text-sm text-gray">{review?.createdAt}</p>
          </div>
          <div className="pt-4 border border-b-0 border-l-0 border-r-0 border-gray3">
            <button>
              <FavoriteIcon
                className={
                  review?.isLiked
                    ? "text-red"
                    : "text-white stroke-black stroke-[2px]"
                }
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export const ReviewDetail: React.FC = () => {
  return <ReviewSec />;
};
