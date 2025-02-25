import { Review } from "../model/types";

export const mockLatestReviews: Review[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    userName: `Reviewer name ${i + 1}`,
    userImage: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    reviewText: `Review body ${
      i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
      Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
      Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
  }));
