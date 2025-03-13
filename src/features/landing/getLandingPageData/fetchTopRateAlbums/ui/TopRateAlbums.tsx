import { useTopAlbum } from "../api/getTopRateAlbumList";
import { getGridStyles } from "@/shared/helpers";
import { AlbumSkeleton } from "./TopRateAlbumSkeleton";

const AlbumItem: React.FC = () => {
  const { data, isLoading } = useTopAlbum();
  if (isLoading) return <AlbumSkeleton />;
  return (
    <div className="hz-landing-album-gridlayout">
      {data &&
        data.map((item: any, index: number) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg cursor-pointer border-gray5 hz-landing-album-item"
            style={getGridStyles(index)}
          >
            <div className="mb-2">
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-neutral-500">{item.artist}</p>
            </div>
            <img
              src={item.cover}
              alt={item.title}
              className="object-cover w-full rounded-lg aspect-square"
            />
          </div>
        ))}
    </div>
  );
};

export const TopRateAlbums: React.FC = () => {
  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">인기 앨범</h2>
      <AlbumItem />
    </section>
  );
};
