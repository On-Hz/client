import React from "react";
import { Skeleton } from "@mui/material";

export const AlbumsByGenreSkeleton: React.FC = () => {
  return (
    <div className="p-6 mt-5 bg-gray-100">
      {[...Array(5)].map((_, index) => {
        const formattedIndex = (index + 1).toString().padStart(2, "0");

        return (
          <div key={index} className="relative flex mb-6">
            <div className="flex items-center justify-center mr-3 text-base font-medium text-point w-9">
              {formattedIndex}
            </div>

            <div className="flex flex-1 overflow-hidden transition-all bg-white border rounded-lg border-gray5">
              <div
                className="max-w-[250px] w-[40%]"
                style={{ aspectRatio: "1.5/1" }}
              >
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  animation="wave"
                />
              </div>

              <div className="relative flex flex-col justify-between flex-1 p-4">
                <div>
                  <Skeleton variant="text" width="30%" height={20} />

                  <Skeleton variant="text" width="80%" height={28} />
                  <Skeleton variant="text" width="60%" height={28} />

                  <Skeleton variant="text" width="40%" height={20} />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex flex-wrap gap-2">
                    {[...Array(2)].map((_, i) => (
                      <Skeleton
                        key={i}
                        variant="rectangular"
                        width={50}
                        height={20}
                        className="rounded-full"
                      />
                    ))}
                  </div>

                  <Skeleton variant="text" width={100} height={30} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
