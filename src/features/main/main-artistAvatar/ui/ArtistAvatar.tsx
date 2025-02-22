import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Artist } from "../model/types";
import { mockTopArtistData } from "../api/getTopRateArtistList";

const renderArtistPage = (artists: Artist[]) => (
  <div className="flex justify-center space-x-6">
    {artists.map((artist) => (
      <div key={artist.id} className="flex flex-col items-center">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="object-cover mb-2 rounded-full h-36 w-36"
        />
        <p>{artist.name}</p>
      </div>
    ))}
  </div>
);

export const ArtistAvatar: React.FC = () => {
  return (
    <CarouselSection
      title="Top Artist"
      items={mockTopArtistData}
      renderPage={renderArtistPage}
    />
  );
};
