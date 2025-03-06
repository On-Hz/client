import React from "react";
import CarouselSection from "@/shared/ui/carousel/Carousel";
import { Album } from "../model/types";
import { useTopAlbum } from "../api/getTopRateAlbumList";
import { AlbumCard } from "@/shared/ui/albumCard/AlbumCard";
import { AlbumCardSkeleton } from "@/shared/ui/albumCard/AlbumCardSkeleton";

const renderAlbumPage = (albums: Album[]) => (
  <div className="flex flex-wrap justify-center gap-4 pb-4">
    {albums.map((album) => (
      <AlbumCard
        key={album.id}
        id={album.id}
        title={album.title}
        cover={album.cover}
        artist={album.artist}
      />
    ))}
  </div>
);

const renderSkeletonAlbum = (): JSX.Element => (
  <div className="flex flex-wrap justify-center gap-4 pb-4">
    {Array.from({ length: 5 }, (_, idx) => (
      <AlbumCardSkeleton key={`album-skeleton-${idx}`} />
    ))}
  </div>
);

export const TopRateAlbums: React.FC = () => {
  const { data, isLoading } = useTopAlbum();
  return (
    <CarouselSection
      title="Top Rate Album"
      items={data || []}
      renderPage={renderAlbumPage}
      isLoading={isLoading}
      skeletonArrLength={5}
      skeletonComp={renderSkeletonAlbum}
    />
  );
};
