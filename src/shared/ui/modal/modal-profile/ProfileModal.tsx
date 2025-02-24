import React from "react";
import { useModalStore } from "@/shared/stores";
import { InputBox } from "../../inputBox/InputBox";
import PersonIcon from "@mui/icons-material/Person";
import { ModalLayout } from "../modalLayout";
import { ModalButton } from "../modal-button/ModalButton";

interface User {
  user_id: number;
  user_name: string;
  user_img?: string;
  email: string;
  password: string;
}
const mockUser: User[] = [
  {
    user_id: 1,
    user_name: "강동원",
    user_img: "",
    email: "user@example.com",
    password: "************",
  },
];

export const ProfileModal: React.FC = () => {
    const { modals, closeModal } = useModalStore();
    const user = mockUser[0];
    return (
        <ModalLayout
          open={modals["profileModal"] || false}
          onClose={() => closeModal("profileModal")}
          showCloseButton={true}
        >
            <div className="py-[25px] px-[60px] max-500:p-0">
                <div className="text-center">
                    <div className="m-auto w-[140px] h-[140px] border border-gray3 rounded-[50%] flex items-center justify-center">
                        { user.user_img ? (
                            <img src={user.user_img} alt={user.user_name} style={{width:"100%",height:"100%"}} />
                        ) : (
                            <PersonIcon style={{width:"100%",height:"100%"}} className="text-gray3"/>
                        )}
                    </div>
                    <button className="text-point text-[13px] mt-5">
                        이미지 추가
                    </button>
                </div>
                <div className="my-7 flex flex-col space-y-2 w-[300px]">
                    <InputBox value={user.user_name} width="100%"/>
                    <InputBox placeholder="변경할 비밀번호를 입력하세요." width="100%"/>
                    <InputBox placeholder="비밀번호 확인" width="100%"/>
                </div>
                <div className="text-center">
                    <ModalButton 
                        text="수정"
                         width="100%"
                    />
                </div>
            </div>
        </ModalLayout>
    )
}
