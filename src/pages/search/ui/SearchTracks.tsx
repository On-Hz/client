import React from "react";
interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  description: string;
  rating: number; // 평균 평점
}
const mockTracks: Track[] = Array(14)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    cover: `https://picsum.photos/60/60?random=${i}`,
    description: "Lorem ipsum dolor sit amet, consectetur.",
    rating: 4.3,
  }));
export const SearchTracks: React.FC = () => {
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">노래</h2>
      </div>
      <ul className="space-y-2">
        {mockTracks.map((track) => (
          <li
            key={track.id}
            className="flex items-center justify-between px-2 py-3 transition-colors hover:bg-gray2"
          >
            <div className="flex items-center space-x-3">
              <img
                src={track.cover}
                alt={track.title}
                className="object-cover rounded-lg w-14 h-14"
              />
              <div>
                <p className="font-semibold">{track.title}</p>
                <p className="text-sm text-gray-500">{track.description}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
