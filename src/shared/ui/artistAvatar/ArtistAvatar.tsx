interface ArtistAvatarProps {
  id: number;
  avatar?: string;
  name: string;
}

export const ArtistAvatar = ({ id, avatar, name }: ArtistAvatarProps) => {
  return (
    <div key={id} className="flex flex-col items-center">
      <img
        src={avatar}
        alt={name}
        className="object-cover mb-2 rounded-full h-36 w-36"
      />
      <p>{name}</p>
    </div>
  );
};
