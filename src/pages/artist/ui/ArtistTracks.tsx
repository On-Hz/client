import { TracksByArtist } from "@/features/artist";

export const ArtistTracks: React.FC = () => {
  return <TracksByArtist useInfiniteScroll={true} />;
};
