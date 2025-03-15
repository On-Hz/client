import { postReview } from "../api/postReview";
import { ReviewModalContainer } from "../../ui/ReviewModalContainer";
import { REVIEW_TYPES } from "@/shared/constants";

interface WriteReviewProps {
  data?: {
    reviewType?: keyof typeof REVIEW_TYPES;
    entityId?: number;
    title?: string;
  };
}

export const WriteReview: React.FC<WriteReviewProps> = ({ data }) => {
  return (
    <ReviewModalContainer
      modalName="writeReviewModal"
      submitReview={postReview}
      alertMessage="리뷰가 작성되었습니다."
      initialData={data} // 필요시 추가 데이터 전달
    />
  );
};
