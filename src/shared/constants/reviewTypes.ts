export const REVIEW_TYPES = {
  ALBUM: "ALBUM",
  ARTIST: "ARTIST",
  TRACK: "TRACK",
} as const;

export type ReviewType = (typeof REVIEW_TYPES)[keyof typeof REVIEW_TYPES];
