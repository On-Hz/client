import { Discography } from "../model/types";

export const mockDiscography: Discography[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title:
      [
        "Omah Lay",
        "Wizkid",
        "Lil Baby",
        "Burna Boy",
        "Wizkid",
        "Davido",
        "Lil Baby",
      ][i] ?? `Artist ${i + 1}`,
    cover: `https://picsum.photos/300/300?random=${i + 10}`,
    release: `2024.05.${i + 20}`,
  }));
