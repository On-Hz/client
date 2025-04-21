import React from 'react';
import { AlbumInfoSkeleton } from './AlbumInfoSkeleton';
import { useParams } from 'react-router-dom';
import { useAlbumDetail } from '../api/getAlbumDetailApi';
import { Artist, Genre } from '@/shared/model';
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
                {/* 아티스트 */}
                <li className="border-b border-gray4 py-[14px] text-[14px] flex justify-between">
                    <span className="text-gray5 pr-[10px]">아티스트</span>
                    <div className="flex-1">
                    {album.artists?.filter((a: Artist) => a.role === "Main" || a.role === "And").length > 0
                        ? album.artists
                            .filter((a: Artist) => a.role === "Main" || a.role === "And")
                            .map((a: Artist, i: number, arr: Artist[]) => (
                                <span key={a.id}>
                                {a.name}
                                {i !== arr.length - 1 && ", "}
                                </span>
                            ))
                        : <span className="text-gray">정보가 없습니다.</span>
                    }
                    </div>
                </li>
                {/* 피쳐링 */}
                <li className="border-b border-gray4 py-[14px] text-[14px] flex justify-between">
                    <span className="text-gray5 pr-[10px]">피쳐링</span>
                    <div className="flex-1">
                        {album.artists?.filter((a: Artist) => a.role === "Feat").length > 0
                        ? album.artists
                            .filter((a: Artist) => a.role === "Feat")
                            .map((a: Artist, i: number, arr: Artist[]) => (
                                <span key={a.id}>
                                {a.name}
                                {i !== arr.length - 1 && ", "}
                                </span>
                            ))
                        : <span className="text-gray">정보가 없습니다.</span>
                        }
                    </div>
                </li>
                {/* 장르 */}
                <li className='py-[14px] text-[14px] flex justify-between'>
                    <span className="text-gray5 pr-[10px]">장르</span>
                    <div className="flex-1">
                        {album.genres && album.genres.length > 0 ? (
                            album.genres.map((genre: Genre, index: number) => (
                            <span key={genre.code}>
                                {genre.code}
                                {index !== album.genres.length - 1 && ", "}
                            </span>
                            ))
                        ) : (
                            <span className="text-gray">정보가 없습니다.</span>
                        )}
                    </div>
                </li>
            </ul>
        </div>
    );
};

export const AlbumInfo: React.FC = () => {
    return <InformationSec />;
};
