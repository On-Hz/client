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
        "genre": "POP",
        "artist": {
            "id": 525046,
            "name": "Kendrick Lamar"
        }
    }
];

// 비동기 API 호출
export const fetchAlbum = async (): Promise<{ album: AlbumType | null; isLoading: boolean }> => {
    let album: AlbumType | null = null;
    let isLoading = true;

    try {
        // 데이터 요청
        const data = await new Promise<AlbumType[]>((resolve) => {
            setTimeout(() => {
                resolve(mockAlbums); // mock 데이터 반환
            }, 1500);
        });

        album = data[0] || null; // 첫 번째 앨범만 반환
        isLoading = false; // 로딩 완료
    } catch (error) {
        console.error("Failed to fetch album:", error);
        album = null;
        isLoading = false;
    }

    return { album, isLoading }; // 첫 번째 앨범만 반환
}
