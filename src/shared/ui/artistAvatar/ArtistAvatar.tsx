import './style.css';
interface ArtistAvatarProps {
  id: number;
  avatar?: string;
  name: string;
}

export const ArtistAvatar = ({ id, avatar, name }: ArtistAvatarProps) => {
  return (
    <div key={id} className="text-center">
      <div className="hz-artist-item mb-2 rounded-full overflow-hidden">
        <img
          src={avatar}
          alt={name}
          className="object-cover w-full h-full"
        />
      </div>
      <p>{name}</p>
    </div>
  );
};
