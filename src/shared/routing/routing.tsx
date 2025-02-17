import { AlbumPage } from "@/pages/album";
import { ArtistPage } from "@/pages/artist";
import { ArtistDiscography } from "@/pages/artist/ui/ArtistDiscography";
import { ArtistHome } from "@/pages/artist/ui/ArtistHome";
import { ArtistReviews } from "@/pages/artist/ui/ArtistReviews";
import { MainPage } from "@/pages/main";
import { SearchPage } from "@/pages/search";
import React from "react";
import { Routes, Route } from "react-router-dom";

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/album" element={<AlbumPage />} />
      {/* 동적 파라미터 :artistSlug 추가 */}
      <Route path="/artist/:artistSlug/*" element={<ArtistPage />}>
        <Route index element={<ArtistHome />} />
        <Route path="discography" element={<ArtistDiscography />} />
        <Route path="reviews" element={<ArtistReviews />} />
      </Route>
    </Routes>
  );
};
