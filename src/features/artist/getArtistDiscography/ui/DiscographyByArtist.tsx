import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper.tsx/ui/ArtistSectionWrapper";
import { AlbumCard } from "@/shared/ui/albumCard/AlbumCard";
import { mockDiscography } from "../api/getArtistTopDiscography";
import { sectionProps } from "../../config/sectionProps";

export const DiscographyByArtist = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useInfiniteScroll,
}: sectionProps) => (
  <ArtistSectionWrapper title={"Discography"}>
    <div className="grid grid-cols-6 gap-3">
      {mockDiscography.map((album) => (
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
