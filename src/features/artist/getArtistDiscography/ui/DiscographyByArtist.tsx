import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper.tsx/ui/ArtistSectionWrapper";
import { AlbumCard } from "@/shared/ui/albumCard/AlbumCard";
import { mockArtistTopDiscography } from "../api/getArtistTopDiscography";
import { sectionProps } from "../../config/sectionProps";
import { mockArtistDiscography } from "../api/getArtistDiscography";

export const DiscographyByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const mockItem = useInfiniteScroll
    ? mockArtistDiscography
    : mockArtistTopDiscography;
  return (
    <ArtistSectionWrapper title={"Discography"}>
      <div className="flex flex-wrap gap-4">
        {mockItem.map((album) => (
          <AlbumCard
            id={album.id}
            title={album.title}
            cover={album.cover}
            release={album.release}
          />
        ))}
      </div>
    </ArtistSectionWrapper>
  );
};
