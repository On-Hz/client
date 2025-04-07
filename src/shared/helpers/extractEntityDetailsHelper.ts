import { Album, Artist, Track } from "@/shared/model";
import { ReviewType, REVIEW_TYPES } from "@/shared/constants";
import { formatDate } from "./formatDateHelper";

// reviewType에 따라 엔티티의 상세 정보를 추출하는 헬퍼 함수
export const extractEntityDetails = (
  reviewType: ReviewType,
  entityInfo: Album | Artist | Track
): {
  title: string;
  imagePath: string;
  releaseDate: string;
  mainArtist: string;
} => {
  let title = "",
    imagePath = "",
    releaseDate = "",
    mainArtist = "";

  if (reviewType === REVIEW_TYPES.ALBUM) {
    const album = entityInfo as Album;
    title = album.title;
    imagePath = album.coverPath;
    releaseDate = formatDate(album.releaseDate);
    mainArtist =
      album.artists.find((artist) => artist.role === "main")?.name || "";
  } else if (reviewType === REVIEW_TYPES.ARTIST) {
    const artist = entityInfo as Artist;
    title = artist.name;
    imagePath = artist.profilePath || "";
    mainArtist = "";
  } else if (reviewType === REVIEW_TYPES.TRACK) {
    const track = entityInfo as Track;
    title = track.title;
    imagePath = track.coverPath;
    releaseDate = formatDate(track.releaseDate);
    mainArtist =
      track.artists.find((artist) => artist.role === "main")?.name || "";
  } else {
    title = "Unknown";
  }

  return { title, imagePath, releaseDate, mainArtist };
};
