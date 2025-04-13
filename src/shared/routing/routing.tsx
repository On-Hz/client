import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { NotFoundRoute } from "./NotFoundRoute";
import NaverCallback from "@/features/auth/social/naver/ui/NaverCallback";
import KakaoCallback from "@/features/auth/social/kakao/ui/KakaoCallback";

//Lazy 로딩을 위한 페이지 매핑 (객체화)
const pages = {
  landing: lazy(() =>
    import("@/pages/landing").then((module) => ({
      default: module.LandingPage,
    }))
  ),
  search: lazy(() =>
    import("@/pages/search").then((m) => ({ default: m.SearchPage }))
  ),
  searchHome: lazy(() =>
    import("@/pages/search").then((m) => ({ default: m.SearchHome }))
  ),
  searchTracks: lazy(() =>
    import("@/pages/search").then((m) => ({ default: m.SearchTracks }))
  ),
  searchArtists: lazy(() =>
    import("@/pages/search").then((m) => ({ default: m.SearchArtists }))
  ),
  searchAlbums: lazy(() =>
    import("@/pages/search").then((m) => ({ default: m.SearchAlbums }))
  ),

  artist: lazy(() =>
    import("@/pages/artist").then((m) => ({ default: m.ArtistPage }))
  ),
  artistHome: lazy(() =>
    import("@/pages/artist").then((m) => ({ default: m.ArtistHome }))
  ),
  artistDiscography: lazy(() =>
    import("@/pages/artist").then((m) => ({ default: m.ArtistDiscography }))
  ),
  artistReviews: lazy(() =>
    import("@/pages/artist").then((m) => ({ default: m.ArtistReviews }))
  ),
  artistTracks: lazy(() =>
    import("@/pages/artist").then((m) => ({ default: m.ArtistTracks }))
  ),

  album: lazy(() =>
    import("@/pages/album").then((m) => ({ default: m.AlbumPage }))
  ),
  track: lazy(() =>
    import("@/pages/track").then((m) => ({ default: m.TrackPage }))
  ),

  mypage: lazy(() =>
    import("@/pages/mypage").then((m) => ({ default: m.MyPage }))
  ),
  mypageAlbum: lazy(() =>
    import("@/pages/mypage").then((m) => ({ default: m.MypageAlbum }))
  ),
  mypageTrack: lazy(() =>
    import("@/pages/mypage").then((m) => ({ default: m.MypageTrack }))
  ),
  mypageArtist: lazy(() =>
    import("@/pages/mypage").then((m) => ({ default: m.MypageArtist }))
  ),
  mypageLike: lazy(() =>
    import("@/pages/mypage").then((m) => ({ default: m.MypageLike }))
  ),

  review: lazy(() =>
    import("@/pages/review").then((m) => ({ default: m.ReviewPage }))
  ),
  genre: lazy(() =>
    import("@/pages/genre").then((m) => ({ default: m.GenrePage }))
  ),
  privacy: lazy(() =>
    import("@/pages/legal/privacy").then((m) => ({ default: m.PrivacyPage }))
  ),
  terms: lazy(() =>
    import("@/pages/legal/terms").then((m) => ({ default: m.TermsPage }))
  ),
};

export const Routing: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<pages.landing />} />
      <Route path="/search/:searchSlug" element={<pages.search />}>
        <Route index element={<pages.searchHome />} />
        <Route path="track" element={<pages.searchTracks />} />
        <Route path="artist" element={<pages.searchArtists />} />
        <Route path="album" element={<pages.searchAlbums />} />
      </Route>
      <Route path="/artist/:artistId/*" element={<pages.artist />}>
        <Route index element={<pages.artistHome />} />
        <Route path="discography" element={<pages.artistDiscography />} />
        <Route path="reviews" element={<pages.artistReviews />} />
        <Route path="tracks" element={<pages.artistTracks />} />
      </Route>

      <Route path="/album/:albumId" element={<pages.album />} />
      <Route path="/track/:trackId" element={<pages.track />} />

      <Route element={<PrivateRoute />}>
        <Route path="/mypage/:userId/*" element={<pages.mypage />}>
          <Route index element={<pages.mypageAlbum />} />
          <Route path="album" element={<pages.mypageAlbum />} />
          <Route path="track" element={<pages.mypageTrack />} />
          <Route path="artist" element={<pages.mypageArtist />} />
          <Route path="like" element={<pages.mypageLike />} />
        </Route>
      </Route>

      <Route path="/review/:reviewId" element={<pages.review />} />
      <Route path="/genre/:genreCode" element={<pages.genre />} />
      <Route path="/privacy" element={<pages.privacy />} />
      <Route path="/terms" element={<pages.terms />} />
      <Route path="/naver-callback" element={<NaverCallback />} />
      <Route path="/kakao-callback" element={<KakaoCallback />} />
      <Route path="*" element={<NotFoundRoute />} />
    </Routes>
  );
};
