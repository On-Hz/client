import { DiscographyByArtist } from "@/features/artist/getArtistDiscography";

export const ArtistDiscography: React.FC = () => {
  return <DiscographyByArtist useInfiniteScroll={true} />;
};
