import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useMatch, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import { shallow } from "zustand/shallow";
import { useSearchHistoryStore, useSearchResultsStore } from "@/shared/stores";
import { encodeSlug, parseSlug } from "@/shared/helpers";

export const SearchBar: React.FC = React.memo(() => {
  const [searchSlug, setSearchSlug] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const match = useMatch("/search/:slug/*");
  const rawSlug = match?.params.slug ?? "";
  const didRedirect = useRef(false);

  const { recentSearches, addSearch, removeSearch } = useSearchHistoryStore(
    (state) => ({
      recentSearches: state.recentSearches,
      addSearch: state.addSearch,
      removeSearch: state.removeSearch,
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
    if (!rawSlug) {
      clearResults();
      setSearchSlug("");
      return;
    }
    const { keyword, redirectTo } = parseSlug(rawSlug);
    if (redirectTo && !didRedirect.current) {
      didRedirect.current = true;
      navigate(redirectTo, { replace: true });
      return;
    }
    setSearchSlug(keyword);
    addSearch(keyword);
  }, [navigate, clearResults, addSearch, rawSlug]);

  const displayedSearches = useMemo(
    () => recentSearches.slice(0, 5),
    [recentSearches]
  );

  const handleSearch = useCallback(
    (keyword?: string) => {
      const query = (keyword ?? searchSlug).trim();
      if (!query) return;
      const searhcURISlug = encodeSlug(query);
      navigate(`/search/${searhcURISlug}`);
      setShowDropdown(false);
      inputRef.current?.blur();
    },
    [searchSlug, navigate]
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
  }, []);

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

  const [isSearchVisible, setSearchVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 800; //style.css 반응형 기준
      setIsMobile(isNowMobile);

      // 800이상일 때 닫기
      if (!isNowMobile) {
        setSearchVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobSearchBtn = () => {
    if (isMobile) {
      setSearchVisible((prev) => !prev);
    }
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button className={`hz-mob-search`} onClick={toggleMobSearchBtn}>
        <SearchIcon fontSize="small" />
      </button>
      <div
        className={`${isSearchVisible ? "hz-search-show" : "hz-search-hide"} 
          hz-search-box`}
      >
        <div className="hz-search  px-[12px] bg-gray2 rounded-[5px] h-[40px] text-[14px] flex">
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
        <button
          className="p-1 ml-1 bg-white border rounded-md hz-mob-search-close border-gray"
          onClick={() => setSearchVisible(false)}
        >
          <CloseIcon fontSize="small" />
        </button>
        {showDropdown && displayedSearches.length > 0 && (
          <ul className="hz-search-drop absolute top-[calc(100%+4px)] left-0 bg-white border border-gray3 rounded-[5px] shadow-md py-2 z-50">
            {displayedSearches.map((item, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-3 py-2 cursor-pointer group hover:bg-gray2"
                onClick={() => {
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
                  className="flex items-center justify-center invisible w-6 h-6 p-1 rounded-full cursor-pointer group-hover:visible hover:bg-gray4 max-500:visible"
                >
                  <ClearIcon fontSize="small" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
});

export default SearchBar;
