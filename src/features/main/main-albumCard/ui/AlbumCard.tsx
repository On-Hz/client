import React from "react";
import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Album } from "../model/types";
import { mockTopRateAlbumData } from "../api/getTopRateAlbumList";

const renderAlbumPage = (albums: Album[]) => (
  <div className="flex justify-center gap-4 pb-4">
    {albums.map((album) => (
      <div key={album.id} className="flex-shrink-0 w-40 rounded-lg bg-gray2">
        <div className="overflow-hidden rounded-lg aspect-square">
          <img
            src={album.cover}
            alt={album.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="px-2 py-2 space-y-1">
          <p className="text-xs text-gray-500">Label</p>
          <p className="text-sm font-medium">{album.title}</p>
        </div>
      </div>
    ))}
  </div>
);

export const AlbumCard: React.FC = () => {
  return (
    <CarouselSection
      title="Top Rate Album"
      items={mockTopRateAlbumData}
      renderPage={renderAlbumPage}
    />
  );
};
