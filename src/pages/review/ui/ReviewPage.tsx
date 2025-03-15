import React from "react";
import { Album, ReviewDetail } from "@/features/review";
import "./style.css";

export const ReviewPage: React.FC = () => {
  return (
    <div id="rv-page">
      <Album />
      <div className="pt-10 mt-10 border border-b-0 border-l-0 border-r-0 border-gray3">
        <ReviewDetail />
      </div>
    </div>
  );
};
