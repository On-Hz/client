export const ORDER_BY = {
  CREATED_AT_DESC: "createdAt",
  CREATED_AT_ASC: "-createdAt",
  AVERAGE_RATING: "averageRating",
  RATING_AT_DESC: "rating",
  RATING_AT_ASC: "-rating",
  RATING_COUNT: "ratingCount",
  LIKE_COUNT_AT_DESC: "likeCount",
  LIKE_COUNT_AT_ASC: "-likeCount",
  RELEASE_DATE: "releaseDate",
  SCORE: "score"
} as const;

export const SORT_ORDER = {
  ASC: "",
  DESC: "-",
} as const;

export type OrderByType = (typeof ORDER_BY)[keyof typeof ORDER_BY];
