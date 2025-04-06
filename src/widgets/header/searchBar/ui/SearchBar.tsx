import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { shallow } from "zustand/shallow";
import { useSearchHistoryStore } from "@/shared/stores/searchHistoryStore";
import { useSearchResultsStore } from "@/shared/stores/searchResultsStore";

export const SearchBar: React.FC = React.memo(() => {
  const [searchSlug, setSearchSlug] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { recentSearches, addSearch, removeSearch } = useSearchHistoryStore(
    (state) => ({
      recentSearches: state.recentSearches,
      addSearch: state.addSearch,
      removeSearch: state.removeSearch,
    }),
    shallow
  );
  const { currentKeyword, setCurrentKeyword } = useSearchResultsStore(
    (state) => ({
      currentKeyword: state.currentKeyword,
      setCurrentKeyword: state.setCurrentKeyword,
    }),
    shallow
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { clearResults } = useSearchResultsStore(
    (state) => ({
      clearResults: state.clearResults,
    }),
    shallow
  );

  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      clearResults();
      setSearchSlug("");
    }
  }, [location.pathname, clearResults]);

  useEffect(() => {
    if (location.pathname.startsWith("/search")) {
      const parts = window.location.pathname.split("/");
      const keyword = parts[2] ? decodeURIComponent(parts[2]) : "";
      if (keyword && keyword !== currentKeyword) {
        setCurrentKeyword(keyword);
        setSearchSlug(keyword);
      }
    }
  }, [currentKeyword, setCurrentKeyword]);

  const displayedSearches = useMemo(
    () => recentSearches.slice(0, 5),
    [recentSearches]
  );

  const handleSearch = useCallback(
    (keyword?: string) => {
      const query = (keyword ?? searchSlug).trim();
      if (!query) return;
      if (query !== currentKeyword) {
        setCurrentKeyword(query);
        addSearch(query);
      }
      navigate(`/search/${encodeURIComponent(query)}`);
      setShowDropdown(false);
      inputRef.current?.blur();
    },
    [searchSlug, currentKeyword, setCurrentKeyword, addSearch, navigate]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.nativeEvent.isComposing) return;
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  const handleClear = useCallback(() => {
    setSearchSlug("");
    setCurrentKeyword("");
  }, [setCurrentKeyword]);

  const handleFocus = useCallback(() => {
    setShowDropdown(true);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchSlug(e.target.value);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <div className="hz-search mr-[24px] px-[12px] bg-gray2 rounded-[5px] w-[360px] h-[40px] text-[14px] flex items-center">
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="mr-2 cursor-pointer"
        >
          <SearchIcon fontSize="small" />
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder="검색어를 입력해주세요."
          value={searchSlug}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className="w-full h-full bg-transparent outline-none"
        />
        {searchSlug && (
          <button onClick={handleClear} className="cursor-pointer">
            <ClearIcon fontSize="small" />
          </button>
        )}
      </div>
      {showDropdown && displayedSearches.length > 0 && (
        <ul className="absolute top-[calc(100%+4px)] left-0 w-[360px] bg-white border border-gray3 rounded-[5px] shadow-md py-2 z-50">
          {displayedSearches.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between px-3 py-2 cursor-pointer group hover:bg-gray2"
              onClick={() => {
                setSearchSlug(item);
                handleSearch(item);
              }}
            >
              <span className="flex-1 mr-2 overflow-hidden text-ellipsis whitespace-nowrap">
                {item}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeSearch(item);
                }}
                className="flex items-center justify-center invisible w-6 h-6 p-1 rounded-full cursor-pointer group-hover:visible hover:bg-gray4"
              >
                <ClearIcon fontSize="small" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default SearchBar;
