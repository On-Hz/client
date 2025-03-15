import { SearchTabs } from "@/widgets/search";
import { Outlet } from "react-router-dom";

export const SearchPage: React.FC = () => {
  return (
    <>
      <SearchTabs />
      <Outlet />
    </>
  );
};
