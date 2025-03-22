import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useAlbumsByGenre } from "../api/getAlbumsByGenreApi";
import { AlbumsByGenreSkeleton } from "./AlbumsByGenreSkeleton";
import { formatDate } from "@/shared/helpers";

interface AlbumsByGenreProps {
  genreCode: string;
}

export const AlbumsByGenre: React.FC<AlbumsByGenreProps> = ({ genreCode }) => {
  const { data: AlbumList, isLoading } = useAlbumsByGenre(genreCode);
  if (isLoading) {
    return <AlbumsByGenreSkeleton />;
  }
  return (
    <div className="p-6 mt-5 bg-gray-100">
      {AlbumList &&
        AlbumList.map((album, index) => {
          const mainArtist = album.artists.find(
            (artist: any) => artist.role === "main"
          );

          const formattedIndex = (index + 1).toString().padStart(2, "0");

          return (
            <Link to={`/album/${album.id}`} key={album.id} className="relative flex mb-6">
              <div className="flex items-center justify-center mr-3 text-base font-medium text-point w-9">
                {formattedIndex}
              </div>

              <div className="flex flex-1 overflow-hidden border rounded-lg border-gray5 bg-white transition-all hover:translate-y-[-2px] hover:shadow-md">
                <div
                  className="max-w-[250px] w-[40%]"
                  style={{ aspectRatio: "1.5/1" }}
                >
                  {album.coverPath ? (
                    <img
                      src={album.coverPath}
                      alt={album.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="object-cover w-full h-full bg-gray3">
                      <MusicNoteIcon
                        style={{ width: "100%", height: "100%" }}
                        className="text-gray2"
                      />
                    </div>
                  )}
                </div>

                <div className="relative flex flex-col justify-between flex-1 p-4">
                  <div>
                    <p className="mb-2 text-sm text-gray5">
                      {formatDate(album.releaseDate)}
                    </p>

                    <h3 className="mb-1 overflow-hidden text-lg font-semibold line-clamp-2">
                      {album.title}
                    </h3>

                    <p className="mb-2 text-sm truncate text-gray">
                      {mainArtist?.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex flex-wrap gap-2">
                      {album.genres &&
                        album.genres.map((genre, i) => (
                          <span
                            key={`${genre.id}_${i}`}
                            className="inline-block px-3 py-1 text-xs font-medium bg-white border border-gray-200 rounded-full text-gray5"
                          >
                            {genre.code}
                          </span>
                        ))}
                    </div>

                    <Rating
                      name={`album-rating-${album.id}`}
                      value={album.rating}
                      readOnly
                      size="small"
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};
