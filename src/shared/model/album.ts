import { Genre } from "./genre";
import { Artist } from "./artist";
import { Rating } from "./rating";
export interface Album {
  id: number;
  title: string;
  releaseDate: string;
  createdAt: string;
  coverPath: string;
  genres: Genre[];
  artists: Artist[];
  ratingSummary?: Rating;
}
