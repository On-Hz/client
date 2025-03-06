import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Artist } from "../model/types";
import { useTopArtist } from "../api/getTopRateArtistList";
import { ArtistAvatar } from "@/shared/ui/artistAvatar/ArtistAvatar";
import { ArtistAvatarSkeleton } from "@/shared/ui/artistAvatar/ArtistAvatarSkeleton";

const renderArtistPage = (artists: Artist[]) => (
  <>
    {artists.map((artist) => (
      <ArtistAvatar
        key={artist.id}
        id={artist.id}
        avatar={artist.avatar}
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
  const { data, isLoading } = useTopArtist();
  return (
    <CarouselSection
      title="Top Artist"
      items={data || []}
      renderPage={renderArtistPage}
      isLoading={isLoading}
      skeletonArrLength={5}
      skeletonComp={renderSkeletonArtist}
    />
  );
};
