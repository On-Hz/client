import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
// import { Menu, MenuItem } from "@mui/material";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { TrackListItem, TrackListItemSkeleton } from "@/shared/ui";
import { sectionProps } from "../../config/sectionProps";
import { useArtistTopTracks } from "../api/getArtistTopTracksApi";
import { useInfiniteScroll as useInfiniteScrollQuery } from "@/shared/hooks";
import { Track } from "@/shared/model";
import { ORDER_BY } from "@/shared/constants";

export const TracksByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };
  const regularQuery = useArtistTopTracks(artistId, {
    enabled: !useInfiniteScroll,
  });
  const infiniteQuery = useInfiniteScrollQuery<Track, "createdAt">({
    endpoint: `/api/v1/artists/${artistId}/tracks`,
    limit: 5,
    orderBy: ORDER_BY.CREATED_AT,
    enabled: useInfiniteScroll,
    queryKeyPrefix: "tracks_artist",
  });

  const tracks = useInfiniteScroll
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

  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);

  // const handleMenuClose = () => {
  //   setAnchorEl(null);
  // };
  return (
    <ArtistSectionWrapper title={useInfiniteScroll ? "Tracks" : "Top Tracks"}>
      <ul className="space-y-2">
        {isLoading &&
          Array.from({ length: 5 }, (v, i) => (
            <TrackListItemSkeleton key={`search-skeleton-${i}`} />
          ))}
        {tracks &&
          tracks.map((track) => (
            <TrackListItem
              key={track.id}
              id={track.id}
              trackName={track.trackName}
              artist={
                track.artists?.find((artist) => artist.role === "main")?.name ||
                ""
              }
              coverPath={track.coverPath}
              duration={track.duration}
              rating={track.rating}
              // setAnchorEl={setAnchorEl}
            />
          ))}
        {useInfiniteScroll && infiniteQuery.hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </ul>
      {/* 
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Add to playlist</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose}>View details</MenuItem>
      </Menu> */}
    </ArtistSectionWrapper>
  );
};
