import React, { useState } from "react";
import { useAuthStore, useModalStore } from "@/shared/stores";
import PersonIcon from "@mui/icons-material/Person";
import { ModalLayout, ModalButton, InputBox } from "@/shared/ui";
import { validateProfileChange } from "@/shared/validation/authSchema";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import { UpdateProfileParams } from "@/features/mypage/profile/model/types";
import { useUpdateProfile } from "@/features/mypage/profile/hooks/useUpdateProfile";
import { BASE_IMAGE_URL } from "@/shared/constants/image";
import { ProfileImageCropModal } from "@/features/mypage/profile/ui/ProfileImageCropModal";

export const ProfileModal: React.FC = () => {
  const { modals, closeModal } = useModalStore();
  const user = useAuthStore((state) => state.user);
  const [form, setForm] = useState({ 
    userName: user?.userName ?? "",
    email: user?.email ?? "",
    password: "",
    confirm: "",
  });
  const [validationError, setValidationError] = useState<string | null>(null);
  const { mutate } = useUpdateProfile();
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setCropModalOpen(true); // 이미지 크롭 모달 오픈!
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const errorMessage = validateProfileChange(form.userName, form.password, form.confirm);
    setValidationError(errorMessage); // 유효성 검사 에러

    if (!errorMessage) {
      const params: UpdateProfileParams = {
        user_name: form.userName,
        ...(form.password ? { new_password: form.password } : {}),
      };
      mutate(params);
    }
  };

  if (!user) return null;

  const profileImageUrl = user?.profilePath ? `${BASE_IMAGE_URL}${user.profilePath}` : null;
  return (
    <>
      <ModalLayout
      open={modals["profileModal"] || false}
      onClose={() => closeModal("profileModal")}
      showCloseButton={true}
    >
      <div className="py-[25px] px-[60px] max-500:p-0">
        <div className="text-center">
          <div className="overflow-hidden m-auto w-[140px] h-[140px] border border-gray3 rounded-[50%] flex items-center justify-center">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={user.userName}
                style={{ width: "100%", height: "auto" }}
              />
            ) : (
              <PersonIcon
                style={{ width: "100%", height: "100%" }}
                className="text-gray3"
              />
            )}
          </div>
          <label htmlFor="profileImage" className="text-point text-[13px] mt-5 cursor-pointer">
            이미지 추가
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="my-7 flex flex-col space-y-2 w-[300px]">
        <InputBox
            name="userName"
            placeholder="닉네임을 입력해주세요."
            width="100%"
            value={form.userName}
            onChange={handleChange}
          />
          <InputBox
            name="email"
            placeholder="이메일"
            width="100%"
            value={form.email}
            disabled
          />
          <InputBox
            name="password"
            type="password"
            placeholder="변경할 비밀번호를 입력하세요."
            width="100%"
            value={form.password}
            onChange={handleChange}
          />
          <InputBox
            name="confirm"
            type="password"
            placeholder="비밀번호 확인"
            width="100%"
            value={form.confirm}
            onChange={handleChange}
          />
        </div>
        {(validationError) && (
          <p className="text-red text-sm text-center mb-4">
            <ReportProblemIcon /> {validationError}
          </p>
        )}
        <div className="text-center">
          <ModalButton text="수정" width="100%" onClick={handleSubmit}/>
        </div>
      </div>
      </ModalLayout>
      {cropModalOpen && selectedImage && (
        <ProfileImageCropModal
          open={cropModalOpen}
          onClose={() => setCropModalOpen(false)}
          imageFile={selectedImage}
        />
      )}
    </>
  );
};
