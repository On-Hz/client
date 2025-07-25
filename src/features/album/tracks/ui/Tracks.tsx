import React from 'react';
import { TracksSkeleton } from './TracksSkeleton';
import StarIcon from '@mui/icons-material/Star';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlbumTracks } from '../api/getAlbumTracksApi';
import { Track } from '@/shared/model';
const TrackItem = styled.li`
    &:hover .track-num,
    &:hover .hz-track-title {
        color: #395EA1;
    }
`;

const TrackListSec = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const { data: tracks, isLoading } = useAlbumTracks(albumId!);
  const navigate = useNavigate(); 
  
  if (isLoading) return <TracksSkeleton />;

  return (
    <div className='w-[700px] hz-list'>
      <ul className='bg-[#F5F5F5] rounded-[5px] p-[28px]'>
        {tracks?.map((track:Track, idx:number) => (
          <TrackItem 
            key={track.id}
            onClick={() => navigate(`/track/${track.id}`)}
            className='cursor-pointer flex items-center justify-between border-gray2 border-b p-[12px]'>
            <div className='flex items-center hz-item-left flex-1 min-w-0'>
              <span className='text-[14px] pr-5 track-num'>{idx + 1}</span>
              <p className='hz-track-title overflow-hidden w-[90%]'>{track.title}</p>
            </div>
            <div className='flex items-center justify-end hz-item-info'>
              <StarIcon className='text-yellow' style={{ width: '18px', height: '18px' }} />
                <span className='text-gray text-[14px]'> 
                  {track.rating ? `${track.rating} / 5` : "0 / 5"}
                </span>
            </div>
          </TrackItem>
        ))}
      </ul>
    </div>
  );
};

export const Tracks: React.FC = () => {
  return (
    <TrackListSec />
  );
};
