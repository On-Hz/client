import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Artist } from "../model/types";
import { mockTopArtistData } from "../api/getTopRateArtistList";
import { ArtistAvatar } from "@/shared/ui/artistAvatar/ArtistAvatar";

const renderArtistPage = (artists: Artist[]) => (
  <div className="">
    {artists.map((artist) => (
      <ArtistAvatar id={artist.id} avatar={artist.avatar} name={artist.name} />
    ))}
  </div>
);

export const TopRateArtists: React.FC = () => {
  return (
    <CarouselSection
      title="Top Artist"
      items={mockTopArtistData}
      renderPage={renderArtistPage}
    />
  );
};
