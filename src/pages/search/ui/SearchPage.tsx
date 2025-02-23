import { SearchTabs } from "@/widgets/search/searchTabs";
import { Outlet } from "react-router-dom";

export const SearchPage: React.FC = () => {
  return (
    <>
      <SearchTabs />
      <Outlet />
    </>
  );
};
