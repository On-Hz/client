import React from "react";

interface Artist {
  id: number;
  name: string;
  avatar?: string;
}
const mockArtists: Artist[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i}`,
  }));
export const SearchArtists: React.FC = () => {
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">아티스트</h2>
      </div>
      <div className="grid grid-cols-6 gap-5">
        {mockArtists.map((artist) => (
          <div key={artist.id} className="flex flex-col items-center mb-6">
            <img
              src={artist.avatar}
              alt={artist.name}
              className="object-cover w-40 h-40 mb-2 rounded-full"
            />
            <p>{artist.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
