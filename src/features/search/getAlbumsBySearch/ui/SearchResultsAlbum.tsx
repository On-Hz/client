import { SearchSectionWrapper } from "@/widgets/search";
import { sectionProps } from "../../config/sectionProps";
import { useAlbum } from "../api/getAlbums";
import { AlbumCard, AlbumCardSkeleton } from "@/shared/ui";

export const SearchResultsAlbum = ({
  hasShowMoreTab,
}: //useInfiniteScroll,
sectionProps) => {
  const { data, isLoading } = useAlbum();
  return (
    <SearchSectionWrapper
      title="앨범"
      linkTo="album"
      hasShowMoreTab={hasShowMoreTab}
    >
      <div className="flex justify-center gap-5 pb-4 space-x-4">
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
              artist={album.artist}
              cover={album.cover}
            />
          ))}
      </div>
    </SearchSectionWrapper>
  );
};
