import React from "react";

interface ButtonProps {
    text: string;
  }

export const Button = ({text}: ButtonProps) => {
    return <button className="border border-gray5 rounded-[8px] bg-white text-point px-[11px] py-[4px] transform hover:bg-point transition-colors hover:text-white hover:border-point">{text}</button>
};
  