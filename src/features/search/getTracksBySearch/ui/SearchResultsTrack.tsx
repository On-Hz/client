import { SearchSectionWrapper } from "@/widgets/search/searchSectionWrapper";
import { mockTracks } from "../api/getTracks";
import { sectionProps } from "../../config/sectionProps";
import { TrackListItem } from "@/shared/ui/trackList/trackListItem";

// 추후 개발
export const SearchResultsTrack = ({
  hasShowMoreTab,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useInfiniteScroll,
}: sectionProps) => (
  <SearchSectionWrapper
    title="노래"
    linkTo="track"
    hasShowMoreTab={hasShowMoreTab}
  >
    <ul className="space-y-2">
      {mockTracks.map((track) => (
        <TrackListItem
          id={track.id}
          title={track.title}
          artist={track.artist}
          cover={track.cover}
          description={track.description}
        />
      ))}
    </ul>
  </SearchSectionWrapper>
);
