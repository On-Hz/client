import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { AlbumPage } from "@/pages/album";
import {
  ArtistPage,
  ArtistHome,
  ArtistDiscography,
  ArtistReviews,
  ArtistTracks,
} from "@/pages/artist";
import { ErrorPage } from "@/pages/error";
import { LandingPage } from "@/pages/landing";
import {
  MyPage,
  MypageAlbum,
  MypageArtist,
  MypageLike,
  MypageSong,
} from "@/pages/mypage";
import { ReviewPage } from "@/pages/review";
import {
  SearchAlbums,
  SearchArtists,
  SearchHome,
  SearchTracks,
} from "@/pages/search";
import { SongPage } from "@/pages/song";

const SearchPage = lazy(() =>
  import("@/pages/search").then((module) => ({
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

      {/* AlbumId, SongId값 slug 넣어줘야함  */}
      <Route path="/album" element={<AlbumPage />} />
      <Route path="/song" element={<SongPage />} />

      {/* userId값 slug 넣어줘야함  */}
      <Route path="/mypage" element={<MyPage />}>
        <Route index element={<MypageAlbum />} />
        <Route path="album" element={<MypageAlbum />} />
        <Route path="song" element={<MypageSong />} />
        <Route path="artist" element={<MypageArtist />} />
        <Route path="like" element={<MypageLike />} />
      </Route>

      {/* ReviewId값 slug 넣어줘야함  */}
      <Route path="/review" element={<ReviewPage />} />
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
