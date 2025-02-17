interface Album {
  id: number;
  title: string;
  quote?: string;
  cover?: string;
}

const mockTopRateAlbumData: Album[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    quote: "“Quote”",
    cover: `https://picsum.photos/200/300?random=${i}`,
  }));

export const ArtistDiscography: React.FC = () => {
  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Discography</h2>
      {/* 한 줄에 5개씩 => grid-cols-5 */}
      <div className="grid grid-cols-5 gap-4">
        {mockTopRateAlbumData.map((album) => (
          <div
            key={album.id}
            className="border-0 hover:border-2 rounded-xl bg-gray2 hover:border-point"
          >
            <div className="overflow-hidden rounded-t-lg aspect-square">
              <img
                src={album.cover}
                alt={album.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-2">
              <p className="text-xs text-gray-500">Label</p>
              <p className="text-sm font-medium">{album.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
