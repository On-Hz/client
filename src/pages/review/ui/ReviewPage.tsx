import React from "react";
import { ReviewBanner, ReviewDetail } from "@/features/review";
import "./style.css";

export const ReviewPage: React.FC = () => {
  return (
    <div id="rv-page">
      <ReviewBanner />
      <ReviewDetail />
    </div>
  );
};
