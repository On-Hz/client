import React from "react";
// import { Review } from '@/shared/model';
import testImg from "/public/indie2.jpg";

export const ReviewBanner: React.FC = () => {
  return (
    <section className="flex flex-row w-full border border-t-0 border-l-0 border-r-0 border-gray3">
      <div className="flex items-center">
        <div className="relative w-[450px] h-[300px] flex-shrink-0">
          <div
            className="absolute z-0 w-64 h-64 transform -translate-y-1/2 bg-black rounded-full shadow-lg left-40 top-1/2"
            style={{
              boxShadow:
                "0 4px 6px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2)",
              background:
                "radial-gradient(circle at center, rgba(40, 40, 40, 1) 0%, rgba(10, 10, 10, 1) 70%, rgba(0, 0, 0, 1) 100%)",
            }}
          >
            <div className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full top-1/2 left-1/2"></div>

            <div className="absolute w-56 h-56 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-full opacity-40 top-1/2 left-1/2"></div>
            <div className="absolute w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-full opacity-40 top-1/2 left-1/2"></div>
            <div className="absolute w-40 h-40 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-full opacity-40 top-1/2 left-1/2"></div>
            <div className="absolute w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-full opacity-40 top-1/2 left-1/2"></div>
            <div className="absolute w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 border border-gray-700 rounded-full opacity-40 top-1/2 left-1/2"></div>

            <div
              className="absolute w-full h-full rounded-full opacity-20"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 50%)",
              }}
            ></div>
          </div>

          <div
            className="relative z-10 overflow-hidden rounded-lg h-72 w-72"
            style={{
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
            }}
          >
            <img src={testImg} className="object-cover w-full h-full" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start flex-1 p-6 space-y-1">
        <div className="flex">
          <span className="text-gray text-[14px]">앨범</span>
          <span className="mx-2 text-gray text-[14px]">|</span>
          <span className="text-gray text-[13px] font-light">2025.03.21</span>
        </div>
        <h2 className="text-2xl font-bold tracking-wider">샤이니</h2>
        <h3 className="text-lg text-gray-300">다시 만난 세계</h3>
      </div>
    </section>
  );
};
