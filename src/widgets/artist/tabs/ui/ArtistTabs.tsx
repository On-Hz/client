import { getNavLinkClass } from "@/shared/helpers";
import { NavLink, useParams } from "react-router-dom";

export const ArtistTabs = () => {
  const { artistSlug } = useParams<{ artistSlug: string }>();
  return (
    <nav className="mt-10">
      <ul className="flex space-x-4 text-lg font-semibold hz-artist-banner-tab">
        {/* HOME */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}`}
            end
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            홈
          </NavLink>
        </li>

        {/* Discography */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}/discography`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            앨범
          </NavLink>
        </li>

        {/* Reviews */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}/reviews`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            리뷰
          </NavLink>
        </li>

        {/* Reviews */}
        <li>
          <NavLink
            to={`/artist/${artistSlug}/tracks`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            노래
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
