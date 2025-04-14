import React from "react";
import { Link } from "react-router-dom";
import { ReviewBannerSkeleton } from "./ReviewBannerSkeleton";
import { useDetailEntityInfo } from "@/shared/api";
import { extractEntityDetails } from "@/shared/helpers";
import { Album, Artist, Track } from "@/shared/model";
import { REVIEW_TYPES, ReviewType } from "@/shared/constants";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

type EntityDetail = Album | Artist | Track;

interface ReviewBannerProps {
  reviewType: ReviewType;
  entityId: string;
}

export const ReviewBanner: React.FC<ReviewBannerProps> = ({
  reviewType,
  entityId,
}) => {
  const { data: entityInfo, isLoading } = useDetailEntityInfo<EntityDetail>(
    reviewType,
    entityId
  );
  if (isLoading || !entityInfo) return <ReviewBannerSkeleton />;

  const { title, imagePath, releaseDate, mainArtist } = extractEntityDetails(
    reviewType,
    entityInfo
  );

  return (
    <section className="review-banner">
      <div className="flex items-center hz-top">
        <Link to={`/${reviewType.toLowerCase()}/${entityId}`} className="hz-container">
          <div className="hz-cover">
            <div className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2" />
          </div>
          <div className="hz-album">
            {imagePath ? (
              <img src={imagePath} alt={title} />
            ) : (
              <div className="hz-album bg-gray3">
                <MusicNoteIcon
                  style={{ width: "100%", height: "100%" }}
                  className="text-gray2"
                />
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="hz-ab-info">
        <div className="flex mb-2">
          <span className="text-gray text-[14px]">
            {reviewType === REVIEW_TYPES.ALBUM
              ? "앨범"
              : reviewType === REVIEW_TYPES.ARTIST
              ? "아티스트"
              : "트랙"}
          </span>
          {releaseDate ? (
            <>
              <span className="mx-2 text-gray text-[14px]">|</span>
              <span className="text-gray text-[13px] font-light">
                {releaseDate}
              </span>
            </>
          ) : null}
        </div>
        <h2 className="hz-title">{title}</h2>
        {mainArtist ? (
          <h3 className="mt-1 text-lg text-gray-300">{mainArtist}</h3>
        ) : null}
      </div>
    </section>
  );
};
