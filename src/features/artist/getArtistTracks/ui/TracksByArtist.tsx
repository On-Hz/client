import React from "react";
import { useArtistTopTracks } from "../api/getArtistTopTracks";
import { useArtistTracks } from "../api/getArtistTracks";
import { Menu, MenuItem } from "@mui/material";
import { TrackListItem } from "@/shared/ui/trackList/trackListItem";
import { sectionProps } from "../../config/sectionProps";
import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper";
import { TrackListItemSkeleton } from "@/shared/ui/trackList/trackListItemSkeleton";

export const TracksByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const regularQuery = useArtistTopTracks({ enabled: !useInfiniteScroll });
  const infiniteQuery = useArtistTracks({
    enabled: useInfiniteScroll,
  });
  const { data, isLoading } = useInfiniteScroll ? infiniteQuery : regularQuery;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ArtistSectionWrapper title={useInfiniteScroll ? "Tracks" : "Top Tracks"}>
      <ul className="space-y-2">
        {isLoading &&
          Array.from({ length: 5 }, (v, i) => (
            <TrackListItemSkeleton key={`search-skeleton-${i}`} />
          ))}
        {data &&
          data.map((track) => (
            <TrackListItem
              key={track.id}
              id={track.id}
              title={track.title}
              artist={track.artist}
              cover={track.cover}
              description={track.description}
              rating={track.rating}
              setAnchorEl={setAnchorEl}
            />
          ))}
      </ul>

      {/* MUI Menu (공용) */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>Add to playlist</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose}>View details</MenuItem>
      </Menu>
    </ArtistSectionWrapper>
  );
};
