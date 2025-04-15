import { Outlet } from "react-router-dom";
import { SearchTabs } from "@/widgets/search";
import './style.css';

export const SearchPage: React.FC = () => {
  return (
    <>
      <SearchTabs />
      <Outlet />
    </>
  );
};
