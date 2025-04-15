import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { formatDuration } from "@/shared/helpers";

interface TrackProps {
  id: number;
  title: string;
  artist?: string;
  coverPath: string;
  duration: number;
  rating?: number;

}

export const TrackListItem = ({
  id,
  coverPath,
  artist,
  title,
  duration,
  rating,
}:
TrackProps) => {


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
          <div className="flex-1 min-w-0">
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-500">{artist}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 track-right-item max-500:flex-col max-500:items-end">
          <span className="text-sm text-gray-600">{formatDuration(duration)}</span>
          <div className="flex items-center">
            <StarIcon
              className="text-yellow"
              style={{ width: "20px", height: "20px" }}
            />
            <span className="ml-[2px] text-sm text-gray-600">
              {rating ? `${rating} / 5` : "0 / 5"}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
};
