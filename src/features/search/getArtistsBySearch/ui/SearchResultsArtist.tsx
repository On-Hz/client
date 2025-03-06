import { SearchSectionWrapper } from "@/widgets/search/searchSectionWrapper";
import { sectionProps } from "../../config/sectionProps";
import { useArtist } from "../api/getArtists";
import { ArtistAvatar } from "@/shared/ui/artistAvatar/ArtistAvatar";
import { ArtistAvatarSkeleton } from "@/shared/ui/artistAvatar/ArtistAvatarSkeleton";

export const SearchResultsArtist = ({
  hasShowMoreTab,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useInfiniteScroll,
}: sectionProps) => {
  const { data, isLoading } = useArtist();
  return (
    <SearchSectionWrapper
      title="아티스트"
      linkTo="artist"
      hasShowMoreTab={hasShowMoreTab}
    >
      <div className="flex justify-center gap-5 space-x-6">
        {isLoading &&
          Array.from({ length: 5 }, (_, i) => (
            <ArtistAvatarSkeleton key={`search-skeleton-${i}`} />
          ))}
        {!isLoading && data &&
          data.map((artist) => (
            <ArtistAvatar
              key={artist.id}
              id={artist.id}
              name={artist.name}
              avatar={artist.avatar}
            />
          ))}
      </div>
    </SearchSectionWrapper>
  );
};
