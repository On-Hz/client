import { Outlet, useParams } from "react-router-dom";
import { SearchTabs } from "@/widgets/search";
import { useFetchSearchLanding } from "@/features/search";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import "./style.css";
import { LoadingLogo } from "@/shared/ui/loadingLogo/LoadingLogo";

export const SearchPage: React.FC = () => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  const { results, isLoading } = useFetchSearchLanding(searchSlug);
  const { tracks, artists, albums } = results;
  const noResults =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;

  if (isLoading) {
    return (
      <div className="min-h-[600px] flex items-center justify-center text-[20px] max-500:min-h-[400px] max-500:text-[16px]">
        <LoadingLogo />
      </div>
    );
  } else if (noResults) {
    return (
      <div className="min-h-[600px] flex items-center justify-center text-[20px] max-500:min-h-[400px] max-500:text-[16px]">
        <ManageSearchIcon fontSize="large" /> 검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <>
      <SearchTabs />
      <Outlet />
    </>
  );
};
