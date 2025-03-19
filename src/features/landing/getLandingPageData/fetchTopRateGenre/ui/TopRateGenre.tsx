import React from "react";
import { CarouselSection, AlbumCard, AlbumCardSkeleton } from "@/shared/ui";
import { Genre } from "@/shared/model";
import { useTopGenre } from "../api/getTopRateGenreList";

const renderGenrePage = (GenreList: Genre[]) => (
  <div className="flex flex-wrap justify-center gap-4 pb-4">
    {GenreList.map((item) => (
      <AlbumCard
        key={item.id}
        id={item.id}
        title={item.code}
        cover={item.imagePath}
        isDifferentType={true}
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
