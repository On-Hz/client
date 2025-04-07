import React from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FaceIcon from '@mui/icons-material/Face';
import { useAlbumDetail } from '../api/getAlbumDetailApi';
import { useParams } from 'react-router-dom';
import { AlbumSkeleton } from './AlbumSkeleton';
import { Artist } from '@/shared/model';
import { formatDate } from '@/shared/helpers';

const AlbumSec = () => {
    const { albumId } = useParams<{ albumId: string }>();
    const { data: album, isLoading } = useAlbumDetail(albumId!);

    if (isLoading) return <AlbumSkeleton />;
    const coverPath = album?.cover ? `${import.meta.env.VITE_IMAGE_URL}${album.cover}` : null;

    return (
        <div className='w-[700px] hz-left'>
            <div className='flex items-end'>
                {/* 앨범 커버 */}
                <div className='hz-cover flex items-center justify-center rounded-[10px] w-[324px] h-[324px] overflow-hidden bg-gray3'>
                    {coverPath ? (
                        <img
                            src={album.cover}
                            alt={album.title}
                        />
                    ) : (
                        <MusicNoteIcon style={{width:'100%',height:'100%'}} className='text-gray2'/>
                    )}
                </div>
                {/* 앨범, 아티스트 정보 */}
                <div className='pl-[18px] hz-ab-info flex-1 min-w-0'>
                    {album.artists.length <= 1 ? (
                        // 1명 
                        album.artists.map((artist: Artist) => (
                            <div className="flex items-center" key={artist.id}>
                            <span className="flex items-center justify-center w-[30px] h-[30px] rounded-[50%] overflow-hidden bg-gray3 mb-2">
                                {artist.profilePath ? (
                                <img
                                    src={`${import.meta.env.VITE_IMAGE_URL}${artist.profilePath}`}
                                    alt={artist.name}
                                    className="w-full h-full object-cover"
                                />
                                ) : (
                                <FaceIcon style={{ width: "100%", height: "100%" }} className="text-gray2" />
                                )}
                            </span>
                            <p className="text-gray pl-[5px]">{artist.name}</p>
                            </div>
                        ))
                    ) : (
                        // 2명 이상
                        <>
                            <div className="flex items-center flex-wrap">
                                {album.artists.map((artist: Artist) => (
                                    <React.Fragment key={artist.id}>
                                        <span className="flex items-center justify-center w-[30px] h-[30px] mr-1 mb-1 rounded-full overflow-hidden bg-gray3">
                                            {artist.profilePath ? (
                                            <img
                                                src={`${import.meta.env.VITE_IMAGE_URL}${artist.profilePath}`}
                                                alt={artist.name}
                                                className="w-full h-full object-cover"
                                            />
                                            ) : (
                                            <FaceIcon
                                                style={{ width: "100%", height: "100%" }}
                                                className="text-gray2"
                                            />
                                            )}
                                        </span>
                                        {/* 마지막 아티스트가 아닐 때만 쉼표 추가
                                        {idx < album.artists.length - 1 && (
                                            <span className="text-gray px-1 text-sm">,</span>
                                        )} */}
                                    </React.Fragment>
                                ))}
                            </div>
                            <p className="text-gray text-[14px] pl-[5px] mt-3">
                                {album.artists.map((artist: Artist) => artist.name).join(", ")}
                            </p>   
                        </>                     
                    )}
                    <p className='mt-[37px] mb-[17px] text-[36px] font-bold text-black hz-title'>{album.title}</p>
                    <div>
                        <span className='text-gray text-[14px]'>앨범</span>
                        <span className='text-gray text-[13px] font-light flex items-center'>
                            <i className='w-[5px] h-[5px] bg-gray5 rounded-[50%] mr-[4px]'></i>
                            {formatDate(album.releaseDate || "")}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Album: React.FC = () => {
    return <AlbumSec />;
};
