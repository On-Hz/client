import React from 'react';
import { mockAlbums } from '../api/getAlbum';


const InformationSec = () => {
    const album = mockAlbums[0];
    return (
        <div>
            <ul className='border border-gray4 rounded-[10px] p-[10px]'>
                <li className='border-b border-gray4 py-[14px] text-[14px]'>
                    <span className='text-gray5 pr-[10px]'>발매일</span>
                    <span>{album.release_date}</span>
                </li>
                <li className='border-b border-gray4 py-[14px] text-[14px]'>
                    <span className='text-gray5 pr-[10px]'>아티스트</span>
                    <span>{album.artist.name}</span>
                </li>
                <li className='border-b border-gray4 py-[14px] text-[14px]'>
                    <span className='text-gray5 pr-[10px]'>장르</span>
                    <span>{album.genre}</span>
                </li>
                <li className='py-[14px] text-[14px]'>
                    <span className='text-gray5 pr-[10px]'>길이</span>
                    <span>{album.duration}</span>
                </li>
            </ul>
        </div>
    )
}
export const AlbumInfo: React.FC = () => {
    return (
        <InformationSec />
    );
  };