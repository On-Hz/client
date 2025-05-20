export const ORDER_BY = {
  CREATED_AT_DESC: "createdAt",
  CREATED_AT_ASC: "-createdAt",
  AVERAGE_RATING: "averageRating",
  RATING: "rating",
  RATING_COUNT: "ratingCount",
  LIKE_COUNT: "likeCount",
  RELEASE_DATE: "releaseDate",
  SCORE: "score"
} as const;

export const SORT_ORDER = {
  ASC: "",
  DESC: "-",
} as const;

export type OrderByType = (typeof ORDER_BY)[keyof typeof ORDER_BY];
