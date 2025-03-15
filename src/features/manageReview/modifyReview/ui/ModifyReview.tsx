import { putReview } from "../api/putReview";
import { ReviewModalContainer } from "../../ui/ReviewModalContainer";
import { REVIEW_TYPES } from "@/shared/constants";

interface ModifyReviewProps {
  data?: {
    reviewType?: keyof typeof REVIEW_TYPES;
    entityId?: number;
    title?: string;
    content?: string;
    rating?: number;
  };
}

export const ModifyReview: React.FC<ModifyReviewProps> = ({ data }) => {
  return (
    <ReviewModalContainer
      modalName="modifyReviewModal"
      submitReview={putReview}
      alertMessage="리뷰가 수정되었습니다."
      initialData={data}
    />
  );
};
