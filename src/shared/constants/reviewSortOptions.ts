import { ORDER_BY } from "./orderByTypes";

export const REVIEW_SORT_OPTIONS = [
  { label: "최신순", value: ORDER_BY.CREATED_AT_DESC },
  // { label: "오래된순", value: ORDER_BY.CREATED_AT_ASC },
  { label: "별점순", value: ORDER_BY.RATING_AT_DESC },
  // { label: "별점 적은순", value: ORDER_BY.RATING_AT_ASC },
  { label: "좋아요순", value: ORDER_BY.LIKE_COUNT_AT_DESC },
  // { label: "좋아요 적은순", value: ORDER_BY.LIKE_COUNT_AT_ASC },
];