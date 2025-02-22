export interface Review {
  id: number;
  reviewer: string; // 리뷰어 이름
  avatar: string; // 리뷰어 아바타 이미지
  cover: string; // 리뷰 대상 앨범(또는 사진)
  body: string; // 리뷰 내용
  rating: number; // 별점 (1~5)
}
