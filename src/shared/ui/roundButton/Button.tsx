import React from "react";

interface ButtonProps {
    text: string;
  }

export const Button = ({text}: ButtonProps) => {
    return <button className="border border-point rounded-[100px] bg-white text-point px-[24px] py-[10px]">{text}</button>
};
  