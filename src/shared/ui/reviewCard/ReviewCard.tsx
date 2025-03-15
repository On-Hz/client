import { useState } from "react";
import Rating from "@mui/material/Rating";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
interface ReviewProps {
  userName: string;
  userProfilePath?: string | null;
  content: string;
  rating: number;
  hasEllipsis?: boolean;
  hasBorder?: boolean;
  createTime?: string;
  myReviewEditButton?: React.ReactNode;
}

export const ReviewCard = ({
  userName,
  userProfilePath,
  content,
  rating,
  hasEllipsis,
  hasBorder,
  createTime,
  myReviewEditButton,
}: ReviewProps) => {
  const [liked, setLiked] = useState(false);

  const onClick = () => {
    setLiked(!liked);
  };

  return (
    <div
      className={
        hasBorder
          ? "mb-[24px] px-[24px] py-[18px] bg-white"
          : "mb-[24px] px-[24px] py-[18px] bg-white border-gray3 border rounded-[8px]"
      }
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center">
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
          <p className="font-bold text-gray pl-[12px]">{userName}</p>
        </div>
        {myReviewEditButton}
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
      <div className="pb-5 text-gray">{createTime}</div>
      <div
        className={
          hasEllipsis ? "overflow-hidden line-clamp-4" : "min-h-[70px]"
        }
      >
        {content}
      </div>
      <div className="pt-[15px]">
        <button onClick={onClick}>
          <FavoriteIcon
            className={
              liked ? "text-red" : "text-white stroke-black stroke-[2px]"
            }
          />
        </button>
      </div>
    </div>
  );
};
