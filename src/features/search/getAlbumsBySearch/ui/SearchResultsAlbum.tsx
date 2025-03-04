import { SearchSectionWrapper } from "@/widgets/search/searchSectionWrapper";
import { sectionProps } from "../../config/sectionProps";
import { mockAlbums } from "../api/getAlbums";
import { AlbumCard } from "@/shared/ui/albumCard/AlbumCard";

export const SearchResultsAlbum = ({
  hasShowMoreTab,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //useInfiniteScroll,
}: sectionProps) => (
  <SearchSectionWrapper
    title="앨범"
    linkTo="album"
    hasShowMoreTab={hasShowMoreTab}
  >
    <div className="flex justify-center gap-5 pb-4 space-x-4">
      {mockAlbums.map((album) => (
        <AlbumCard
          id={album.id}
          title={album.title}
          artist={album.artist}
          cover={album.cover}
        />
      ))}
    </div>
  </SearchSectionWrapper>
);
