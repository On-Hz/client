import React from "react";

interface ButtonProps {
    text: string;
  }

export const RoundButton = ({text}: ButtonProps) => {
    return <button className="border border-point rounded-[100px] bg-white text-point px-[24px] py-[10px] transform hover:bg-point transition-colors hover:text-white
          max-500:h-[40px]
    ">{text}</button>
};
  