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
      className="flex-shrink-0 rounded-lg w-36 bg-gray2 max-500:w-24 max-800:w-28 max-1000:w-32 max-1200:w-36 max-1300:w-40"
    >
      <div className="overflow-hidden rounded-lg aspect-square">
        <img
          src={cover}
          alt={title}
          className="object-cover w-full aspect-square"
        />
      </div>
      <div className="px-2 py-2 space-y-1">
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-medium">{artist ? artist : release}</p>
      </div>
    </div>
  );
};
