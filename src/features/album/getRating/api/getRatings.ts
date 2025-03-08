import { UserRating } from "../model/types";

export const mockUserAlbumRating: UserRating[] = [
    {
        id:1,
        "rating":3
    }
]

// 비동기 API 호출
export const fetchAlbum = (): Promise<UserRating> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserAlbumRating[0]);
        }, 1500);
    });
};