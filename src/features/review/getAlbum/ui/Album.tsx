import React, { useEffect, useState } from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FaceIcon from '@mui/icons-material/Face';
import { fetchAlbum } from '../api/getFetchAlbum';
import { mockArtists } from '../../getArtist/api/getFetchArtist';
import { AlbumSkeleton } from './AlbumSkeleton';
import { AlbumType } from '../model/types';


const AlbumSec = () => {
    const artist = mockArtists[0];
    const [album, setAlbum] = useState<AlbumType | null>(null); // 첫 번째 앨범
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태

    useEffect(() => {
        const fetchData = async () => {
            const { album, isLoading } = await fetchAlbum();
            setAlbum(album); // 첫 번째 앨범 저장
            setIsLoading(isLoading); // 로딩 상태 설정
        };

        fetchData(); // API 호출
    }, []);
    return (
        <div>
            {isLoading ? (
                    <AlbumSkeleton />
                ) : (
                    <div className='hz-top'>
                    <div className='flex items-end'>
                        {/* 앨범 커버 */}
                        <div className='cursor-pointer border-2 border-transparent hz-cover flex items-center justify-center rounded-[10px] w-[240px] h-[240px] overflow-hidden bg-gray3
                        hover:border-point '>
                            {album?.cover ? (
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                />
                            ) : (
                                <MusicNoteIcon style={{ width: '100%', height: '100%' }} className='text-gray2' />
                            )}
                        </div>
                        {/* 앨범, 아티스트 정보 */}
                        <div className='pl-[18px] hz-ab-info flex-1 min-w-0'>
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
                            <p className='mt-[37px] mb-[17px] text-[36px] font-bold text-black hz-title'>{album?.title}</p>
                            <div>
                                <span className='text-gray text-[14px]'>앨범</span>
                                <span className='text-gray text-[13px] font-light flex items-center'>
                                    <i className='w-[5px] h-[5px] bg-gray5 rounded-[50%] mr-[4px]'></i>
                                    {album?.release_date}
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