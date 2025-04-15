import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GenreBanner } from "@/widgets/genre";
import { AlbumsByGenre } from "@/features/genre";

export const GenrePage: React.FC = () => {
  useEffect(() => {
    document.body.classList.add("no-main-padding");
    return () => {
      document.body.classList.remove("no-main-padding");
    };
  }, []);
  
  const { genreCode } = useParams<{ genreCode: string }>();
  return (
    <div className="min-h-screen text-black bg-white">
      <GenreBanner genreCode={genreCode || ""} />
      <AlbumsByGenre genreCode={genreCode || ""} />
    </div>
  );
};
