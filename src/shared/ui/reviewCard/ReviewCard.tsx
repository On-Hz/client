import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { formatDate } from "@/shared/helpers";
import { ReviewContent } from "./ReviewContent";
interface ReviewProps {
  userName: string;
  userProfilePath?: string | null;
  content: string;
  rating: number;
  hasEllipsis?: boolean;
  hasBorder?: boolean;
  isDetailPage?: boolean;
  createdAt?: string;
  reviewActionButtons?: React.ReactNode;
  reviewLikeButton: React.ReactNode;
}

export const ReviewCard = ({
  userName,
  userProfilePath,
  content,
  rating,
  hasEllipsis,
  hasBorder,
  isDetailPage,
  createdAt,
  reviewActionButtons,
  reviewLikeButton,
}: ReviewProps) => {
  return (
    <div
      className={
        hasBorder
          ? "mb-[24px] px-[24px] py-[18px] bg-white relative max-500:px-[15px]"
          : "mb-[24px] px-[24px] py-[18px] bg-white relative border-gray3 border rounded-[8px] cursor-pointer transform hover:border-gray transition-colors max-500:px-[15px]"
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center w-full flex-1">
          <span className="w-[64px] h-[64px] rounded-[50%] overflow-hidden border border-gray3">
            {userProfilePath ? (
              <img src={userProfilePath} alt="" className="w-full h-full" />
            ) : (
              <AccountCircleIcon
                className="text-gray5"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </span>
          <p className="font-bold text-gray pl-[12px] mt-2 flex-1 break-all hz-review-name">{userName}</p>
        </div>
        {reviewActionButtons}
      </div>
      <div className="py-[15px]">
        <Rating
          value={rating}
          precision={0.5}
          readOnly
          sx={{
            "& .MuiRating-iconFilled": {
              color: "#FFD231", // 채워진 별 색상
            },
            "& .MuiRating-iconEmpty": {
              color: "#a1a1a1", // 비어있는 별 색상
            },
          }}
        />
      </div>
      <div className="pb-5 text-gray">{formatDate(createdAt || "")}</div>
      <ReviewContent content={content} hasEllipsis={hasEllipsis} isDetailPage={isDetailPage}/>
      <div className="pt-[15px] flex">{reviewLikeButton}</div>
    </div>
  );
};
