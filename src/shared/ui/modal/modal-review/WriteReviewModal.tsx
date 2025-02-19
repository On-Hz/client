import React, { useState } from "react";
import { useModalStore } from "@/shared/stores";
import { ModalButton } from "../modal-button/ModalButton";
import { ModalLayout } from "../modalLayout";
import { Rating } from "@mui/material";

  
 const albumTitle = "APT."

export const WriteReviewModal: React.FC = () => {
    const { modals, closeModal } = useModalStore();
    const [text, setText] = useState("");
    const maxLength = 10000; // 최대 글자 수

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (e.target.value.length <= maxLength) {
        setText(e.target.value);
      }
    };

    return (
        <ModalLayout
          open={modals["writeReviewModal"] || false}
          onClose={() => closeModal("writeReviewModal")}
          showCloseButton={true}
        >
            <div className="py-[25px] px-[40px] w-[550px]">
                <p className="text-[36px] pb-6 font-semibold">{albumTitle}</p>
                <Rating
                    sx={{
                        marginBottom:'15px',
                        fontSize: "36px",
                        fontWeight: "200",
                        '& .MuiRating-iconFilled': {
                          color: '#FFD231', // 채워진 별 색상
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#a1a1a1', // 비어있는 별 색상
                        },
                      }}
                 />
                <textarea 
                    onChange={handleChange}
                    className="resize-none h-[150px] border border-gray4 w-full p-4"
                    placeholder="리뷰를 작성해주세요."
                    >
                </textarea>
                <div className="text-right pt-1 pb-9 text-gray">
                    {text.length} / {maxLength}자
                </div>
                <div className="text-center">
                    <ModalButton text="리뷰 작성"/>
                </div>
            </div>
        </ModalLayout>
    )
}