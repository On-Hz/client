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
    <div key={id} className="flex-shrink-0 w-40 rounded-lg bg-gray2">
      <div className="overflow-hidden rounded-lg aspect-square">
        <img src={cover} alt={title} className="object-cover w-full h-full" />
      </div>
      <div className="px-2 py-2 space-y-1">
        <p className="text-xs text-gray-500">{title}</p>
        <p className="text-sm font-medium">{artist ? artist : release}</p>
      </div>
    </div>
  );
};
