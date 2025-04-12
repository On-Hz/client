import { useParams } from "react-router-dom";
import { SearchSectionWrapper } from "@/widgets/search";
import { ArtistAvatar, ArtistAvatarSkeleton } from "@/shared/ui";
import { Artist } from "@/shared/model";
import { sectionProps } from "../../config/sectionProps";
import { useCombinedSearchResults } from "../../shared/hooks/useCombinedSearchResults";

export const SearchResultsArtist = ({
  hasShowMoreTab,
  initialData,
}: sectionProps) => {
  const { searchSlug: rawSearchSlug } = useParams<{ searchSlug: string }>()!;
  const searchSlug = rawSearchSlug ?? "";

  const {
    data: artists,
    isLoading,
    ref,
    hasNextPage,
  } = useCombinedSearchResults<Artist>({
    searchSlug,
    type: "artist",
    hasShowMoreTab,
    initialData,
  });

  return (
    <SearchSectionWrapper
      title="아티스트"
      linkTo="artist"
      hasShowMoreTab={hasShowMoreTab}
    >
      <div className="flex flex-wrap gap-7 justify-between">
        {isLoading &&
          Array.from({ length: 5 }, (_, i) => (
            <ArtistAvatarSkeleton key={`search-skeleton-${i}`} />
          ))}
        {artists &&
          artists.map((artist) => (
            <ArtistAvatar
              key={artist.id}
              id={artist.id}
              name={artist.name}
              profilePath={artist.profilePath}
            />
          ))}
        {!hasShowMoreTab && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </SearchSectionWrapper>
  );
};
