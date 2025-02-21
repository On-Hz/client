import React from "react";

interface ButtonProps {
  width?: string;
  text: string;
  onClick?: () => void;
}

export const ModalButton = ({ text, width = "auto", onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      style={{ width: width }}
      className="border border-point rounded-[30px] px-[80px] py-[14px] bg-point text-white
                transform hover:bg-white transition-colors hover:text-point"
    >
      {text}
    </button>
  );
};
