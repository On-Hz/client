import { Outlet, useParams } from "react-router-dom";
import { SearchTabs } from "@/widgets/search";
import { useFetchSearchLanding } from "@/features/search";
import { parseSlug } from "@/shared/helpers";
import { LoadingLogo } from "@/shared/ui/loadingLogo/LoadingLogo";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import "./style.css";

export const SearchPage: React.FC = () => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  const { keyword } = parseSlug(searchSlug ?? "");
  const { results, isLoading } = useFetchSearchLanding(keyword);
  if (isLoading || !results) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <LoadingLogo />
      </div>
    );
  }

  const { tracks, artists, albums } = results;
  const noResults =
    tracks.length === 0 && artists.length === 0 && albums.length === 0;
  if (noResults) {
    return (
      <div className="min-h-[600px] flex items-center justify-center">
        <ManageSearchIcon fontSize="large" /> 검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <>
      <SearchTabs results={results} isLoading={isLoading} />
      <Outlet />
    </>
  );
};
