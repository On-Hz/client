import React from "react";
import { mockTracks } from "../api/getArtistTopTracks";
import { Menu, MenuItem } from "@mui/material";
import { TrackListItem } from "@/shared/ui/trackList/trackListItem";
import { sectionProps } from "../../config/sectionProps";
import { ArtistSectionWrapper } from "@/widgets/artist/artistSectionWrapper.tsx/ui/ArtistSectionWrapper";

export const TracksByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <ArtistSectionWrapper title={useInfiniteScroll ? "Tracks" : "Top Tracks"}>
      <ul className="space-y-2">
        {mockTracks.map((track) => (
          <TrackListItem
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
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{ style: { maxHeight: 200 } }}
      >
        <MenuItem onClick={handleMenuClose}>Add to playlist</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose}>View details</MenuItem>
      </Menu>
    </ArtistSectionWrapper>
  );
};
