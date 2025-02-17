import React from "react";

interface Album {
  id: number;
  title: string;
  quote?: string;
  cover?: string;
}

// 예시 목업 데이터
const mockAlbums: Album[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    quote: "“Quote”",
    cover: `https://picsum.photos/200/300?random=${i + 10}`,
  }));
export const SearchAlbums: React.FC = () => {
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">아티스트</h2>
      </div>{" "}
      <div className="grid grid-cols-6 gap-5">
        {mockAlbums.map((album) => (
          <div
            key={album.id}
            className="flex-shrink-0 w-40 mb-6 rounded-lg bg-gray2"
          >
            <div className="overflow-hidden rounded-lg aspect-square">
              <img
                src={album.cover}
                alt={album.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="px-2 py-2 space-y-1">
              <p className="text-xs text-gray-500">Label</p>
              <p className="text-sm font-medium">{album.title}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
