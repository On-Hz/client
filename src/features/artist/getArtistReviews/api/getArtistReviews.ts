import { useQuery } from "@tanstack/react-query";
import { Review } from "../model/types";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockReviews;
};

const mockReviews: Review[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    reviewId: i + 1,
    userName: `Reviewer name ${i + 1}`,
    userImage: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    reviewText: `Review body ${
      i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
      Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
      Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
  }));


export const useArtistReviews = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchData,
    enabled: options?.enabled ?? true,
  });
};