import React from "react";
import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Review } from "../model/types";
import { mockLatestReviewsData } from "../api/getLatestReviews";

const renderReviewPage = (reviews: Review[]) => (
  <div
    className="grid gap-4"
    style={{ gridTemplateColumns: `repeat(${reviews.length}, minmax(0, 1fr))` }}
  >
    {reviews.map((review) => (
      <div
        key={review.id}
        className="flex flex-col p-4 bg-white border rounded shadow"
      >
        {/* 상단: 리뷰어 정보와 별점 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={review.avatar}
              alt={review.reviewer}
              className="mr-2 rounded-full h-7 w-7"
            />
            <p className="font-semibold">{review.reviewer}</p>
          </div>
          {/* Rating 컴포넌트 등 추가 가능 */}
        </div>
        {/* 하단: 앨범 커버와 리뷰 텍스트 */}
        <div className="flex items-start gap-4 mt-4">
          <img
            src={review.cover}
            alt={review.reviewer}
            className="object-cover w-20 rounded aspect-square"
          />
          <div>
            <p className="w-full text-sm text-gray-600">{review.body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const LatestReviews: React.FC = () => {
  return (
    <CarouselSection
      title="Latest Reviews"
      items={mockLatestReviewsData}
      renderPage={renderReviewPage}
      isReview
    />
  );
};
