import { getNavLinkClass } from "@/shared/helpers";
import { NavLink, useParams } from "react-router-dom";

export const ArtistTabs = () => {
  const { artistId } = useParams<{ artistId: string }>();
  return (
    <nav className="mt-10">
      <ul className="flex space-x-4 text-lg font-semibold hz-artist-banner-tab">
        {/* HOME */}
        <li>
          <NavLink
            to={`/artist/${artistId}`}
            end
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            홈
          </NavLink>
        </li>

        {/* Discography */}
        <li>
          <NavLink
            to={`/artist/${artistId}/discography`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            앨범
          </NavLink>
        </li>

        {/* Reviews */}
        <li>
          <NavLink
            to={`/artist/${artistId}/reviews`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            리뷰
          </NavLink>
        </li>

        {/* Reviews */}
        <li>
          <NavLink
            to={`/artist/${artistId}/tracks`}
            className={({ isActive }) => getNavLinkClass(isActive)}
          >
            노래
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
