import { getNavLinkClass } from "@/shared/helpers";
import { NavLink, useParams } from "react-router-dom";

export const ArtistTabs = () => {
  const { artistSlug } = useParams<{ artistSlug: string }>();
  return (
    <nav className="mt-10">
      <ul className="flex space-x-4 text-lg font-semibold">
        {/* HOME */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}`}
            end
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            HOME
          </NavLink>
        </li>

        {/* Discography */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}/discography`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Discography
          </NavLink>
        </li>

        {/* Reviews */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}/reviews`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            Reviews
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
