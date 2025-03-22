import { NavLink, useParams } from "react-router-dom";
import { TabButton } from "@/shared/ui";

export const SearchTabs = () => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  return (
    <nav className="flex items-center space-x-1">
      {/* 전체 */}1
      <NavLink to={`/search/${searchSlug}`} end>
        {({ isActive }) => <TabButton text="전체" isActive={isActive} />}
      </NavLink>
      {/* 노래 */}
      <NavLink to={`/search/${searchSlug}/track`}>
        {({ isActive }) => <TabButton text="노래" isActive={isActive} />}
      </NavLink>

      {/* 아티스트 */}
      <NavLink to={`/search/${searchSlug}/artist`}>
        {({ isActive }) => <TabButton text="아티스트" isActive={isActive} />}
      </NavLink>

      {/* 앨범 */}
      <NavLink to={`/search/${searchSlug}/album`}>
        {({ isActive }) => <TabButton text="앨범" isActive={isActive} />}
      </NavLink>
    </nav>
  );
};
