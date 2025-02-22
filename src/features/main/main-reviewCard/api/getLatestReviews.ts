import { Review } from "../model/types";

export const mockLatestReviewsData: Review[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    reviewer: `Reviewer ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i + 10}`,
    cover: `https://picsum.photos/200/300?random=${i + 20}`,
    body: `Review body ${i + 1}`,
    rating: i + 1, // 예시로 별 4개
  }));
