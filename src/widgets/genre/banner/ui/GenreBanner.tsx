import React from "react";
import { Box } from "@mui/material";
import { useGenreDetailInfo } from "@/features/genre";
import { getStrokeStyle } from "@/shared/helpers";
import { GENRE_COLOR_PALETTES } from "@/shared/constants";
import "./style.css";

interface GenreBannerProps {
  genreCode: string;
}

export const GenreBanner: React.FC<GenreBannerProps> = ({ genreCode }) => {
  const { data: genreInfo } = useGenreDetailInfo(genreCode);
  const upperGenre = genreInfo?.code.toUpperCase();

  const colors = GENRE_COLOR_PALETTES[genreCode];
  const style = {
    background: `
      radial-gradient(circle at 20% 20%, ${colors.darkMuted}, transparent 60%),
      radial-gradient(circle at 70% 10%, ${colors.vibrant}, transparent 60%),
      radial-gradient(circle at 20% 80%, ${colors.lightVibrant}, transparent 60%),
      radial-gradient(circle at 80% 80%, ${colors.lightMuted}, transparent 60%),
      radial-gradient(circle at 40% 60%, ${colors.muted}, transparent 60%),
      radial-gradient(circle at 60% 60%, ${colors.darkVibrant}, transparent 60%)
    `,
  };
  return (
    <Box
      component="section"
      className="hz-banner-container relative flex items-center justify-center w-full py-10 overflow-hidden"
      style={style}
    >
      <span className="hz-banner-stroke" style={getStrokeStyle(upperGenre || "")}>{upperGenre}</span>

      <Box className="hz-banner-circles-container flex items-center space-x-[-11rem] z-10">
        <div className="relative overflow-hidden" style={{ zIndex: 1 }}>
          <div
            className="hz-banner-circle rounded-full"
            style={{
              backgroundColor: `${colors.lightMuted}`,
              width: "clamp(200px, 22vw, 350px)",
              height: "clamp(200px, 22vw, 350px)",
            }}
          />
          <div
            className="hz-banner-description absolute left-0 px-4 text-sm leading-relaxed text-white top-1/2"
            style={{
              transform: "translateY(-50%)",
              zIndex: 2,
              width: "53%",
              textAlign: "left",
            }}
          >
            {genreInfo?.description}
          </div>
        </div>

        <div className="relative" style={{ zIndex: 2 }}>
          <div
            className="hz-banner-circle rounded-full"
            style={{
              backgroundColor: `${colors.muted}`,
              width: "clamp(200px, 22vw, 350px)",
              height: "clamp(200px, 22vw, 350px)",
            }}
          />
        </div>

        <div className="relative" style={{ zIndex: 3 }}>
          <div
            className="hz-banner-circle flex items-center justify-center overflow-hidden rounded-full"
            style={{
              backgroundColor: `${colors.darkMuted}`,
              width: "clamp(200px, 22vw, 350px)",
              height: "clamp(200px, 22vw, 350px)",
            }}
          />
        </div>
      </Box>

      <div
        className="hz-banner-title absolute font-bold text-center text-white"
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
