import React from "react";
import CarouselSection from "@/shared/ui/carousel/Carousel";
import { GenreItem } from "../model/types";
import { useTopGenre } from "../api/getTopRateGenreList";
import { AlbumCard } from "@/shared/ui/albumCard/AlbumCard";
import { AlbumCardSkeleton } from "@/shared/ui/albumCard/AlbumCardSkeleton";

const renderGenrePage = (GenreItem: GenreItem[]) => (
  <div className="flex flex-wrap justify-center gap-4 pb-4">
    {GenreItem.map((item) => (
      <AlbumCard
        key={item.id}
        id={item.id}
        title={item.title}
        cover={item.cover}
        artist={item.artist}
      />
    ))}
  </div>
);

const renderSkeletonGenre = (): JSX.Element => (
  <div className="flex flex-wrap justify-center gap-4 pb-4">
    {Array.from({ length: 5 }, (_, idx) => (
      <AlbumCardSkeleton key={`genre-skeleton-${idx}`} />
    ))}
  </div>
);

export const TopRateGenre: React.FC = () => {
  const { data, isLoading } = useTopGenre();
  return (
    <CarouselSection
      title="장르 별 인기 앨범"
      items={data || []}
      renderPage={renderGenrePage}
      isLoading={isLoading}
      skeletonArrLength={5}
      skeletonComp={renderSkeletonGenre}
    />
  );
};
