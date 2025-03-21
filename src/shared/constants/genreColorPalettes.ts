export interface GenreColorPalette {
  darkMuted: string; // 어둡고 차분한 색상
  darkVibrant: string; // 어둡지만 강렬한 색상
  lightMuted: string; // 밝으면서 은은한 색상
  lightVibrant: string; // 밝고 생동감 있는 색상
  muted: string; // 중간 톤, 균형 잡힌 색상
  vibrant: string; // 눈에 띄는 포인트 색상
}
export const GENRE_COLOR_PALETTES: Record<string, GenreColorPalette> = {
  blues: {
    darkMuted: "#0A1F44",
    darkVibrant: "#13294B",
    lightMuted: "#3C5A99",
    lightVibrant: "#5A8ED6",
    muted: "#1C3B73",
    vibrant: "#3F7ED6",
  },
  jazz: {
    darkMuted: "#4A2C2A",
    darkVibrant: "#8B3E2F",
    lightMuted: "#D2A679",
    lightVibrant: "#E5B299",
    muted: "#A0522D",
    vibrant: "#B22222",
  },
  "lo-fi": {
    darkMuted: "#263238",
    darkVibrant: "#37474F",
    lightMuted: "#607D8B",
    lightVibrant: "#90A4AE",
    muted: "#78909C",
    vibrant: "#B0BEC5",
  },
  electronic: {
    darkMuted: "#0D0C1D",
    darkVibrant: "#1F4068",
    lightMuted: "#2A2D43",
    lightVibrant: "#3E64FF",
    muted: "#00E0FF",
    vibrant: "#0FF0B3",
  },
  "hip hop": {
    darkMuted: "#1A1A1A",
    darkVibrant: "#2A2A2A",
    lightMuted: "#3A3A3A",
    lightVibrant: "#4A4A4A",
    muted: "#D4AF37",
    vibrant: "#FFB400",
  },
  kpop: {
    darkMuted: "#C1121F",
    darkVibrant: "#FF6B6B",
    lightMuted: "#FFB6B9",
    lightVibrant: "#FEC601",
    muted: "#7FDBFF",
    vibrant: "#39CCCC",
  },
  pop: {
    darkMuted: "#880E4F",
    darkVibrant: "#C51162",
    lightMuted: "#F48FB1",
    lightVibrant: "#FF80AB",
    muted: "#FFB300",
    vibrant: "#FF5252",
  },
  rock: {
    darkMuted: "#1B1B1B",
    darkVibrant: "#2E2E2E",
    lightMuted: "#4A4A4A",
    lightVibrant: "#5C5C5C",
    muted: "#A6192E",
    vibrant: "#E63946",
  },
  indie: {
    darkMuted: "#5A4E57",
    darkVibrant: "#A67873",
    lightMuted: "#D8B4A6",
    lightVibrant: "#EEC9B7",
    muted: "#B48E7D",
    vibrant: "#D46A6A",
  },
  acoustic: {
    darkMuted: "#4E342E",
    darkVibrant: "#6D4C41",
    lightMuted: "#A1887F",
    lightVibrant: "#BCAAA4",
    muted: "#8D6E63",
    vibrant: "#A1887F",
  },
  rnb: {
    darkMuted: "#4A1C40",
    darkVibrant: "#7B2B63",
    lightMuted: "#A35D7B",
    lightVibrant: "#C08C9C",
    muted: "#8E5572",
    vibrant: "#D45D79",
  },
  chill: {
    darkMuted: "#4A403A",
    darkVibrant: "#7C6B64",
    lightMuted: "#BFA8A0",
    lightVibrant: "#D1B7AE",
    muted: "#A18F88",
    vibrant: "#C9A79A",
  },
  ballad: {
    darkMuted: "#5C3D2E",
    darkVibrant: "#8D5B4C",
    lightMuted: "#C19A6B",
    lightVibrant: "#E8C8A2",
    muted: "#B08B70",
    vibrant: "#FFDAB9",
  },
};
