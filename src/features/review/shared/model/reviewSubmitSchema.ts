// src/model/types.ts
import { z } from "zod";
import { REVIEW_TYPES } from "@/shared/constants";

// REVIEW_TYPES를 활용해서 ReviewType을 정의할 수 있습니다.
export type ReviewType = (typeof REVIEW_TYPES)[keyof typeof REVIEW_TYPES];

export const reviewSubmitSchema = z.object({
  content: z.string().min(1, { message: "리뷰 내용을 입력해주세요." }),
  rating: z.number(), // 0도 허용합니다.
  reviewType: z.enum([
    REVIEW_TYPES.ALBUM,
    REVIEW_TYPES.ARTIST,
    REVIEW_TYPES.TRACK,
  ]),
  entityId: z.number().optional(),
  reviewId: z.number().optional(),
  title: z.string().optional(),
  userId: z.string().optional()
});

export type ReviewSubmitData = z.infer<typeof reviewSubmitSchema>;
