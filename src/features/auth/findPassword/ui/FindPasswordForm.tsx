import { InputBox, ModalButton } from "@/shared/ui";

interface FindPasswordFormProps {
  switchMode: (mode: "login" | "signup") => void;
}

export const FindPasswordForm: React.FC<FindPasswordFormProps> = ({ switchMode }) => {
  return (
    <div className="text-center">
      <p className="text-[16px] font-bold mb-4 text-point">비밀번호 찾기</p>
      <div className="flex flex-col mb-6 space-y-3 w-[300px]">
          <InputBox
            name="email" 
            placeholder="이메일"
            width="100%"
          />
          <InputBox
            name="userName" 
            placeholder="닉네임"
            width="100%"
          />
      </div>
      <div className="mb-6">
          <ModalButton text="임시비밀번호 발급" width="100%"/>
      </div>
      <button
        className="text-sm font-bold cursor-pointer text-point" 
        onClick={() => switchMode("login")}>
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
};
