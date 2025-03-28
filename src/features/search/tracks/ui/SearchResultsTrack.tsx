import { SearchSectionWrapper } from "@/widgets/search";
import { useTrack } from "../api/searchTracksApi";
import { sectionProps } from "../../config/sectionProps";
import { TrackListItem, TrackListItemSkeleton } from "@/shared/ui";

// 추후 개발
export const SearchResultsTrack = ({
  hasShowMoreTab,
}: // useInfiniteScroll,
sectionProps) => {
  const { data, isLoading } = useTrack();
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
        {data &&
          data.map((track) => (
            <TrackListItem
              key={track.id}
              id={track.id}
              trackName={track.trackName}
              artist={
                track.artists?.find((artist) => artist.role === "main")?.name ||
                ""
              }
              coverPath={track.coverPath}
              duration={track.duration}
            />
          ))}
      </ul>
    </SearchSectionWrapper>
  );
};
