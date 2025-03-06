import { useTopGenre } from "../api/getTopRateGenreList";
import { getGridStyles } from "@/shared/helpers";
import { GenreSkeleton } from "./TopRateGenreSkeleton";

const GenreItem: React.FC = () => {
  const { data, isLoading } = useTopGenre();
  if (isLoading) return <GenreSkeleton />;
  return (
    <div className="hz-landing-genre-gridlayout">
      {data &&
        data.map((item: any, index: number) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg cursor-pointer border-gray5 hz-landing-genre-item"
            style={getGridStyles(index)}
          >
            <div className="mb-2">
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-neutral-500">Description</p>
            </div>
            <img
              src={item.img}
              alt={item.title}
              className="object-cover w-full rounded-lg aspect-square"
            />
          </div>
        ))}
    </div>
  );
};

export const TopRateGenre: React.FC = () => {
  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">Top Rate Genre</h2>
      <GenreItem />
    </section>
  );
};
