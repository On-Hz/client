import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useAlbumsByGenre } from "../api/getAlbumsByGenreApi";
import { AlbumsByGenreSkeleton } from "./AlbumsByGenreSkeleton";
import { formatDate } from "@/shared/helpers";
import "./style.css";

interface AlbumsByGenreProps {
  genreCode: string;
}

export const AlbumsByGenre: React.FC<AlbumsByGenreProps> = ({ genreCode }) => {
  const { data: AlbumList, isLoading } = useAlbumsByGenre(genreCode);
  if (isLoading) {
    return <AlbumsByGenreSkeleton />;
  }
  return (
    <div className="py-6 px-10 mt-5 flex flex-wrap gap-[30px] justify-between hz-genre-wrap">
      {AlbumList &&
        AlbumList.map((album, index) => {
          const mainArtist = album.artists.find(
            (artist: any) => artist.role === "Main"
          );

          const formattedIndex = (index + 1).toString().padStart(2, "0");

          return (
            <Link
              to={`/album/${album.id}`}
              key={album.id}
              className="relative flex mb-6 min-h-[300px] hz-genere-item rounded-lg "
              style={{width:"calc(50% - 30px)"}}
            >
              <div className="hz-genere-ranking absolute top-2 left-2 z-40 p-1 rounded-md w-14 text-center text-[18px]" style={{background:"rgba(255,255,255,.8)"}}>
                <b className="text-black">{formattedIndex}</b>
              </div>

              <div className="hz-genere-item-box flex flex-1 overflow-hidden rounded-lg bg-white "
                style={{boxShadow:"0px 1px 5px 2px rgba(0, 0, 0, .2)"}}
              >
                <div
                  className="hz-genre-img max-w-[250px] w-[40%]"
                  style={{ aspectRatio: "1.5/1" }}
                >
                  {album.coverPath ? (
                    <img
                      src={album.coverPath}
                      alt={album.title}
                      className="object-cover w-full h-full object-top"
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

                <div className="hz-genre-card relative flex flex-col justify-between flex-1 py-16 px-10  min-w-0">
                  <div>
                    <p className="hz-genre-card-date mb-2 text-sm text-gray5">
                      {formatDate(album.releaseDate)}
                    </p>

                    <h3 className="hz-genre-card-title mb-1 overflow-hidden text-lg font-semibold line-clamp-2">
                      {album.title}
                    </h3>

                    <p className="hz-genre-card-name  mb-2 text-sm truncate text-gray">
                      {mainArtist?.name}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-7 hz-genre-tag-box">
                    <div className="flex flex-wrap gap-2">
                      {album.genres &&
                        album.genres.map((genre, i) => (
                          <span
                            key={`${genre.id}_${i}`}
                            className="inline-block px-3 py-1 text-xs bg-white border border-gray-200 rounded-full"
                          >
                            {genre.code}
                          </span>
                        ))}
                    </div>

                    <Rating
                      className="Rating"
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
