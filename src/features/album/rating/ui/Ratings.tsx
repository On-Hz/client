import StarIcon from "@mui/icons-material/Star";
import { Button } from "@/shared/ui";
import { RatingsSkeleton } from "./RatingsSkeleton";
import {
  openModalWithAuthCheck,
  getReviewModalOptions,
} from "@/shared/helpers";
import { REVIEW_TYPES } from "@/shared/constants";
import { useParams } from "react-router-dom";
import { useAlbumDetail } from "../../detail/api/getAlbumDetailApi";
import { useDetailReviewRatingInfo } from "@/shared/api";

const RatingSec = () => {
  const reviewTypeAlbum = REVIEW_TYPES.ALBUM;
  const { albumId } = useParams<{ albumId: string }>();// /album/:albumId
  const { data: album, isLoading } = useAlbumDetail(albumId!);
  const { data: ratings } = useDetailReviewRatingInfo(reviewTypeAlbum, albumId!);
  const userRatingDisplay = ratings?.userRating && ratings.userRating !== -1 ? ratings.userRating : 0;
  

  if (isLoading || !ratings) return <RatingsSkeleton />;
  
  return (
    <div className="flex-1 min-w-0 pl-[30px] hz-right">
      <ul className="flex items-center justify-center border border-gray4 rounded-[10px] gap-10 py-[40px]">
        <li className="text-center">
          <p className="text-[24px]">{ratings?.ratingCount}</p>
          <span className="hz-rating-text text-gray text-[14px]">
            총 별점 수
          </span>
        </li>
        <li className="text-center">
          <p className="text-[24px] text-gray ">
            <StarIcon
              className="text-yellow"
              style={{ width: "24px", height: "24px" }}
            />
            <span className="text-[#1C66E0] px-[5px]">
              {ratings ? ratings.averageRating.toFixed(2) : "0"}
            </span>
            / 5
          </p>
          <span className="hz-rating-text  text-gray text-[14px]">
            평균 별점
          </span>
        </li>
        <li className="text-center">
          <p className="text-[24px] text-gray">
            <StarIcon
              className="text-gray5"
              style={{ width: "24px", height: "24px" }}
            />
            <span className="px-[5px]">{userRatingDisplay}</span>/ 5
          </p>
          <span className="hz-rating-text  text-gray text-[14px]">
            내 별점
          </span>
        </li>
      </ul>
      <div className="flex justify-end mt-[18px]">
        <Button
          onClick={() => {
            const reviewType = reviewTypeAlbum;
            const userRating = ratings?.userRating;
            const entityId = album.id;
            const title = album.title;
            const reviewId = userRating > -1 ? ratings?.id : undefined;

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
  );
};

export const Ratings: React.FC = () => {
  return <RatingSec />;
};
