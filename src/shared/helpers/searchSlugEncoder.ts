import LZString from "lz-string";

export function encodeSlug(slug: string): string {
  return LZString.compressToEncodedURIComponent(slug);
}

export function decodeSlug(slug: string): string {
  const result = LZString.decompressFromEncodedURIComponent(slug);
  return result === null ? "" : result;
}

export interface ParsedSlug {
  keyword: string;
  redirectTo?: string;
}

export function parseSlug(raw: string): ParsedSlug {
  const lzDecoded = decodeSlug(raw);
  if (lzDecoded !== "") {
    return { keyword: lzDecoded };
  }
  try {
    const pctDecoded = decodeURIComponent(raw);
    const newSlug = encodeSlug(pctDecoded);
    return {
      keyword: pctDecoded,
      redirectTo: `/search/${newSlug}`,
    };
  } catch {
    throw Object.assign(new Error("404 Not Found"), {
      status: 404,
    });
  }
}
