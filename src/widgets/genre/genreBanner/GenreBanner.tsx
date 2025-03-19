import React from "react";
import { Box } from "@mui/material";
import { useGenreDetailInfo } from "@/features/genre";
import { getStrokeStyle } from "@/shared/helpers";

interface GenreBannerProps {
  genreCode: string;
}

export const GenreBanner: React.FC<GenreBannerProps> = ({ genreCode }) => {
  const { data: genreInfo } = useGenreDetailInfo(genreCode);
  const upperGenre = genreInfo?.code.toUpperCase();

  return (
    <Box
      component="section"
      className="relative flex items-center justify-center w-full overflow-hidden "
      style={{ backgroundColor: "transparent" }}
    >
      <span style={getStrokeStyle(upperGenre || "")}>{upperGenre}</span>

      <Box className="flex items-center space-x-[-11rem] z-10">
        <div className="relative overflow-hidden" style={{ zIndex: 1 }}>
          <div
            className="rounded-full bg-point"
            style={{
              width: "clamp(200px, 22vw, 350px)",
              height: "clamp(200px, 22vw, 350px)",
            }}
          />
          <div
            className="absolute left-0 px-4 text-sm leading-relaxed text-white top-1/2"
            style={{
              transform: "translateY(-50%)",
              zIndex: 2,
              width: "55%",
              textAlign: "left",
            }}
          >
            {genreInfo?.description}
          </div>
        </div>

        <div className="relative" style={{ zIndex: 2 }}>
          <div
            className="rounded-full bg-gray5"
            style={{
              width: "clamp(200px, 22vw, 350px)",
              height: "clamp(200px, 22vw, 350px)",
            }}
          />
        </div>

        <div className="relative" style={{ zIndex: 3 }}>
          <div
            className="flex items-center justify-center overflow-hidden rounded-full"
            style={{
              width: "clamp(200px, 22vw, 350px)",
              height: "clamp(200px, 22vw, 350px)",
              backgroundColor: genreInfo?.imagePath ? "transparent" : "#000",
            }}
          >
            {genreInfo?.imagePath && (
              <img
                src={genreInfo?.imagePath}
                alt={genreInfo?.code}
                className="object-cover w-full h-full"
              />
            )}
          </div>
        </div>
      </Box>

      <div
        className="absolute font-bold text-center text-white"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 9999,
          fontSize: "clamp(1rem, 3vw, 3rem)",
          pointerEvents: "none",
        }}
      >
        {upperGenre}
      </div>
    </Box>
  );
};
