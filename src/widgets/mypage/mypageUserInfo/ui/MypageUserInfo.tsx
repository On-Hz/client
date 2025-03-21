import { useEffect, useState } from "react";
import { MypageUserInfoSkeleton } from "./MypageUserInfoSkeleton";
import { MypageTabs } from "../../mypageTabs/ui/MypageTabs";
import { openModalWithAuthCheck } from "@/shared/helpers";
import { useAuthStore } from "@/shared/stores";
import { UserAvatar } from "../../userAvatar/ui/UserAvatar";
import { UserRatingBox } from "../../userRatingBox.tsx/ui/UserRatingBox";
export const MypageUserInfo = () => {
  const user = useAuthStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태

  useEffect(() => {
    // 2초 후에 로딩 상태 변경
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (!user) return null;
  
  return (
    <div>
      {isLoading ? (
        <MypageUserInfoSkeleton />
      ) : (
        <div className="flex items-center justify-between hz-top">
          <div className="flex items-center">
            <div className="pr-[24px] text-center">
            <UserAvatar profilePath={user.profilePath} userName={user.userName} />
              <button
                className="text-point text-[13px] mt-5"
                onClick={() => openModalWithAuthCheck("profileModal")}
              >
                프로필 수정
              </button>
            </div>
            <div>
              <p className="pb-[14px] text-[24px] font-semibold">
                {user.userName}
              </p>
              <p className="text-[14px] text-gray">{user.email}</p>
            </div>
          </div>
          <UserRatingBox />
        </div>
      )}
      <MypageTabs />
    </div>
  );
};
