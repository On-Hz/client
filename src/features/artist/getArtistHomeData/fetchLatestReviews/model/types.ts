export interface Review {
    id: number;
    reviewer: string; // 리뷰어 이름
    avatar: string; // 리뷰어 아바타
    rating: number; // 별점 (0~5)
    body: string; // 리뷰 내용 (본문만)
  }