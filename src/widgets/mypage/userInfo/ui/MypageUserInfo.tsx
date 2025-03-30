import { MypageUserInfoSkeleton } from "./MypageUserInfoSkeleton";
import { MypageTabs } from "../../tabs/ui/MypageTabs";
import { openModalWithAuthCheck } from "@/shared/helpers";
import { UserAvatar } from "../../userAvatar/ui/UserAvatar";
import { UserRatingBox } from "../../userRatingBox.tsx/ui/UserRatingBox";
import { BASE_IMAGE_URL } from "@/shared/constants/image";
import { useUserInfoQuery } from "@/features/mypage/profile/hooks/useInfoQuery";

export const MypageUserInfo = () => {
  const { data: user, isLoading } = useUserInfoQuery();

  if (isLoading) return <MypageUserInfoSkeleton />;

  if (!user) return null; 

  const profileImageUrl = user?.profilePath ? `${BASE_IMAGE_URL}${user.profilePath}` : null;
  

  return (
    <div>
      <div className="flex items-center justify-between hz-top">
          <div className="flex items-center">
            <div className="pr-[24px] text-center">
            <UserAvatar profilePath={profileImageUrl} userName={user.userName} />
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
      <MypageTabs />
    </div>
  );
};
