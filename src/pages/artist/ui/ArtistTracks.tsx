import { TracksByArtist } from "@/features/artist/getArtistTracks";

export const ArtistTracks: React.FC = () => {
  return <TracksByArtist useInfiniteScroll={true} />;
};
