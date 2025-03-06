import { AlbumPage } from "@/pages/album";
import { ArtistPage } from "@/pages/artist";
import { ArtistDiscography } from "@/pages/artist/ui/ArtistDiscography";
import { ArtistHome } from "@/pages/artist/ui/ArtistHome";
import { ArtistReviews } from "@/pages/artist/ui/ArtistReviews";
import { ArtistTracks } from "@/pages/artist/ui/ArtistTracks";
import { ErrorPage } from "@/pages/error";
import { LandingPage } from "@/pages/landing";
import { MypageAlbum } from "@/pages/mypage/reviews/ui/MypageAlbum";
import { MypageArtist } from "@/pages/mypage/reviews/ui/MypageArtist";
import { MypageLike } from "@/pages/mypage/reviews/ui/MypageLike";
import { MypageSong } from "@/pages/mypage/reviews/ui/MypageSong";
import { MyPage } from "@/pages/mypage/ui/Mypage";
import { SearchAlbums } from "@/pages/search/ui/SearchAlbums";
import { SearchArtists } from "@/pages/search/ui/SearchArtists";
import { SearchHome } from "@/pages/search/ui/SearchHome";
import { SearchTracks } from "@/pages/search/ui/SearchTracks";
import { SongPage } from "@/pages/song/ui/SongPage";
import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const SearchPage = lazy(() => import("@/pages/search").then((module) => ({
  default: module.SearchPage,
}))
);
export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/search/:searchSlug" element={<SearchPage />}>
        <Route index element={<SearchHome />} />
        <Route path="track" element={<SearchTracks />} />
        <Route path="artist" element={<SearchArtists />} />
        <Route path="album" element={<SearchAlbums />} />
      </Route>
      <Route path="/artist/:artistSlug/*" element={<ArtistPage />}>
        <Route index element={<ArtistHome />} />
        <Route path="discography" element={<ArtistDiscography />} />
        <Route path="reviews" element={<ArtistReviews />} />
        <Route path="tracks" element={<ArtistTracks />} />
      </Route>
      <Route path="/album" element={<AlbumPage />} />
      <Route path="/song" element={<SongPage />} />

      <Route path="/mypage" element={<MyPage />}>
        <Route index element={<MypageAlbum />} />
        <Route path="album" element={<MypageAlbum />} />
        <Route path="song" element={<MypageSong />} />
        <Route path="artist" element={<MypageArtist />} />
        <Route path="like" element={<MypageLike />} />
      </Route>
      <Route
        path="*"
        element={
          <ErrorPage
            error={Object.assign(new Error("404 Not Found"), {
              status: 404,
              name: "NotFoundError",
            })}
            resetErrorBoundary={() => window.location.reload()}
          />
        }
      />
    </Routes>
  );
};
