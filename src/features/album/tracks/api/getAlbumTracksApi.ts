import { Track } from "../model/types";

export const mockTracks: Track[] = Array(7)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    rating: 2.7
}));

//
export const fetchTracksData = async (): Promise<{ tracks: Track[] | null; isLoading: boolean }> => {
    let tracks: Track[] | null = null;
    let isLoading = true;

    try {
        // 데이터 요청
        const data = await new Promise<Track[]>((resolve) => {
            setTimeout(() => {
                resolve(mockTracks); // mock 데이터 반환
            }, 1500);
        });

        tracks = data; // 데이터를 설정
        isLoading = false; // 로딩 완료
    } catch (error) {
        console.error("Failed to fetch tracks:", error);
        tracks = null;
        isLoading = false;
    }

    return { tracks, isLoading }; //반환값
};
