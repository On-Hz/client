import { mockTopRateGenreData } from "../api/getTopRateGenreList";

const computeLocalStart = (index: number, columns: number): number =>
  Math.floor(index / columns) * 2 +
  (columns === 3 ? (index % 3 === 1 ? 2 : 1) : index % 2 === 0 ? 1 : 2);

export const GenreCard: React.FC = () => {
  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">Top Rate Genre</h2>
      <div className="hz-landing-genre-gridlayout">
        {mockTopRateGenreData.map((item, index) => (
          <div
            key={item.id}
            className="p-4 border rounded-lg cursor-pointer hz-landing-genre-item"
            style={
              {
                "--local-2-columns-grid-start": computeLocalStart(index, 2),
                "--local-3-columns-grid-start": computeLocalStart(index, 3),
                "--local-4-columns-grid-start": computeLocalStart(index, 4),
                "--local-6-columns-grid-start": computeLocalStart(index, 6),
              } as React.CSSProperties
            }
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
    </section>
  );
};
