import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { AlbumCard, AlbumCardSkeleton } from "@/shared/ui";
import { sectionProps } from "../../config/sectionProps";
import { useArtistTopDiscography } from "../api/getArtistTopDiscographyApi";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { Album } from "@/shared/model";
import { ORDER_BY } from "@/shared/constants";
import "./style.css";

export const DiscographyByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };
  const regularQuery = useArtistTopDiscography(artistId, {
    enabled: !useInfiniteScroll,
  });
  const infiniteQuery = useInfiniteScrollQuery<Album>({
    endpoint: `/api/v1/artists/${artistId}/albums`,
    limit: 5,
    orderBy: ORDER_BY.CREATED_AT,
    enabled: useInfiniteScroll,
    queryKeyPrefix: "discography_artist",
  });

  const albums = useInfiniteScroll
    ? infiniteQuery.data?.pages.flat() ?? []
    : regularQuery.data ?? [];

  const isLoading = useInfiniteScroll
    ? infiniteQuery.isLoading
    : regularQuery.isLoading;

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (
      useInfiniteScroll &&
      inView &&
      infiniteQuery.hasNextPage &&
      !infiniteQuery.isFetchingNextPage
    ) {
      infiniteQuery.fetchNextPage();
    }
  }, [
    inView,
    useInfiniteScroll,
    infiniteQuery.hasNextPage,
    infiniteQuery.isFetchingNextPage,
    infiniteQuery.fetchNextPage,
  ]);

  return (
    <ArtistSectionWrapper title={"Discography"}>
      <div className="flex flex-wrap gap-4 hz-dscography">
        {isLoading &&
          Array.from({ length: 5 }, (_, i) => (
            <AlbumCardSkeleton key={`search-skeleton-${i}`} />
          ))}
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            id={album.id}
            title={album.title}
            coverPath={album.coverPath}
            createdAt={album.createdAt}
          />
        ))}

        {useInfiniteScroll && infiniteQuery.hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </ArtistSectionWrapper>
  );
};
