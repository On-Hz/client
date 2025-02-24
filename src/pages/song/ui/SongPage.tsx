import { Album } from '@/features/song/fetchAlbum/ui/Album';
import { Ratings } from '@/features/song/fetchRating/ui/Ratings';
import { Reviews } from '@/features/song/fetchReviews/ui/Reviews';
import "./style.css";
import React from 'react';

export const SongPage: React.FC = () => {
    return (
        <div id="sg-page">
            <div className='flex items-center justify-between hz-top'>
                <Album />
                <Ratings />
            </div>
            <div className="my-[60px]">
                <Reviews />
            </div>
        </div>
    )
};
