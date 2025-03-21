import { Link } from "react-router-dom";
import { useTopAlbum } from "../api/getTopRateAlbumList";
import { getGridStyles } from "@/shared/helpers";
import { TopRateAlbumTitle } from "./TopRateAlbumTitle";
import { AlbumSkeleton } from "./TopRateAlbumSkeleton";
import MusicNoteIcon from "@mui/icons-material/MusicNote";


const AlbumItem: React.FC = () => {
  const { data, isLoading } = useTopAlbum();
  if (isLoading) return <AlbumSkeleton />;

  return (
    <div className="hz-landing-album-gridlayout grid gap-5">
      {data &&
        data.map((album: any, index: number) => {
          const mainArtist = album.artists.find(
            (artist: any) => artist.role === "main"
          );
          return (
             <Link to={`/album/${album.id}`} 
              key={album.id}
              className="flex flex-col p-3 border rounded-lg cursor-pointer bg-white border-gray5 hz-landing-album-item transition-transform transform hover:scale-105"
              style={getGridStyles(index)}
            >
              <div className="mb-4">
                <div className="album-title-wrapper relative overflow-hidden">
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
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">인기 앨범</h2>
      <AlbumItem />
    </section>
  );
};
