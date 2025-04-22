export const ORDER_BY = {
  CREATED_AT: "createdAt",
  AVERAGE_RATING: "averageRating",
  RATING_COUNT: "ratingCount",
  RELEASE_DATE: "releaseDate",
  SCORE: "score"
} as const;

export const SORT_ORDER = {
  ASC: "",
  DESC: "-",
} as const;

export type OrderByType = (typeof ORDER_BY)[keyof typeof ORDER_BY];
