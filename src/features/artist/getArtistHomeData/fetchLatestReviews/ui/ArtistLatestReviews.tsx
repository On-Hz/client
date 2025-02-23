import React from "react";
import { Rating } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { mockReviews } from "../api/getArtistLatestReviews";

export const ArtistLatestReviews = () => {
  const [liked, setLiked] = React.useState(false);
  const onClick = () => {
    setLiked(!liked);
  };

  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Top Reviews</h2>

      <div className="grid grid-cols-4 gap-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col h-64 p-5 border rounded-lg shadow-sm border-gray3"
          >
            {/* 상단: 리뷰어 정보 */}
            <div className="flex items-center mb-3 space-x-2">
              <img
                src={review.avatar}
                alt={review.reviewer}
                className="object-cover w-8 h-8 rounded-full"
              />
              <p className="text-sm font-semibold">{review.reviewer}</p>
            </div>

            {/* 별점: 리뷰어 아래에 위치 */}
            <Rating
              value={review.rating}
              readOnly
              size="small"
              className="mb-3"
            />

            {/* 리뷰 본문: 4줄까지만 표시, 나머지 ... 처리 */}
            <p className="overflow-hidden text-base leading-relaxed text-gray-600 line-clamp-4">
              {review.body}
            </p>

            <div className="pt-4">
              <button onClick={onClick}>
                <FavoriteIcon
                  className={
                    liked ? "text-red" : "text-white stroke-black stroke-[2px]"
                  }
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
