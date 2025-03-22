import { AlbumType } from "../model/types";

export const mockAlbums: AlbumType[] = [
    {
        "id": 2,
        "title": "To Pimp a Butterfly",
        "cover": "",
        "average_rating": 9.433468752701184,
        "ratings_count": 729,
        "release_date": "2015-03-16",
        "duration": "4680",
        "genre":"POP",
        "artist": {
            "id": 525046,
            "name": "Kendrick Lamar"
        }
    }
]

// 비동기 API 호출
export const fetchAlbum = (): Promise<AlbumType> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockAlbums[0]);
        }, 1500);
    });
};