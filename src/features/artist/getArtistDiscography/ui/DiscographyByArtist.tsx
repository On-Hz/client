import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper";
import { AlbumCard, AlbumCardSkeleton } from "@/shared/ui";
import { useArtistTopDiscography } from "../api/getArtistTopDiscography";
import { sectionProps } from "../../config/sectionProps";
import { useArtistDiscography } from "../api/getArtistDiscography";

export const DiscographyByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const regularQuery = useArtistTopDiscography({ enabled: !useInfiniteScroll });
  const infiniteQuery = useArtistDiscography({
    enabled: useInfiniteScroll,
  });

  const { data, isLoading } = useInfiniteScroll ? infiniteQuery : regularQuery;
  return (
    <ArtistSectionWrapper title={"Discography"}>
      <div className="flex flex-wrap gap-4">
        {isLoading &&
          Array.from({ length: 5 }, (v, i) => (
            <AlbumCardSkeleton key={`search-skeleton-${i}`} />
          ))}
        {data &&
          data.map((album) => (
            <AlbumCard
              key={album.id}
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
