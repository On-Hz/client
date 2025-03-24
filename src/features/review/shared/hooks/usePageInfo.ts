import { useParams } from "react-router-dom";

export interface PageInfo {
  pageType: "artist" | "album" | "track" | undefined;
  entityId: string | undefined;
}

export const usePageInfo = (): PageInfo => {
  const params = useParams<{
    artistId?: string;
    albumId?: string;
    trackId?: string;
  }>();
  if (params.artistId) {
    return { pageType: "artist", entityId: params.artistId };
  } else if (params.albumId) {
    return { pageType: "album", entityId: params.albumId };
  } else if (params.trackId) {
    return { pageType: "track", entityId: params.trackId };
  }
  return { pageType: undefined, entityId: undefined };
};
