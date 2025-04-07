// import StarIcon from "@mui/icons-material/Star";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import { useParams } from "react-router-dom";
import { useUserRating } from "@/features/mypage/rating/api/getUserRatingApi";

export const UserRatingBox = () => {
  const { userId } = useParams<{ userId: string }>();
  // const userId = "2";
  const { data: ratings, isLoading } = useUserRating(userId!);

  if (!userId || isLoading || !ratings) return null;
 
  const parsedRatingDist =
    ratings.ratingDist && typeof ratings.ratingDist === "string"
      ? JSON.parse(ratings.ratingDist)
      : {};

  
  const ratingData = Array.from({ length: 11 }, (_, i) => {
    const rating = (i * 0.5).toFixed(1);
    return {
      rating: parseFloat(rating),
      count: parsedRatingDist[rating] ?? 0,
    };
  });

  const CustomTooltip = ({ active, payload, coordinate }: TooltipProps<number, string>) => {
      if (active && payload && payload.length && coordinate) {
        const x = coordinate?.x ?? 0;
        //const rating = payload[0].payload.rating;
        const count = payload[0].value;

        return (
          <div
            style={{
              position: "absolute",
              left: x - 18,
              top: 55, 
              backgroundColor: "#fff",
              borderRadius: "2px",
              padding: "4px 16px",
              fontSize: "14px",
              color: "#222",
              transition: "all 0.3s ease",
            }}
          >
            <strong>{count}</strong>
          </div>
        );
      }
    return null;
  };
  
  return (
    <div className="hz-ratings">
      <div className="flex items-end">
        <div className="text-center">
          <div className="hz-ra-text text-[48px] font-bold">{ratings.ratingCount}</div>
          <p className="pt-[4px]">총 별점 수</p>
        </div>
        <div className="mx-[42px] w-px bg-gray4 h-[100px] hz-gary-bar" />
        <div className="text-center">
          <div className="hz-ra-text text-[48px] text-yellow font-bold">
            {ratings.averageRating}
          </div>
          <p className="pt-[4px]">평균 평점</p>
        </div>
      </div>
      {/* <div className="text-center">
        <StarIcon
          className="text-yellow hz-star-icon"
          style={{ width: "30px", height: "30px" }}
        />
        <p className="pt-[4px]">내 별점</p>
      </div> */}
      {ratingData && (
        <div className="hz-ra-box w-[450px] mt-6 border border-gray4 rounded-[10px] p-1">
        <div style={{ width: "100%", height: "100px" }}>
          <ResponsiveContainer>
            <BarChart 
              data={ratingData} 
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis
                dataKey="rating"
                type="number"
                domain={[0, 5]}
                ticks={[0, 2.5, 5]}
                tickFormatter={(value) => `${value}★`}
                tick={{ fill: "#FFD231", fontSize: 15 }}
                stroke="#fff"
              />
              <Tooltip
                cursor={{ fill: "rgba(255, 210, 49, 0.2)" }}
                content={<CustomTooltip />}
              />
              <Bar 
                cursor="pointer"
                dataKey="count" 
                fill="#FFD231" 
                barSize={32} 
                radius={2} 
                minPointSize={2}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}
    </div>
  );
};
