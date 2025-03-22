import {
  CarouselSection,
  ArtistAvatar,
  ArtistAvatarSkeleton,
} from "@/shared/ui";
import { Artist } from "@/shared/model";
import { useTopArtists } from "../api/topRateArtistApi";

const renderArtistPage = (artists: Artist[]) => (
  <>
    {artists.map((artist) => (
      <ArtistAvatar
        key={artist.id}
        id={artist.id}
        profilePath={artist.profilePath}
        name={artist.name}
      />
    ))}
  </>
);
const renderSkeletonArtist = (): JSX.Element => (
  <div className="flex flex-wrap justify-center gap-4 pb-4">
    {Array.from({ length: 5 }, (_, idx) => (
      <ArtistAvatarSkeleton key={`album-skeleton-${idx}`} />
    ))}
  </div>
);

export const TopRateArtists: React.FC = () => {
  const { data, isLoading } = useTopArtists();
  return (
    <CarouselSection
      title="인기 아티스트"
      items={data || []}
      renderPage={renderArtistPage}
      isLoading={isLoading}
      skeletonArrLength={5}
      skeletonComp={renderSkeletonArtist}
    />
  );
};
