import React, { useEffect, useState } from 'react';
import { mockAlbums } from '../api/getAlbum';
import { AlbumInfoSkeleton } from './AlbumInfoSkeleton';


const InformationSec = () => {
    const album = mockAlbums[0];

    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        // 1.5초
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);
    
    return (
             <div>
                    {isLoading ? (
                            <AlbumInfoSkeleton />
                        ) : ( 
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
            </div>
    )
}
export const AlbumInfo: React.FC = () => {
    return (
        <InformationSec />
    );
  };