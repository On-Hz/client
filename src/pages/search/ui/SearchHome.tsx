import { Button } from "@/shared/ui/button/Button";
import React from "react";
import { NavLink, useParams } from "react-router-dom";
interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  description: string;
  rating: number; // 평균 평점
}
const mockTracks: Track[] = Array(4)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    cover: `https://picsum.photos/60/60?random=${i}`,
    description: "Lorem ipsum dolor sit amet, consectetur.",
    rating: 4.3,
  }));

interface Artist {
  id: number;
  name: string;
  avatar?: string;
}
const mockArtists: Artist[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i}`,
  }));

interface Album {
  id: number;
  title: string;
  quote?: string;
  cover?: string;
}

// 예시 목업 데이터
const mockAlbums: Album[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    quote: "“Quote”",
    cover: `https://picsum.photos/200/300?random=${i + 10}`,
  }));

interface SectionWrapperProps {
  title: string;
  linkTo: string;
  children: React.ReactNode;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  title,
  linkTo,
  children,
}) => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-bold">{title}</h2>
        <NavLink to={`/search/${searchSlug}/${linkTo}`}>
          <Button text="모두 표시" />
        </NavLink>
      </div>
      {children}
    </section>
  );
};

// ------------------- Track -------------------
const Tracks = () => (
  <SectionWrapper title="노래" linkTo="track">
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
  </SectionWrapper>
);

const Artists = () => (
  <SectionWrapper title="아티스트" linkTo="artist">
    <div className="flex justify-center gap-5 space-x-6">
      {mockArtists.map((artist) => (
        <div key={artist.id} className="flex flex-col items-center">
          <img
            src={artist.avatar}
            alt={artist.name}
            className="object-cover w-40 h-40 mb-2 rounded-full"
          />
          <p>{artist.name}</p>
        </div>
      ))}
    </div>
  </SectionWrapper>
);

// (C) Album: 한 슬라이드에 5개씩 (총 10개 → 2페이지)
const Albums = () => (
  <SectionWrapper title="앨범" linkTo="album">
    <div className="flex justify-center gap-5 pb-4 space-x-4">
      {mockAlbums.map((album) => (
        <div key={album.id} className="flex-shrink-0 w-40 rounded-lg bg-gray2">
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
  </SectionWrapper>
);

export const SearchHome: React.FC = () => {
  return (
    <div>
      <Tracks />
      <Artists />
      <Albums />
    </div>
  );
};
