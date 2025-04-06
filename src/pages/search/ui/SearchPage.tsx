import { Outlet } from "react-router-dom";
import { SearchTabs } from "@/widgets/search";

export const SearchPage: React.FC = () => {
  return (
    <>
      <SearchTabs />
      <Outlet />
    </>
  );
};
