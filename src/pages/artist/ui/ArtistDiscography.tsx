import { DiscographyByArtist } from "@/features/artist";

export const ArtistDiscography: React.FC = () => {
  return <DiscographyByArtist useInfiniteScroll={true} />;
};
