import { Review } from "../model/types";

export const mockReviews: Review[] = Array(6)
.fill(null)
.map((_, i) => ({
    id: i,
    reviewer: `Reviewer name ${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    body: `Review body ${
    i + 1
    } - 앨범은 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
    Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
}));
