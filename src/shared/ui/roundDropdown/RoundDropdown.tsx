import React from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface RoundDropdownProps {
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}

export const RoundDropdown: React.FC<RoundDropdownProps> = ({
  value,
  options,
  onChange,
}) => {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none border border-point rounded-[100px] bg-white text-point px-[24px] py-[8px] cursor-pointer
                   max-500:h-[40px] pr-[40px] w-full"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-black">
            {option.label}
          </option>
        ))}
      </select>

      <ArrowDropDownIcon className="absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none w-4 h-4 text-point" />
    </div>
  );
};
