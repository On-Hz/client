import React from "react";

interface ButtonProps {
    width?:string;
    text: string;
  }

export const ModalButton = ({text, width="auto"}: ButtonProps) => {
    return <button 
                style={{width:width}}
                className="border border-point rounded-[20px] px-[80px] py-[14px] bg-point text-white
                transform hover:bg-white transition-colors hover:text-point"
            >
                {text}
            </button>
};
  