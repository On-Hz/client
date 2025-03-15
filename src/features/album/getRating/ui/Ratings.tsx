import StarIcon from "@mui/icons-material/Star";
import { mockUserAlbumRating } from "../api/getRatings";
import { Button } from "@/shared/ui";
import { RatingsSkeleton } from "./RatingsSkeleton";
import { useAlbumStore } from "../../getAlbum/store/albumStore";
import { openModalWithAuthCheck } from "@/shared/helpers";

const RatingSec = () => {
  const rating = mockUserAlbumRating[0];
  const { album, isLoading } = useAlbumStore();

  if (isLoading || !album) {
    return <RatingsSkeleton />;
  }

  return (
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
          onClick={() => openModalWithAuthCheck("writeReviewModal")}
          text="리뷰 작성"
        />
      </div>
    </div>
  );
};

export const Ratings: React.FC = () => {
  return <RatingSec />;
};
