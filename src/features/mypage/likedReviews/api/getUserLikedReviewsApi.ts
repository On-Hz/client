import { LikeType } from "../model/types";

export const mockLikes: LikeType[] = Array(10)
.fill(null)
.map((_, i) => ({
    id: i,
    reviewer: `Reviewer name ${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i}`,
    creatTime:"2025.3.14",
    rating: (i % 5) + 1,
    body: `Review body ${
    i + 1
    } - 앨범은 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
    Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
    artist: {
        id: 525046,
        name: "Kendrick Lamar",
        avatar: `https://picsum.photos/200/300?random=${i}`
    }
}));


//
export const fetchUserLikesData = async (): Promise<{ Likes: LikeType[] | null; isLoading: boolean }> => {
    let Likes: LikeType[] | null = null;
    let isLoading = true;

    try {
        // 데이터 요청
        const data = await new Promise<LikeType[]>((resolve) => {
            setTimeout(() => {
                resolve(mockLikes); // mock 데이터 반환
            }, 1500);
        });
        
        Likes = data; // 데이터를 설정
        isLoading = false; // 로딩 완료
    } catch (error) {
        console.error("Failed to fetch Likes:", error);
        Likes = null;
        isLoading = false;
    }

    return { Likes, isLoading }; //반환값
};
