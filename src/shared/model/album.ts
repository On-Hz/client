import { Genre } from "./genre";
import { Artist } from "./artist";
export interface Album {
  id: number;
  title: string;
  releaseDate: string;
  createdAt: string;
  coverPath: string;
  genres: Genre[];
  artists: Artist[];
}
