import { useQuery } from "@tanstack/react-query";
import { Review } from "@/shared/model";
import { REVIEW_TYPES } from "@/shared/constants";

const fetchData = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return mockReviews;
};

const mockReviews: Review[] = Array(30)
  .fill(null)
  .map((_, i) => ({
      id: i,
      user: {
        id: i + 100, // 예시용 dummy ID
        email: `reviewer${i + 1}@example.com`,
        userName: `Reviewer name ${i + 1}`,
        profilePath: `https://picsum.photos/40/40?random=${i}`,
        role: "USER",
      },
      rating: (i % 5) + 1,
      content: `Review body ${
        i + 1
      } - 앨범은 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
      Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
      Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`,
      reviewType: REVIEW_TYPES.ALBUM,
      entityId: i,
    }));


export const useArtistReviews = (options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: fetchData,
    enabled: options?.enabled ?? true,
  });
};