import React, { useState } from "react";

interface TabProps {
    nameArr: string[];
  }



export const TabButton = ({nameArr}: TabProps) => {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    const onClick = (idx: number) => {
        setActiveIdx(idx);
    }

    return (
        <div>
            {nameArr.map((name, idx) => (
                <button 
                    key={idx} 
                    className={
                        `
                        ${activeIdx === idx ? "border-point text-point" : "border-gray5 text-black" }
                        px-[12px] py-[6px] mr-[8px] border rounded-[8px] transform hover:border-point transition-colors  hover:text-point`
                    }
                    onClick={() => onClick(idx)}
                >{name}</button>
            ))}
        </div>
    )
};
  