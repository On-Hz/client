import { Reviews } from "../model/types";

export const mockReviews: Reviews[] = Array(10)
  .fill(null)
  .map((_, i) => ({
    userName: `Reviewer ${i + 1}`,
    // 짝수번째는 아바타 있음, 홀수번째는 userImage 생략
    userImage:
      i % 2 === 0 ? `https://picsum.photos/64/64?random=${i}` : undefined,
    reviewText: `Lorem ipsum dolor sit amet, review #${
      i + 1
    } 내용이 들어갑니다. 예시 문장으로 채워넣을 수 있습니다.`,
    rating: i,
  }));
