import { useParams } from "react-router-dom";
import { ArtistRatingButton } from "../../ratingButton/ui/ArtistRatingButton";
import { ArtistTabs } from "../../tabs/ui/ArtistTabs";
import { ArtistBannerSkeleton } from "./ArtistBannerSkeleton";
import { useDetailEntityInfo, useDetailReviewRatingInfo } from "@/shared/api";
import { REVIEW_TYPES } from "@/shared/constants";
import { Artist } from "@/shared/model";
import "./style.css";

export const ArtistBanner = () => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };
  const { data: artistInfo, isLoading } = useDetailEntityInfo<Artist>(
    REVIEW_TYPES.ARTIST,
    artistId
  );
  const { data: ratingInfo } = useDetailReviewRatingInfo(
    REVIEW_TYPES.ARTIST,
    artistId || ""
  );
  if (isLoading || !artistInfo) {
    return <ArtistBannerSkeleton />;
  }

  return (
    <div className="grid relative w-full h-[450px] bg-gray5 hz-artist-banner cursor-default">
      {/* 3열 그리드로 하나의 이미지를 각각 배경으로 */}
      <div
        className="grid h-full grid-cols-3 hz-artist-banner-img"
        style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}
      >
        {/* 왼쪽 (어둡게) */}
        <div
          className="bg-black bg-center bg-cover bg-opacity-60 bg-blend-overlay"
          style={{
            backgroundImage: `url(${artistInfo?.profilePath})`,
          }}
        ></div>
        {/* 중앙 (밝게) */}
        <div
          className="bg-center bg-cover hz-center-img"
          style={{
            backgroundImage: `url(${artistInfo?.profilePath})`,
          }}
        ></div>
        {/* 오른쪽 (어둡게) */}
        <div
          className="bg-black bg-center bg-cover bg-opacity-60 bg-blend-overlay"
          style={{
            backgroundImage: `url(${artistInfo?.profilePath})`,
          }}
        ></div>
      </div>

      {/* 콘텐츠 (하단 정렬) */}
      <div
        className="flex flex-col justify-end h-full px-20 pb-4 text-white hz-artist-banner-text max-800:px-5"
        style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}
      >
        <h1 className="mb-6 font-bold text-left text-8xl hz-banner-title">
          {artistInfo.name}
        </h1>
        {/* 별점 영역 */}
        <div className="flex items-end gap-8 hz-banner-rating">
          <div className="flex flex-col items-center">
            <div className="text-[40px] pb-1">{ratingInfo?.averageRating}</div>
            <p className="text-base">평균 평점</p>
          </div>
          <div className="w-px bg-white h-16"></div>
          <ArtistRatingButton
            entityId={artistInfo.id}
            title={artistInfo.name}
            userRating={ratingInfo?.userRating || -1}
            reviewId={ratingInfo?.userReviewId}
          />
        </div>
        <ArtistTabs />
      </div>
    </div>
  );
};
