import { useQuery } from "@tanstack/react-query";
import { Review } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockLatestReviewsData;
};

const mockLatestReviewsData: Review[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    userName: `Reviewedsfasdfsdafafdr ${i + 1}`,
    userImage: `https://picsum.photos/200/300?random=${i + 10}`,
    cover: `https://picsum.photos/200/300?random=${i + 20}`,
    reviewText: `Review body ${
      i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
    Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`,
    rating: i + 0.5, // 예시로 별 4개
  }));

export const useLatestReviews = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchData,
  });
};
