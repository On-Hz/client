import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Menu, MenuItem, Rating } from "@mui/material";
import React from "react";

/** 더미 데이터 예시 */

// (A) Top Track
interface Track {
  id: number;
  title: string;
  artist: string;
  cover: string;
  description: string;
  rating: number; // 평균 평점
}
const mockTracks: Track[] = Array(5)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Last Item ${i + 1}`,
    artist: "Jane Doe",
    cover: `https://picsum.photos/60/60?random=${i}`,
    description: "Lorem ipsum dolor sit amet, consectetur.",
    rating: 4.3,
  }));

// (B) Discography
interface Album {
  id: number;
  name: string;
  cover: string;
  subtext: string; // 예: "2.3M Plays" 등
}

// 예시 목업 데이터
const mockDiscography: Album[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name:
      [
        "Omah Lay",
        "Wizkid",
        "Lil Baby",
        "Burna Boy",
        "Wizkid",
        "Davido",
        "Lil Baby",
      ][i] ?? `Artist ${i + 1}`,
    cover: `https://picsum.photos/300/300?random=${i + 10}`,
    subtext:
      [
        "2.3M Plays",
        "10.2M Plays",
        "3.5M Plays",
        "6.4M Plays",
        "Madison (Legit)",
        "A better time",
        "My Turn(Deluxe)",
      ][i] ?? "Some subtext",
  }));

// (C) Top Reviews
interface Review {
  id: number;
  reviewer: string; // 리뷰어 이름
  avatar: string; // 리뷰어 아바타
  rating: number; // 별점 (0~5)
  body: string; // 리뷰 내용 (본문만)
}
const mockReviews: Review[] = Array(8)
  .fill(null)
  .map((_, i) => ({
    id: i,
    reviewer: `Reviewer name ${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    body: `Review body ${
      i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
      Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
      Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
  }));

// ------------------- Top Track -------------------
function TopTrack() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Top Track</h2>
      {/* divide-y 제거 */}
      <ul className="space-y-2">
        {mockTracks.map((track) => (
          <li
            key={track.id}
            // border/rounded 제거, hover:bg-gray-100만 남김
            className="flex items-center justify-between px-2 py-3 transition-colors hover:bg-gray2"
          >
            {/* 왼쪽: 커버 + 텍스트 */}
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

            {/* 오른쪽: 별(하나) + 평점, 햄버거 아이콘 */}
            <div className="flex items-center space-x-4">
              <IconButton onClick={handleMenuClick} size="small">
                <MoreVertIcon />
              </IconButton>
              <div className="flex items-center">
                <span className="text-xl text-yellow-400">★</span>
                <span className="ml-1 text-sm text-gray-600">
                  {track.rating} / 5
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* MUI Menu (공용) */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        PaperProps={{ style: { maxHeight: 200 } }}
      >
        <MenuItem onClick={handleMenuClose}>Add to playlist</MenuItem>
        <MenuItem onClick={handleMenuClose}>Share</MenuItem>
        <MenuItem onClick={handleMenuClose}>View details</MenuItem>
      </Menu>
    </section>
  );
}

// ------------------- Discography -------------------
function Discography() {
  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Discography</h2>
      <div className="flex gap-3 overflow-x-hidden">
        {mockDiscography.map((album) => (
          <div
            key={album.id}
            className="flex-shrink-0 text-center w-36 h-52 hover:bg-gray2 rounded-xl"
          >
            <img
              src={album.cover}
              alt={album.name}
              className="object-cover mb-2 h-34 w-34 rounded-xl"
            />
            <p className="font-semibold">{album.name}</p>
            <p className="text-sm text-gray-500">{album.subtext}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ------------------- Top Reviews -------------------
function TopReviews() {
  const [liked, setLiked] = React.useState(false);
  const onClick = () => {
    setLiked(!liked);
  };

  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Top Reviews</h2>

      <div className="grid grid-cols-4 gap-6">
        {mockReviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col h-64 p-5 border rounded-lg shadow-sm border-gray3"
          >
            {/* 상단: 리뷰어 정보 */}
            <div className="flex items-center mb-3 space-x-2">
              <img
                src={review.avatar}
                alt={review.reviewer}
                className="object-cover w-8 h-8 rounded-full"
              />
              <p className="text-sm font-semibold">{review.reviewer}</p>
            </div>

            {/* 별점: 리뷰어 아래에 위치 */}
            <Rating
              value={review.rating}
              readOnly
              size="small"
              className="mb-3"
            />

            {/* 리뷰 본문: 4줄까지만 표시, 나머지 ... 처리 */}
            <p className="overflow-hidden text-base leading-relaxed text-gray-600 line-clamp-4">
              {review.body}
            </p>

            {/* 하단: 비어있는 하트 아이콘(왼쪽) */}
            <div className="pt-4">
              <button onClick={onClick}>
                <FavoriteIcon
                  className={
                    liked ? "text-red" : "text-white stroke-black stroke-[2px]"
                  }
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export const ArtistHome: React.FC = () => {
  return (
    <div>
      {/* 홈 탭에서 여러 섹션을 한 번에 보여줄 수 있음 */}
      <TopTrack />
      <Discography />
      <TopReviews />
    </div>
  );
};
