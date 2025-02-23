import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface TrackProps {
  id: number;
  title: string;
  artist: string;
  cover: string;
  description: string;
  rating?: number;
  setAnchorEl?: (element: HTMLElement | null) => void;
}

export const TrackListItem = ({
  id,
  cover,
  title,
  description,
  rating,
  setAnchorEl,
}: TrackProps) => {
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    if (setAnchorEl) {
      setAnchorEl(event.currentTarget);
    }
  };

  return (
    <li
      key={id}
      className="flex items-center justify-between px-2 py-3 transition-colors hover:bg-gray2"
    >
      <div className="flex items-center space-x-3">
        <img
          src={cover}
          alt={title}
          className="object-cover rounded-lg w-14 h-14"
        />
        <div>
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>

      {/* 오른쪽: 별(하나) + 평점, 햄버거 아이콘 */}
      <div className="flex items-center space-x-4">
        <IconButton onClick={handleMenuClick} size="small">
          <MoreVertIcon />
        </IconButton>
        <div className="flex items-center">
          <span className="text-xl text-yellow-400">★</span>
          <span className="ml-1 text-sm text-gray-600">{rating} / 5</span>
        </div>
      </div>
    </li>
  );
};
