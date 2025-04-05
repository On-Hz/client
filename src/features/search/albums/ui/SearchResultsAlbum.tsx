import { useParams } from "react-router-dom";
import { SearchSectionWrapper } from "@/widgets/search";
import { AlbumCard, AlbumCardSkeleton } from "@/shared/ui";
import { Album } from "@/shared/model";
import { sectionProps } from "../../config/sectionProps";
import { useCombinedSearchResults } from "../../shared/hooks/useCombinedSearchResults";

export const SearchResultsAlbum = ({
  hasShowMoreTab,
  initialData,
}: sectionProps) => {
  const { searchSlug: rawSearchSlug } = useParams<{ searchSlug: string }>()!;
  const searchSlug = rawSearchSlug ?? "";

  const {
    data: albums,
    isLoading,
    ref,
    hasNextPage,
  } = useCombinedSearchResults<Album>({
    searchSlug,
    type: "album",
    hasShowMoreTab,
    initialData,
  });

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
        {albums &&
          albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              coverPath={album.coverPath}
              createdAt={album.createdAt}
            />
          ))}
        {!hasShowMoreTab && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </SearchSectionWrapper>
  );
};
