import React from "react";
import { useParams } from "react-router-dom";
import { GenreBanner } from "@/widgets/genre";
import { AlbumsByGenre } from "@/features/genre";

export const GenrePage: React.FC = () => {
  const { genreCode } = useParams<{ genreCode: string }>();
  return (
    <div className="min-h-screen text-black bg-white">
      <GenreBanner genreCode={genreCode || ""} />
      <AlbumsByGenre genreCode={genreCode || ""} />
    </div>
  );
};
