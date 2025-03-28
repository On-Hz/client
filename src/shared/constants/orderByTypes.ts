export const ORDER_BY = {
  CREATED_AT: "createdAt",
  AVERAGE_RATING: "averageRating",
  RATING_COUNT: "ratingCount"
} as const;

export const SORT_ORDER = {
  ASC: "",
  DESC: "-",
} as const;

export type OrderByType = typeof ORDER_BY[keyof typeof ORDER_BY];
