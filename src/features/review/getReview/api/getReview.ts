import { REVIEW_TYPES } from "@/shared/constants";
import { Review } from "@/shared/model";

export const mockReview: Review[] = [{
    "id": 2341,
    "user": {
        "id": 100, // 예시용 dummy ID
        "email": `reviewer@example.com`,
        "userName": "강동원",
        "profilePath": `https://picsum.photos/40/40?random=1`,
        "role": "USER",
      },
    "rating": 3,
    "createdAt" :"2025.03.13 10:17",
    "content": " - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? Repudiandae velit illum dolores dicta, consequatur accusantium numquam.",
    "reviewType": REVIEW_TYPES.ARTIST,
    "entityId": 1
}];

// 비동기 API 호출
export const fetchReview = async (): Promise<{ review: Review | null; isLoading: boolean }> => {
    let review: Review | null = null;
    let isLoading = true;

    try {
        // 데이터 요청
        const data = await new Promise<Review[]>((resolve) => {
            setTimeout(() => {
                resolve(mockReview); // mock 데이터 반환
            }, 1500);
        });

        review = data[0] || null;
        isLoading = false;
    } catch (error) {
        console.error("Failed to fetch review:", error);
        review = null;
        isLoading = false;
    }

    return { review, isLoading }; // 첫 번째 앨범만 반환
}
