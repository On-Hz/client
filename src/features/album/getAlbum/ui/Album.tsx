import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FaceIcon from '@mui/icons-material/Face';
import { mockAlbums } from '../api/getAlbum';
import { mockArtists } from '../../getArtist/api/getArtist';
import { AlbumSkeleton } from './AlbumSkeleton';


const AlbumSec = () => {
    const album = mockAlbums[0];
    const artist = mockArtists[0];

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
                <AlbumSkeleton />
            ) : (
                    <div className='w-[700px] hz-left'>
                        <div className='flex items-end'>
                            {/* 앨범 커버 */}
                            <div className='hz-cover flex items-center justify-center rounded-[10px] w-[324px] h-[324px] overflow-hidden bg-gray3'>
                                {album.cover ? (
                                    <img
                                        src={album.cover}
                                        alt={album.title}
                                    />
                                ) : (
                                    <MusicNoteIcon style={{width:'100%',height:'100%'}} className='text-gray2'/>
                                )}
                            </div>
                            {/* 앨범, 아티스트 정보 */}
                            <div className='pl-[18px] hz-ab-info'>
                                <div className='flex items-center'>
                                    <span className='flex items-center justify-center w-[64px] h-[64px] rounded-[50%] overflow-hidden bg-gray3'>
                                        {artist.avatar ? (
                                            <img
                                                src={artist.avatar}
                                                alt={artist.name}
                                            />
                                        ) : (
                                            <FaceIcon style={{width:'100%',height:'100%'}} className="text-gray2"/>
                                        )}
                                    </span>
                                    <p className='text-gray pl-[5px]'>{artist.name}</p>
                                </div>
                                <p className='mt-[37px] mb-[17px] text-[36px] font-bold text-black hz-title'>{album.title}</p>
                                <div>
                                    <span className='text-gray text-[14px]'>Album</span>
                                    <span className='text-gray text-[13px] font-light flex items-center'>
                                        <i className='w-[5px] h-[5px] bg-gray5 rounded-[50%] mr-[4px]'></i>
                                        {album.release_date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}


export const Album: React.FC = () => {
    return (
        <AlbumSec />
    );
  };