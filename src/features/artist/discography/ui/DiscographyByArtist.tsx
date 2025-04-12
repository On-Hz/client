import { useParams } from "react-router-dom";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { AlbumCard, AlbumCardSkeleton } from "@/shared/ui";
import { Album } from "@/shared/model";
import { ORDER_BY } from "@/shared/constants";
import { sectionProps } from "../../config/sectionProps";
import { useArtistTopDiscography } from "../api/getArtistTopDiscographyApi";
import { useCombinedArtistData } from "../../shared/hooks/useCombindeArtistData";
import "./style.css";

export const DiscographyByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };
  const regularQuery = useArtistTopDiscography(artistId, {
    enabled: !useInfiniteScroll,
  });

  const {
    data: albums,
    isLoading,
    ref,
    hasNextPage,
  } = useCombinedArtistData<Album>({
    artistId,
    useInfiniteScroll: useInfiniteScroll ?? false,
    regularQuery,
    infiniteQueryParams: {
      endpoint: `/api/v1/artists/${artistId}/albums`,
      limit: 5,
      orderBy: ORDER_BY.CREATED_AT,
      queryKeyPrefix: "discography_artist",
    },
  });

  return (
    <ArtistSectionWrapper title={"Discography"}>
      <div className="flex flex-wrap gap-4 hz-dscography">
        {isLoading ? (
          Array.from({ length: 5 }, (_, i) => (
            <AlbumCardSkeleton key={`search-skeleton-${i}`} />
          ))
        ) : albums.length === 0 ? (
          <p className="py-12 text-center text-gray text-[16px] w-full">
           등록된 앨범이 없습니다.
          </p>
        ) : (
          albums.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              title={album.title}
              coverPath={album.coverPath}
              releaseDate={album.releaseDate}
            />
          ))
        )}

        {useInfiniteScroll && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </div>
    </ArtistSectionWrapper>
  );
};
