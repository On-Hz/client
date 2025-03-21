import React, { useState } from "react";
import { useAuthStore, useModalStore } from "@/shared/stores";
import PersonIcon from "@mui/icons-material/Person";
import { ModalLayout, ModalButton, InputBox } from "@/shared/ui";
import { validateProfileChange } from "@/shared/validation/authSchema";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    const errorMessage = validateProfileChange(form.userName, form.password, form.confirm);

    setValidationError(errorMessage); // 유효성 검사 에러
    if (!errorMessage) {
      // mutate(form); 
    }

    const updatedProfile = {
      ...user,
      userName: form.userName,
      ...(form.password ? { password: form.password } : {})
    };

    console.log("✅ 업데이트할 프로필:", updatedProfile);

    // TODO: API 호출 → 성공 시 closeModal
   // closeModal("profileModal");

  };

  if (!user) return null;

  return (
    <ModalLayout
      open={modals["profileModal"] || false}
      onClose={() => closeModal("profileModal")}
      showCloseButton={true}
    >
      <div className="py-[25px] px-[60px] max-500:p-0">
        <div className="text-center">
          <div className="m-auto w-[140px] h-[140px] border border-gray3 rounded-[50%] flex items-center justify-center">
            {user.profilePath ? (
              <img
                src={user.profilePath}
                alt={user.userName}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <PersonIcon
                style={{ width: "100%", height: "100%" }}
                className="text-gray3"
              />
            )}
          </div>
          <button className="text-point text-[13px] mt-5">이미지 추가</button>
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
  );
};
