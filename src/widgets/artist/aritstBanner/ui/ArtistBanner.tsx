import { useParams } from "react-router-dom";
import { ArtistRatingButton } from "../..//artistRatingButton/ui/ArtistRatingButton";
import { ArtistTabs } from "../../artistTabs/ui/ArtistTabs";
import { useArtistDetailInfo } from "@/features/artist";
import { ArtistBannerSkeleton } from "./ArtistBannerSkeleton";
import { REVIEW_TYPES } from "@/shared/constants";
import { useReviewRatingInfo } from "@/shared/api";
import './style.css';

export const ArtistBanner = () => {
  const { artistSlug } = useParams<{ artistSlug: string }>() as {
    artistSlug: string;
  };
  const { data: artistInfo, isLoading } = useArtistDetailInfo(artistSlug);
  const { data: ratingInfo } = useReviewRatingInfo(
    REVIEW_TYPES.ARTIST,
    artistSlug || ""
  );
  if (isLoading) {
    return <ArtistBannerSkeleton />;
  }
  if (!artistInfo) {
    return <ArtistBannerSkeleton />;
  }
  return (
    <div className="grid relative w-full h-[450px] bg-point hz-artist-banner">
      {/* 3열 그리드로 하나의 이미지를 각각 배경으로 */}
      <div
        className="grid grid-cols-3 h-full hz-artist-banner-img"
        style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}
      >
        {/* 왼쪽 (어둡게) */}
        <div
          className="bg-black bg-center bg-cover bg-opacity-60 bg-blend-overlay"
          style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0294/9673/7891/files/is-blackpink-disbanding_600x600.webp?v=1709131245")` }}
          //`url(${artistInfo?.profilePath})`
        ></div>
        {/* 중앙 (밝게) */}
        <div
          className="bg-center bg-cover hz-center-img"
          style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0294/9673/7891/files/is-blackpink-disbanding_600x600.webp?v=1709131245")` }}
          //`url(${artistInfo?.profilePath})`
        ></div>
        {/* 오른쪽 (어둡게) */}
        <div
          className="bg-black bg-center bg-cover bg-opacity-60 bg-blend-overlay"
          style={{ backgroundImage: `url("https://cdn.shopify.com/s/files/1/0294/9673/7891/files/is-blackpink-disbanding_600x600.webp?v=1709131245")` }}
          //`url(${artistInfo?.profilePath})`
        ></div>
      </div>

      {/* 콘텐츠 (하단 정렬) */}
      <div
        className="flex flex-col justify-end h-full px-8 pb-4 text-white hz-artist-banner-text"
        style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}
      >
        <h1 className="mb-6 font-bold text-left text-8xl hz-banner-title">{artistInfo.name}</h1>
        {/* 별점 영역 */}
        <div className="flex items-end gap-8 hz-banner-rating">
          <div className="flex flex-col items-center">
            <div className="text-[40px]">{ratingInfo?.averageRating}</div>
            <p className="text-base">평균 평점</p>
          </div>
          <div className="w-px bg-white h-14"></div>
          <ArtistRatingButton
            entityId={artistInfo.id}
            title={artistInfo.name}
          />
        </div>
        <ArtistTabs />
      </div>
    </div>
  );
};
