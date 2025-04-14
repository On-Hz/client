import { Artist } from "./artist";
import { Rating } from "./rating";

export interface Track {
  id: number;
  title: string;
  rank: number;
  duration: number;
  coverPath: string;
  albumId: number;
  albumTitle: string;
  artists: Artist[];
  releaseDate: string;
  createdAt: string;
  rating?: Rating["averageRating"];
}
