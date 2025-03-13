// RatingButton.tsx
import React from "react";
import { useAuthStore } from "@/shared/stores/authStore";
import { useModalStore } from "@/shared/stores";

export const ArtistRatingButton: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const { openModal } = useModalStore();
  
  const handleClick = () => {
    if (token) {
      openModal("writeReviewModal");
    } else {
      openModal("authCheckModal");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <button className="text-4xl focus:outline-none" onClick={handleClick}>
          ★
        </button>
        <p className="text-base">내 평점</p>
      </div>
    </>
  );
};
