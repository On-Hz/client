import { updateReview } from "../api/updateReviewApi";
import { ReviewFormModal } from "../../shared/ui/ReviewFormModal";
import { REVIEW_TYPES } from "@/shared/constants";

interface UpdateReviewProps {
  data?: {
    reviewType?: keyof typeof REVIEW_TYPES;
    entityId?: number;
    title?: string;
    content?: string;
    rating?: number;
  };
}

export const UpdateReview: React.FC<UpdateReviewProps> = ({ data }) => {
  return (
    <ReviewFormModal
      modalName="updateReviewModal"
      submitReview={updateReview}
      alertMessage="리뷰가 수정되었습니다."
      initialData={data}
    />
  );
};
