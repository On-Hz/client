export const CODE_TYPES = {
  TERMS: "terms",
  PRIVACY: "privacy",
} as const;

export type CodeType = (typeof CODE_TYPES)[keyof typeof CODE_TYPES];
