import { Artist } from "./artist";
import { Rating } from "./rating";

export interface Track {
  id: number;
  trackName: string;
  trackRank: string;
  duration: string;
  coverPath: string;
  albumId: string;
  artists: Artist[];
  createdAt: string;
  rating?: Rating["averageRating"];
}
