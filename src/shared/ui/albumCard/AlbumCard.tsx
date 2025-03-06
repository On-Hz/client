import "./style.css";
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
    <div key={id} className="relative flex-shrink-0 rounded-lg hz-album-item bg-gray2">
      <div className="overflow-hidden rounded-lg rounded-b-none rounded-bl-none aspect-square">
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
