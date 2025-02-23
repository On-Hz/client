import { AlbumCard } from "@/shared/ui/album/AlbumCard";
import { mockDiscography } from "../api/getArtistTopDiscography";

export const ArtistTopRateDiscography = () => {
  return (
    <section className="px-4 py-8 mx-auto max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Discography</h2>
      <div className="flex gap-3 overflow-x-hidden">
        {mockDiscography.map((album) => (
          <AlbumCard
            id={album.id}
            title={album.title}
            cover={album.cover}
            release={album.release}
          />
        ))}
      </div>
    </section>
  );
};
