export interface LikeType {
    id: number;
    reviewer: string; // 리뷰어 이름
    avatar: string; // 리뷰어 아바타
    rating: number; // 별점 (0~5)
    body: string; // 리뷰 내용 (본문만)
    creatTime: string;
    artist: { //리뷰작성한 타깃
        id: number;
        name: string;
        avatar: string;
    };
}