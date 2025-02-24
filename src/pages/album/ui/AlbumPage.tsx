import { Album } from '@/features/album/getAlbum/ui/Album';
import { AlbumInfo } from '@/features/album/getAlbum/ui/AlbumInfo';
import { Ratings } from '@/features/album/getRating/ui/Ratings';
import { Reviews } from '@/features/album/getReviews/ui/Reviews';
import { Tracks } from '@/features/album/getTracks/ui/Tracks';
import "./style.css";
import React from 'react';




export const AlbumPage: React.FC = () => {
    
    return (
        <div id="ab-page">
            <div className='flex items-center justify-between hz-top'>
                <Album />
                <Ratings />
            </div>
            <div className="my-[60px] flex items-start justify-between hz-bottom">
                <div className='hz-track'>
                    <Tracks />
                </div>
                <div className="flex-1 min-w-0 pl-[40px] hz-info">
                    <AlbumInfo />
                </div>
            </div>
            <Reviews />
        </div>
    )
};
