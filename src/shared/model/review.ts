import { ReviewType } from "@/shared/constants";
import { User } from "./user";

export interface Review {
  id: number;
  entityId: number; // 리뷰 대상 ID
  reviewType: ReviewType;
  user: User;
  rating: number;
  content: string;
  createdAt?: string;
  updatedAt?: string;
  cover?: string;
}