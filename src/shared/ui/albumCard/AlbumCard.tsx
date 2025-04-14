import { Link } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { formatDate } from "@/shared/helpers";
import "./style.css";

interface AlbumProps {
  id: number;
  title: string;
  artist?: string;
  releaseDate?: string;
  coverPath?: string;
  isDifferentType?: boolean;
}
export const AlbumCard = ({
  id,
  title,
  artist,
  coverPath,
  releaseDate,
  isDifferentType,
}: AlbumProps) => {
  return (
    <Link to={isDifferentType ? `/genre/${title}` : `/album/${id}`}
      key={id}
      className="relative flex-shrink-0 rounded-lg hz-album-item bg-gray2"
    >
      <div className="overflow-hidden rounded-lg rounded-b-none rounded-bl-none aspect-square">        
        {coverPath ? (
          <img
            src={coverPath}
            alt={title}
            className="object-cover w-full aspect-square"
          />
        ) : (
          <div className="object-cover w-full aspect-square bg-gray3">
            <MusicNoteIcon
              style={{ width: "100%", height: "100%" }}
              className="text-gray2"
            />
          </div>
        )}
      </div>
      <div className="p-5 space-y-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{artist ? artist : (releaseDate ? formatDate(releaseDate) : "")}</p>
      </div>
    </Link>
  );
};
