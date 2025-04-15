import { Link } from "react-router-dom";
import FaceIcon from "@mui/icons-material/Face";
import "./style.css";
interface ArtistAvatarProps {
  id: number;
  profilePath: string | null;
  name: string;
  onClick?: () => void;
}

export const ArtistAvatar = ({ id, profilePath, name }: ArtistAvatarProps) => {
  return (
    <Link to={`/artist/${id}`} key={id} className="hz-artist-avatar text-center">
      <div className="overflow-hidden rounded-full hz-artist-item bg-gray3 m-auto mb-2">
        {profilePath ? (
          <img
            src={profilePath}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="p-10 text-center">
            <FaceIcon
              style={{ width: "100%", height: "100%" }}
              className="text-gray2"
            />
          </div>
        )}
      </div>
      <p>{name}</p>
    </Link>
  );
};
