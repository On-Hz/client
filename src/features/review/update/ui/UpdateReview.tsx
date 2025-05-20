import { updateReview } from "../api/updateReviewApi";
import { ReviewFormModal } from "../../shared/ui/ReviewFormModal";
import { useDetailReviewInfo } from "../../detail/api/detailReviewApi";

interface UpdateReviewProps {
  data?: {
    title: string;
    reviewId?: number;
    pageType?: string;
    userId?: string;
  };
}

export const UpdateReview: React.FC<UpdateReviewProps> = ({ data }) => {
  const { data: review, isLoading } = useDetailReviewInfo(data?.reviewId?.toString() || "");
  if (isLoading || !review) return;
  const mergedInitialData = { ...review, ...data };

  return (
    <ReviewFormModal
      modalName="updateReviewModal"
      submitReview={updateReview}
      alertMessage="리뷰가 수정되었습니다."
      initialData={mergedInitialData}
    />
  );
};
