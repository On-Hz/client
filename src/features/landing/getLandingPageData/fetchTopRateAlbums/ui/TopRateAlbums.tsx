import React from "react";
import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Album } from "../model/types";
import { mockTopRateAlbumData } from "../api/getTopRateAlbumList";
import { AlbumCard } from "@/shared/ui/albumCard/AlbumCard";

const renderAlbumPage = (albums: Album[]) => (
  <div className="flex justify-center gap-4 pb-4">
    {albums.map((album) => (
      <AlbumCard
        id={album.id}
        title={album.title}
        cover={album.cover}
        artist={album.artist}
      />
    ))}
  </div>
);

export const TopRateAlbums: React.FC = () => {
  return (
    <CarouselSection
      title="Top Rate Album"
      items={mockTopRateAlbumData}
      renderPage={renderAlbumPage}
    />
  );
};
