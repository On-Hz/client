import { Link } from "react-router-dom";
// import { IconButton } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

interface TrackProps {
  id: number;
  title: string;
  artist?: string;
  coverPath: string;
  duration: string;
  rating?: number;
  // setAnchorEl?: (element: HTMLElement | null) => void;
}

export const TrackListItem = ({
  id,
  coverPath,
  artist,
  title,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  duration,
  rating,
}: // setAnchorEl,
TrackProps) => {
  // const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
  //   if (setAnchorEl) {
  //     setAnchorEl(event.currentTarget);
  //   }
  // };

  return (
    <li key={id}>
      <Link
        to={`/track/${id}`}
        className="flex items-center justify-between px-2 py-3 transition-colors hover:bg-gray2"
      >
        <div className="flex items-center flex-1 min-w-0">
          {coverPath ? (
            <img
              src={coverPath}
              alt={title}
              className="object-cover mr-5 rounded-lg w-14 h-14"
            />
          ) : (
            <div className="object-cover mr-5 rounded-lg w-14 h-14 bg-gray3">
              <MusicNoteIcon
                style={{ width: "100%", height: "100%" }}
                className="text-gray2"
              />
            </div>
          )}
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{artist}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* <IconButton onClick={handleMenuClick} size="small">
              <MoreVertIcon />
            </IconButton> */}
          <div className="flex items-center">
            <span className="text-xl text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">{rating} / 5</span>
          </div>
        </div>
      </Link>
    </li>
  );
};
