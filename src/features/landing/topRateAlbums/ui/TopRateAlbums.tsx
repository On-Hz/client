import { Link } from "react-router-dom";
import { useTopAlbums } from "../api/getTopRateAlbumsApi";
import { getGridStyles } from "@/shared/helpers";
import { TopRateAlbumTitle } from "./TopRateAlbumTitle";
import { AlbumSkeleton } from "./TopRateAlbumsSkeleton";
import MusicNoteIcon from "@mui/icons-material/MusicNote";

const AlbumItem: React.FC = () => {
  const { data, isLoading } = useTopAlbums();
  if (isLoading) return <AlbumSkeleton />;

  return (
    <div className="grid gap-5 hz-landing-album-gridlayout">
      {data &&
        data.map((album: any, index: number) => {
          const mainArtist = album.artists.find(
            (artist: any) => artist.role === "Main"
          );
          return (
            <Link
              to={`/album/${album.id}`}
              key={album.id}
              className="flex flex-col p-3 transition-transform transform bg-white border rounded-lg cursor-pointer border-gray5 hz-landing-album-item hover:scale-105"
              style={getGridStyles(index)}
            >
              <div className="mb-4">
                <div className="relative overflow-hidden album-title-wrapper">
                  <TopRateAlbumTitle text={album.title} />
                </div>
                <p className="text-xs text-neutral-500">{mainArtist?.name}</p>
              </div>
              {album.coverPath ? (
                <img
                  src={album.coverPath}
                  alt={album.title}
                  className="object-cover w-full rounded-lg aspect-square"
                />
              ) : (
                <div className="object-cover rounded-lg bg-gray3 aspect-square">
                  <MusicNoteIcon
                    style={{ width: "100%", height: "100%" }}
                    className="text-gray2"
                  />
                </div>
              )}
            </Link>
          );
        })}
    </div>
  );
};

export const TopRateAlbums: React.FC = () => {
  return (
    <section className="px-4 py-8 max-800:py-0">
      <h2 className="mb-4 text-2xl font-bold hz-landing-title">인기 앨범</h2>
      <AlbumItem />
    </section>
  );
};
