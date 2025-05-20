import React, { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value)?.label ?? "정렬";

  return (
    <div ref={dropdownRef} className="relative w-fit">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 py-[6px] border border-gray rounded-full bg-white text-black w-[140px] justify-center
                   hover:border-point hover:text-point transition-colors max-500:h-[40px] max-500:w-[120px]"
      >
        {selected}
        <ArrowDropDownIcon className="" />
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-full bg-white border border-gray rounded-xl shadow z-10">
          {options.map(({ label, value: optionValue }) => (
            <li
              key={optionValue}
              onClick={() => {
                onChange(optionValue);
                setIsOpen(false);
              }}
              className={`px-4 py-2 text-[15px] cursor-pointer hover:text-point max-500:text-[13px] ${
                value === optionValue ? "text-point" : ""
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
