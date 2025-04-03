import { UserReviews } from "@/features/mypage/reviews/ui/UserReviews";
import { REVIEW_TYPES } from "@/shared/constants";

export const MypageArtist = () => {
    return <UserReviews type={REVIEW_TYPES.ARTIST} />;
};