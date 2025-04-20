export interface ReviewModalProps {
  reviewType: string;
  userRating: number; // 사용자의 평점 (-1이면 리뷰가 없는 상태)
  entityId?: number;
  title?: string;
  reviewId?: number;
}

interface UpdateModalOptions {
  reviewId: number;
  title: string;
  pageType: string;
}

interface CreateModalOptions {
  reviewType: string;
  entityId: number;
  title: string;
  pageType: string;
}

export type ModalOptions = UpdateModalOptions | CreateModalOptions;
export function getReviewModalOptions(props: ReviewModalProps) {
  const { reviewType, userRating, entityId, title, reviewId } = props;
  const lowerType = reviewType.toLowerCase();
  if (!entityId || !title) {
    return false;
  }
  if (userRating >= 0 && reviewId) {
    return {
      reviewModalName: "updateReviewModal",
      modalOptions: {
        reviewId: reviewId,
        title: title,
        pageType: lowerType,
      },
    };
  } else {
    return {
      reviewModalName: "createReviewModal",
      modalOptions: {
        reviewType: reviewType,
        entityId: entityId,
        title: title,
        pageType: lowerType,
      },
    };
  }
}
