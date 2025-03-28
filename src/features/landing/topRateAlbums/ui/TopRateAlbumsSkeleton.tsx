import { getGridStyles } from "@/shared/helpers";
import Skeleton from "@mui/material/Skeleton";

export const AlbumSkeleton: React.FC = () => {
  return (
    <div className="grid gap-5 hz-landing-album-gridlayout">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col p-3 bg-white border rounded-lg cursor-pointer border-gray5 hz-landing-album-item hover:scale-105"
          style={getGridStyles(index)}
        >
          <div className="mb-4">
            <div className="relative overflow-hidden album-title-wrapper">
              <Skeleton variant="text" width="60%" height={20} />
            </div>
            <Skeleton
              variant="text"
              width="40%"
              height={14}
              style={{ marginTop: 8 }}
            />
          </div>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={180}
            style={{ marginTop: 16 }}
            className="rounded-lg aspect-square"
          />
        </div>
      ))}
    </div>
  );
};
