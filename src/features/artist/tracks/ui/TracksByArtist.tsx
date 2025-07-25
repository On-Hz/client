import { useParams } from "react-router-dom";
import { ArtistSectionWrapper } from "@/widgets/artist";
import { TrackListItem, TrackListItemSkeleton } from "@/shared/ui";
import { Track } from "@/shared/model";
import { ORDER_BY } from "@/shared/constants";
import { sectionProps } from "../../config/sectionProps";
import { useArtistTopTracks } from "../api/getArtistTopTracksApi";
import { useCombinedArtistData } from "../../shared/hooks/useCombindeArtistData";

export const TracksByArtist = ({ useInfiniteScroll }: sectionProps) => {
  const { artistId } = useParams<{ artistId: string }>() as {
    artistId: string;
  };
  const regularQuery = useArtistTopTracks(artistId, {
    enabled: !useInfiniteScroll,
  });
  const {
    data: tracks,
    isLoading,
    ref,
    hasNextPage,
  } = useCombinedArtistData<Track>({
    artistId,
    useInfiniteScroll: useInfiniteScroll ?? false,
    regularQuery,
    infiniteQueryParams: {
      endpoint: `/api/v1/artists/${artistId}/tracks`,
      limit: 5,
      orderBy: ORDER_BY.RELEASE_DATE,
      queryKeyPrefix: "tracks_artist",
    },
  });

  return (
    <ArtistSectionWrapper title={useInfiniteScroll ? "Tracks" : "Top Tracks"}>
      <ul className="space-y-2">
        {isLoading ? (
          Array.from({ length: 5 }, (v, i) => (
            <TrackListItemSkeleton key={`search-skeleton-${i}`} />
          ))
        ) : tracks.length === 0 ? (
          <p className="py-12 text-center text-gray text-[16px] w-full">
            등록된 트랙이 없습니다.
          </p>
        ) : (
          tracks &&
          tracks.map((track) => (
            <TrackListItem
              key={track.id}
              id={track.id}
              title={track.title}
              artist={
                track.artists?.find((artist) => artist.role === "Main")?.name ||
                ""
              }
              coverPath={track.coverPath}
              duration={track.duration}
              rating={track.rating}
            />
          ))
        )}
        {useInfiniteScroll && hasNextPage && (
          <div ref={ref} style={{ height: "1px" }} />
        )}
      </ul>
    </ArtistSectionWrapper>
  );
};
