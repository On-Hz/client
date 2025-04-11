import { createReview } from "../api/createReviewApi";
import { ReviewFormModal } from "../../shared/ui/ReviewFormModal";
import { REVIEW_TYPES } from "@/shared/constants";

interface CreateReviewProps {
  data?: {
    reviewType?: keyof typeof REVIEW_TYPES;
    entityId?: number;
    title?: string;
    pageType?: string;
  };
}

export const CreateReview: React.FC<CreateReviewProps> = ({ data }) => {
  return (
    <ReviewFormModal
      modalName="createReviewModal"
      submitReview={createReview}
      alertMessage="리뷰가 작성되었습니다."
      initialData={data}
    />
  );
};

