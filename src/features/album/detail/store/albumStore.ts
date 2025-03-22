import { create } from 'zustand';
import { AlbumType } from '../model/types';
import { fetchAlbum } from '../api/getAlbumDetailApi';

interface AlbumStore {
    album: AlbumType | null;
    isLoading: boolean;
    fetchAlbumData: () => void;
}

export const useAlbumStore = create<AlbumStore>((set) => ({
    album: null,
    isLoading: true,
    fetchAlbumData: async () => {
        const data = await fetchAlbum();
        set({ album: data, isLoading: false });
        console.log("dddd");
    }
}));
