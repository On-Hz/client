import { Artist } from "./artist";
import { Rating } from "./rating";

export interface Track {
  id: number;
  trackName: string;
  trackRank: number;
  duration: string;
  coverPath: string;
  albumId: number;
  artists: Artist[];
  createdAt: string;
  rating?: Rating["averageRating"];
}
