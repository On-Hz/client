import { Album } from '@/features/song/getAlbum/ui/Album';
import { Ratings } from '@/features/song/getRating/ui/Ratings';
import { Reviews } from '@/features/song/getReviews/ui/Reviews';
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
