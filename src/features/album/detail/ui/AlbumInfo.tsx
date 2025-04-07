import React from 'react';
import { AlbumInfoSkeleton } from './AlbumInfoSkeleton';
import { useParams } from 'react-router-dom';
import { useAlbumDetail } from '../api/getAlbumDetailApi';
import { Artist } from '@/shared/model';
import { formatDate } from '@/shared/helpers';
const InformationSec = () => {

    const { albumId } = useParams<{ albumId: string }>();
    const { data: album, isLoading } = useAlbumDetail(albumId!);
    
    if (isLoading) return <AlbumInfoSkeleton />;
    
    return (
        <div>
            <ul className='border border-gray4 rounded-[10px] p-[10px]'>
                <li className='border-b border-gray4 py-[14px] text-[14px] flex justify-between'>
                    <span className='text-gray5 pr-[10px]'>발매일</span>
                    <span className='flex-1'> {formatDate(album.releaseDate || "")}</span>
                </li>
                <li className='border-b border-gray4 py-[14px] text-[14px] flex justify-between'>
                    <span className='text-gray5 pr-[10px]'>아티스트</span>
                    <div className='flex-1'>
                        {album.artists.map((artist: Artist, index: number) => (
                        <span key={artist.id}>
                            {artist.name}
                            {index !== album.artists.length - 1 && ", "}
                        </span>
                        ))}
                    </div>
                </li>
                <li className='border-b border-gray4 py-[14px] text-[14px] flex justify-between'>
                    <span className='text-gray5 pr-[10px]'>장르</span>
                    <span className='flex-1'>{album.genres?.[0]?.code ?? ""}</span>
                </li>
                <li className='py-[14px] text-[14px] flex justify-between'>
                    <span className='text-gray5 pr-[10px]'>길이</span>
                    <span className='flex-1'>{album.createdAt}</span>
                </li>
            </ul>
        </div>
    );
};

export const AlbumInfo: React.FC = () => {
    return <InformationSec />;
};
