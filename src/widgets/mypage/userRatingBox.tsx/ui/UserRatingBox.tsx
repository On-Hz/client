import StarIcon from "@mui/icons-material/Star";
import { BarChart, Bar, XAxis, ResponsiveContainer } from "recharts";
import { ratingData } from "@/features/mypage";

export const UserRatingBox = () => {
    return (
      <div className="hz-ratings">
        <div className="flex items-end">
          <div className="text-center">
            <div className="hz-ra-text text-[48px] text-yellow font-bold">3.5</div>
            <p className="pt-[4px]">평균 평점</p>
          </div>
          <div className="mx-[42px] w-px bg-gray4 h-[100px]" />
          <div className="text-center">
            <StarIcon className="text-yellow hz-star-icon" style={{ width: "60px", height: "60px" }} />
            <p className="pt-[4px]">내 별점</p>
          </div>
        </div>
        <div className="hz-ra-box w-[450px] mt-6 border border-gray4 rounded-[10px] p-1">
          <div style={{ width: "100%", height: "100px" }}>
            <ResponsiveContainer>
              <BarChart data={ratingData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <XAxis
                  tick={{ fill: "#FFD231", fontSize: 14 }}
                  dataKey="rating"
                  stroke="#fff"
                />
                <Bar dataKey="count" fill="#FFD231" barSize={50} radius={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };
  