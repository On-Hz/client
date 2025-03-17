import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import "./style.css";
interface ArtistAvatarProps {
  id: number;
  profilePath: string | null;
  name: string;
  onClick?: () => void;
}

export const ArtistAvatar = ({ id, profilePath, name }: ArtistAvatarProps) => {
  return (
    <Link to={`/artist/${id}`} key={id} className="text-center">
      <div className="mb-2 overflow-hidden rounded-full hz-artist-item bg-gray3">
        {profilePath ? (
          <img
            src={profilePath}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="p-10 text-center">
            <FaUser
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
