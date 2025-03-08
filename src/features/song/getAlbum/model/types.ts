export interface Album {
    id: number;
    title: string;
    cover?: string;
    average_rating: number,
    ratings_count: number,
    release_date: string,
    duration: string,
    genre: string,
    artist: {
        id: number;
        name: string;
    };
}