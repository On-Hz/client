import { SearchSectionWrapper } from "@/widgets/search";
import { sectionProps } from "../../config/sectionProps";
import { useArtist } from "../api/getArtists";
import { ArtistAvatar, ArtistAvatarSkeleton } from "@/shared/ui";

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
              profilePath={artist.profilePath}
            />
          ))}
      </div>
    </SearchSectionWrapper>
  );
};
