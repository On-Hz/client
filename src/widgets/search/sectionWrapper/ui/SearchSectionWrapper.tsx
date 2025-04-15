import { NavLink, useParams } from "react-router-dom";
import { SearchSectionWrapperProps } from "../model/types";
import { Button } from "@/shared/ui";

export const SearchSectionWrapper: React.FC<SearchSectionWrapperProps> = ({
  title,
  linkTo,
  hasShowMoreTab,
  children,
}) => {
  const { searchSlug } = useParams<{ searchSlug: string }>();
  return (
    <section className="px-4 py-10 mx-auto max-w-7xl max-500:px-0 max-500:py-6">
      <div className="flex items-center justify-between mb-10  max-500:mb-5">
        <h2 className="text-2xl font-bold max-500:text-[18px]">{title}</h2>
        {hasShowMoreTab && (
          <NavLink to={`/search/${searchSlug}/${linkTo}`}>
            <Button text="모두 표시" />
          </NavLink>
        )}
      </div>
      {children}
    </section>
  );
};
