import React from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FaceIcon from '@mui/icons-material/Face';
import { useAlbumDetail } from '../api/getAlbumDetailApi';
import { useNavigate, useParams } from 'react-router-dom';
import { AlbumSkeleton } from './AlbumSkeleton';
import { Artist } from '@/shared/model';
import { formatDate } from '@/shared/helpers';

const AlbumSec = () => {
    const { albumId } = useParams<{ albumId: string }>();
    const { data: album, isLoading } = useAlbumDetail(albumId!);
    const navigate = useNavigate(); 

    if (isLoading) return <AlbumSkeleton />;
    const coverPath = album?.coverPath ? album.coverPath : null;

    return (
        <div className='w-[700px] hz-left'>
            <div className='flex items-end'>
                {/* 앨범 커버 */}
                <div className='hz-cover flex items-center justify-center rounded-[10px] w-[324px] h-[324px] overflow-hidden bg-gray3'>
                    {coverPath ? (
                        <img
                            src={album.coverPath}
                            alt={album.title}
                        />
                    ) : (
                        <MusicNoteIcon style={{width:'100%',height:'100%'}} className='text-gray2'/>
                    )}
                </div>
                {/* 앨범, 아티스트 정보 */}
                <div className='pl-[18px] hz-ab-info flex-1 min-w-0'>
                    <div className="flex items-center flex-wrap">
                        {album.artists.filter((artist: Artist) => artist.role === "Main")
                        .map((artist: Artist) => (
                            <span
                                key={artist.id}
                                className="flex items-center justify-center w-[30px] h-[30px] mr-1 mb-1 rounded-full overflow-hidden bg-gray3"
                            >
                                {artist.profilePath ? (
                                <img
                                    src={artist.profilePath}
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
                        ))}
                    </div>
                    <div className="text-gray text-[14px] pl-[5px] mt-3 flex flex-wrap">
                    {[...new Set([
                        ...album.artists.filter((a: Artist) => a.role === "Main"),
                        ...album.artists.filter((a: Artist) => a.role !== "Main"),
                    ])].map((artist: Artist, idx, arr) => (
                        <span
                        key={artist.id}
                        
                        className={`cursor-pointer hover:underline hover:text-point ${
                          artist.role === "Main" ? "text-point" : ""
                        }`}
                        onClick={() => navigate(`/artist/${artist.id}`)}
                        >
                        {artist.name}
                        {idx < arr.length - 1 && <span className="px-1">,</span>}
                        </span>
                    ))}
                    </div>
                    <p
                        className={`mt-[37px] mb-[17px] font-bold text-black hz-title ${
                        album.title.length >= 25 ? "hz-title-len-max" : "hz-title-len-default"
                    }`}
                    >
                        {album.title}
                    </p>
                    <div>
                        <span className='text-gray text-[14px]'>앨범</span>
                        <span className='text-gray text-[13px] flex items-center'>
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
