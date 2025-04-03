import { UserReviews } from "@/features/mypage/reviews/ui/UserReviews";
import { REVIEW_TYPES } from "@/shared/constants";

export const MypageAlbum = () => {
    return <UserReviews type={REVIEW_TYPES.ALBUM} />;
};