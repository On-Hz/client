import { AlbumPage } from "@/pages/album";
import { ArtistPage } from "@/pages/artist";
import { ArtistDiscography } from "@/pages/artist/ui/ArtistDiscography";
import { ArtistHome } from "@/pages/artist/ui/ArtistHome";
import { ArtistReviews } from "@/pages/artist/ui/ArtistReviews";
import { MainPage } from "@/pages/main";
import { SearchPage } from "@/pages/search";
import { SearchAlbums } from "@/pages/search/ui/SearchAlbums";
import { SearchArtists } from "@/pages/search/ui/SearchArtists";
import { SearchHome } from "@/pages/search/ui/SearchHome";
import { SearchTracks } from "@/pages/search/ui/SearchTracks";
import React from "react";
import { Routes, Route } from "react-router-dom";

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search/:searchSlug" element={<SearchPage />}>
        <Route index element={<SearchHome />} />
        <Route path="track" element={<SearchTracks />} />
        <Route path="artist" element={<SearchArtists />} />
        <Route path="album" element={<SearchAlbums />} />
      </Route>
      <Route path="/album" element={<AlbumPage />} />
      <Route path="/artist/:artistSlug/*" element={<ArtistPage />}>
        <Route index element={<ArtistHome />} />
        <Route path="discography" element={<ArtistDiscography />} />
        <Route path="reviews" element={<ArtistReviews />} />
      </Route>
    </Routes>
  );
};
