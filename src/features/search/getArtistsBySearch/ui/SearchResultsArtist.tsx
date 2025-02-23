import { SearchSectionWrapper } from "@/widgets/search/searchSectionWrapper";
import { sectionProps } from "../../config/sectionProps";
import { mockArtists } from "../api/getArtists";
import { ArtistAvatar } from "@/shared/ui/artistAvatar/ArtistAvatar";

export const SearchResultsArtist = ({
  hasShowMoreTab,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useInfiniteScroll,
}: sectionProps) => (
  <SearchSectionWrapper
    title="아티스트"
    linkTo="artist"
    hasShowMoreTab={hasShowMoreTab}
  >
    <div className="flex justify-center gap-5 space-x-6">
      {mockArtists.map((artist) => (
        <ArtistAvatar
          id={artist.id}
          name={artist.name}
          avatar={artist.avatar}
        />
      ))}
    </div>
  </SearchSectionWrapper>
);
