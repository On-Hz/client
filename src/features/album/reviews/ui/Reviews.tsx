import React from "react";
import { ReviewCardContainer } from "@/features/review"
import { ReviewCardSkeleton, RoundButton, SubTitle } from "@/shared/ui";
import { useParams } from "react-router-dom";
import { useAlbumReviews } from "../api/getAlbumReviewsApi";
import { Review } from "@/shared/model";

const ReviewsSec = () => {
  
  const { albumId } = useParams<{ albumId: string }>();
  const { data: reviews, isLoading } = useAlbumReviews(albumId!);

  return (
    <div>
      <div className="flex justify-between pb-[20px]">
        <SubTitle text="리뷰"></SubTitle>
        <RoundButton text="정렬" />
      </div>
      <div>
        {isLoading &&
           Array.from({ length: 5 }).map((_, idx) => (
              <ReviewCardSkeleton key={`review-skeleton-${idx}`} />
          ))
        }
        {reviews && 
          reviews.map((review: Review) => (
            <ReviewCardContainer
              key={review.id}
              review={review}
            />
          ))
        }
      </div>
    </div>
  );
};

export const Reviews: React.FC = () => {
  return <ReviewsSec />;
};
