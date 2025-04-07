import { useParams } from "react-router-dom";
import { SearchSectionWrapper } from "@/widgets/search";
import { TrackListItem, TrackListItemSkeleton } from "@/shared/ui";
import { Track } from "@/shared/model";
import { sectionProps } from "../../config/sectionProps";
import { useCombinedSearchResults } from "../../shared/hooks/useCombinedSearchResults";

export const SearchResultsTrack = ({
  hasShowMoreTab,
  initialData,
}: sectionProps) => {
  const { searchSlug: rawSearchSlug } = useParams<{ searchSlug: string }>()!;
  const searchSlug = rawSearchSlug ?? "";

  const {
    data: tracks,
    isLoading,
    ref,
    hasNextPage,
  } = useCombinedSearchResults<Track>({
    searchSlug,
    type: "track",
    hasShowMoreTab,
    initialData,
  });

  return (
    <SearchSectionWrapper
      title="노래"
      linkTo="track"
      hasShowMoreTab={hasShowMoreTab}
    >
      <ul className="space-y-2">
        {isLoading &&
          Array.from({ length: 4 }, (v, i) => (
            <TrackListItemSkeleton key={`search-skeleton-${i}`} />
          ))}
        {tracks &&
          tracks.map((track) => (
            <TrackListItem
              key={track.id}
              id={track.id}
              title={track.title}
              artist={
                track.artists?.find((artist) => artist.role === "main")?.name ||
                ""
              }
              coverPath={track.coverPath}
              duration={track.duration}
            />
          ))}
        {!hasShowMoreTab && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </ul>
    </SearchSectionWrapper>
  );
};
