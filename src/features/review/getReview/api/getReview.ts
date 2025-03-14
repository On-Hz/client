import { ReviewType } from "../model/types";

export const mockReview: ReviewType[] = [{
    "id": 2341,
    "reviewer": `강동원`,
    "avatar": `https://picsum.photos/40/40?random=2`,
    "rating": 3,
    "createTime":"2025.03.13 10:17",
    "body": " - Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? Repudiandae velit illum dolores dicta, consequatur accusantium numquam."
}];

// 비동기 API 호출
export const fetchReview = async (): Promise<{ review: ReviewType | null; isLoading: boolean }> => {
    let review: ReviewType | null = null;
    let isLoading = true;

    try {
        // 데이터 요청
        const data = await new Promise<ReviewType[]>((resolve) => {
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
