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
      className="hz-banner-container relative flex items-center justify-center w-full py-16 overflow-hidden"
      style={style}
    >
      <span className="hz-banner-stroke" style={{
         position: "absolute",
         top: "55%",
         left: "19%",
         transform:"translateY(-55%)",
         fontSize:"clamp(3rem, 12vw, 13rem)",
         letterSpacing:"",
         WebkitTextStroke: "3px #fff",
         color: "transparent",
         zIndex: 20,
         opacity:.9
      }}>{upperGenre}</span>
      <div className="hz-banner-text"
        style={{
          position:"absolute",
          transform: "translateY(-50%)",
          zIndex: 90,
          textAlign: "left",
          top:"124px",
          left:"19.5%",
          color:"#fff",
          wordBreak: "keep-all",
          textShadow: "3px 1px 5px rgba(0, 0, 0, .4)"
        }}
      > {genreInfo?.description}</div>
      <Box className="hz-banner-circles-container flex items-center space-x-[-11rem] z-10 relative"
      style={getStrokeStyle(upperGenre || "")}>
        <div className="relative overflow-hidden" style={{ zIndex: 1 }}>
          <div
            className="hz-banner-circle rounded-full"
            style={{
              backgroundColor: `${colors.lightMuted}`,
              width: "clamp(280px, 22vw, 350px)",
              height: "clamp(280px, 22vw, 350px)",
              opacity:".65"
            }}
          />
        </div>

        <div className="relative" style={{ zIndex: 2 }}>
          <div
            className="hz-banner-circle rounded-full"
            style={{
              backgroundColor: `${colors.muted}`,
              width: "clamp(280px, 22vw, 350px)",
              height: "clamp(280px, 22vw, 350px)",
              opacity:".8"
            }}
          />
        </div>

        <div className="relative" style={{ zIndex: 3 }}>
          <div
            className="hz-banner-circle flex items-center justify-center overflow-hidden rounded-full"
            style={{
              backgroundColor: `${colors.darkMuted}`,
              width: "clamp(280px, 22vw, 350px)",
              height: "clamp(280px, 22vw, 350px)",
            }}
          />
        </div>
      </Box>
    </Box>
  );
};
