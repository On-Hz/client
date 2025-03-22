import React from "react";
// import { Review } from '@/shared/model';
import testImg from "/public/indie2.jpg";

export const ReviewBanner: React.FC = () => {
  return (
    <section className="review-banner">
      <div className="flex items-center hz-top">
        <div className="hz-container">
          <div className="hz-cover">
            <div className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2" />
          </div>
          <div className="hz-album">
            <img src={testImg} alt="Album Cover" />
          </div>
        </div>
      </div>

      {/* 오른쪽 텍스트 영역 */}
      <div className="hz-ab-info">
        <div className="flex mb-2">
          <span className="text-gray text-[14px]">앨범</span>
          <span className="mx-2 text-gray text-[14px]">|</span>
          <span className="text-gray text-[13px] font-light">2025.03.21</span>
        </div>
        <h2 className="hz-title">샤이니</h2>
        <h3 className="mt-1 text-lg text-gray-300">다시 만난 세계</h3>
      </div>
    </section>
  );
};
