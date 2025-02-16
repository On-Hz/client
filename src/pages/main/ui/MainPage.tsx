import React from "react";
import Carousel from "react-material-ui-carousel";
import Rating from "@mui/material/Rating";

interface GenreItem {
  id: number;
  title: string;
  img: string;
}

interface Artist {
  id: number;
  name: string;
  avatar?: string;
}

interface Album {
  id: number;
  title: string;
  quote?: string;
  cover?: string;
}

interface Review {
  id: number;
  reviewer: string; // 리뷰어 이름
  avatar: string; // 리뷰어 아바타 이미지
  cover: string; // 리뷰 대상 앨범(또는 사진)
  body: string; // 리뷰 내용
  rating: number; // 별점 (1~5)
}

// 예시용 더미 데이터
const mockTopRateGenreData: GenreItem[] = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Genre Title ${i + 1}`,
    img: `https://picsum.photos/200/300?random=${i}`,
  }));

const mockTopArtistData: Artist[] = Array(14)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `Artist ${i + 1}`,
    avatar: `https://picsum.photos/200/300?random=${i}`,
  }));

const mockTopRateAlbumData: Album[] = Array(10)
  .fill(null)
  .map((_, i) => ({
    id: i,
    title: `Album ${i + 1}`,
    quote: "“Quote”",
    cover: `https://picsum.photos/200/300?random=${i}`,
  }));

const mockLatestReviewsData: Review[] = Array(6)
  .fill(null)
  .map((_, i) => ({
    id: i,
    reviewer: `Reviewer ${i + 1}`,
    avatar: "https://picsum.photos/200/300?random=1",
    cover: "https://picsum.photos/200/300?random=2",
    body: `Review body ${i + 1}`,
    rating: i + 1, // 예시로 별 4개
  }));

// --------------------------------------------------
// 장르 섹션: GridLayout (Carousel 없이)
// --------------------------------------------------
interface GridLayoutProps {
  items: GenreItem[];
}
const GridLayout: React.FC<GridLayoutProps> = ({ items }) => {
  return (
    <div
      className="
        grid grid-cols-5 gap-4 
        [grid-template-rows:repeat(2,var(--spacing-4x)_max-content)_var(--spacing-4x)]
      "
    >
      {items.map((item, index) => {
        // 열 위치 (1~5)
        const colNumber = (index % 5) + 1;
        const colStartClass = `col-start-${colNumber}`;
        // 인덱스가 1 또는 3 (두번째, 네번째 열)인 경우 offset 적용
        const needsOffset = index % 5 === 1 || index % 5 === 3;
        const offsetClass = needsOffset ? "relative top-8" : "";
        return (
          <div
            key={item.id}
            className={`
              ${colStartClass}
              [grid-row:var(--local-6-columns-grid-start)/calc(var(--local-6-columns-grid-start)+2)]
              border p-4 rounded-lg ${offsetClass}
            `}
          >
            <div className="mb-2">
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-neutral-500">Description</p>
            </div>
            <img
              src={item.img}
              alt={item.title}
              className="object-cover w-full mb-2 rounded-lg h-52"
            />
          </div>
        );
      })}
    </div>
  );
};

// --------------------------------------------------
// 유틸리티: 배열을 chunk로 나누기
// --------------------------------------------------
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
}

// --------------------------------------------------
// 공통 CarouselSection 컴포넌트 (제네릭)
// --------------------------------------------------
interface CarouselSectionProps<T> {
  title: string;
  items: T[];
  chunkSize: number;
  renderPage: (pageItems: T[]) => JSX.Element;
}

function CarouselSection<T>({
  title,
  items,
  chunkSize,
  renderPage,
}: CarouselSectionProps<T>) {
  const pages = chunkArray(items, chunkSize);
  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <Carousel autoPlay={false} navButtonsAlwaysVisible indicators={false} cycleNavigation={false}>
        {pages.map((page, idx) => (
          <div key={idx} className="px-2">
            {renderPage(page)}
          </div>
        ))}
      </Carousel>
    </section>
  );
}

// --------------------------------------------------
// 각 섹션별 렌더링 함수 (Carousel 적용)
// --------------------------------------------------

// (A) Top Artist: 한 슬라이드에 7개씩 (총 14개 → 2페이지)
const renderArtistPage = (items: Artist[]) => (
  <div className="flex justify-center space-x-6">
    {items.map((artist) => (
      <div key={artist.id} className="flex flex-col items-center">
        <img
          src={artist.avatar}
          alt={artist.name}
          className="object-cover mb-2 rounded-full h-36 w-36"
        />
        <p>{artist.name}</p>
      </div>
    ))}
  </div>
);

// (B) Top Rate Album: 한 슬라이드에 5개씩 (총 10개 → 2페이지)
const renderAlbumPage = (items: Album[]) => (
  <div className="flex gap-4 pb-4">
    {items.map((album) => (
      <div key={album.id} className="flex-shrink-0 w-56 rounded-lg bg-gray2">
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
);

// (C) Latest Reviews: 한 슬라이드에 3개씩 (총 6개 → 2페이지)
const renderReviewPage = (items: Review[]) => (
  <div className="grid h-40 grid-cols-3 gap-4">
    {items.map((review) => (
      <div
        key={review.id}
        className="flex flex-col p-4 bg-white border rounded shadow"
      >
        {/* 상단: 리뷰어 (아바타+이름)와 별점 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={review.avatar}
              alt={review.reviewer}
              className="mr-2 rounded-full h-7 w-7"
            />
            <p className="font-semibold">{review.reviewer}</p>
          </div>
          <Rating value={review.rating} readOnly />
        </div>
        {/* 하단: 앨범 커버와 리뷰 텍스트 */}
        <div className="flex items-start gap-4 mt-4">
          <img
            src={review.cover}
            alt={review.reviewer}
            className="object-cover w-20 h-20 rounded"
          />
          <div>
            <p className="text-sm text-gray-600">{review.body}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// --------------------------------------------------
// MainPage: 최종 페이지
// --------------------------------------------------
export const MainPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl">
      {/* Top Rate Genre: 원래 GridLayout (Carousel 미적용) */}
      <section className="px-4 py-8">
        <h2 className="mb-4 text-2xl font-bold">Top Rate Genre</h2>
        <GridLayout items={mockTopRateGenreData} />
      </section>

      {/* Top Artist: Carousel, 14개 → 7개씩 2페이지 */}
      <CarouselSection
        title="Top Artist"
        items={mockTopArtistData}
        chunkSize={7}
        renderPage={renderArtistPage}
      />

      {/* Top Rate Album: Carousel, 10개 → 5개씩 2페이지 */}
      <CarouselSection
        title="Top Rate Album"
        items={mockTopRateAlbumData}
        chunkSize={5}
        renderPage={renderAlbumPage}
      />

      {/* Latest Reviews: Carousel, 6개 → 3개씩 2페이지 */}
      <CarouselSection
        title="Latest Reviews"
        items={mockLatestReviewsData}
        chunkSize={3}
        renderPage={renderReviewPage}
      />
    </div>
  );
};
