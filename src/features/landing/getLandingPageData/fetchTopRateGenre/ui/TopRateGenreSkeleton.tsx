import { getGridStyles } from "@/shared/helpers";
import Skeleton from "@mui/material/Skeleton";

export const GenreSkeleton: React.FC = () => {
  return (
    <div className="hz-landing-genre-gridlayout">
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg cursor-pointer border-gray5 hz-landing-genre-item"
          style={getGridStyles(index)}
        >
          <Skeleton variant="text" width="60%" height={20} />
          <Skeleton
            variant="text"
            width="40%"
            height={14}
            style={{ marginTop: 8 }}
          />
          <Skeleton
            variant="rectangular"
            width="100%"
            height={150}
            style={{ marginTop: 16 }}
          />
        </div>
      ))}
    </div>
  );
};
