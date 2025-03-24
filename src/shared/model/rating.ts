export interface Rating {
  id: number;
  averageRating: number;
  ratingDist: object;
  ratingCount: number;
  lastUpdatedAt: string;
  userRating: number;
  userReviewId: number;
}
