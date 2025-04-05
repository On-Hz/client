import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

export const SearchBar: React.FC = () => {
  const [searchSlug, setSearchSlug] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchSlug.trim() === "") return;
    navigate(`/search/${encodeURIComponent(searchSlug)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchSlug("");
  };

  return (
    <div className="hz-search mr-[24px] px-[12px] bg-gray2 rounded-[5px] w-[360px] h-[40px] text-[14px] flex items-center">
      <input
        className="w-full h-full bg-transparent"
        type="text"
        placeholder="검색어를 입력해주세요."
        value={searchSlug}
        onChange={(e) => setSearchSlug(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {searchSlug ? (
        <button onClick={handleClear}>
          <ClearIcon />
        </button>
      ) : (
        <SearchIcon />
      )}
    </div>
  );
};
