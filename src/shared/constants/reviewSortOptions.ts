import { ORDER_BY } from "./orderByTypes";

export const REVIEW_SORT_OPTIONS = [
  { label: "작성순", value: ORDER_BY.CREATED_AT },
  { label: "별점순", value: ORDER_BY.RATING },
  { label: "좋아요순", value: ORDER_BY.LIKE_COUNT },
];