import './style.css';
interface AlbumProps {
  id: number;
  title: string;
  artist?: string;
  release?: string;
  cover?: string;
}
export const AlbumCard = ({
  id,
  title,
  artist,
  cover,
  release,
}: AlbumProps) => {
  return (
    <div
      key={id}
      className="hz-album-item flex-shrink-0 rounded-lg bg-gray2"
    >
      <div className="overflow-hidden rounded-lg aspect-square rounded-b-none rounded-bl-none">
        <img
          src={cover}
          alt={title}
          className="object-cover w-full aspect-square"
        />
      </div>
      <div className="p-5 space-y-1">
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-medium">{artist ? artist : release}</p>
      </div>
    </div>
  );
};
