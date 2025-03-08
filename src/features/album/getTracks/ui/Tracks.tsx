// Tracks.tsx
import React, { useEffect, useState } from 'react';
import { fetchTracksData } from '../api/getTracks'; // 수정된 API 호출 함수
import { TracksSkeleton } from './TracksSkeleton';
import StarIcon from '@mui/icons-material/Star';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import styled from 'styled-components';
import { Track } from '../model/types';

const TrackItem = styled.li`
    &:hover .track-num,
    &:hover .track-title {
        color: #395EA1;
    }
`;

const TrackListSec = () => {
  const [tracks, setTracks] = useState<Track[] | null>(null); //트랙데이터
  const [isLoading, setIsLoading] = useState(true); // 로딩상태

  useEffect(() => {
    // API 호출
    const fetchData = async () => {
      const { tracks, isLoading } = await fetchTracksData();
      setTracks(tracks); // 데이터 저장
      setIsLoading(isLoading); // 로딩 상태 설정
    };

    fetchData(); // 데이터가져오기
  }, []);

  return (
    <div className='w-[700px] hz-list'>
      {isLoading ? (
        <TracksSkeleton />
      ) : (
        <ul className='bg-[#F5F5F5] rounded-[5px] p-[28px]'>
          {tracks?.map((track, idx) => (
            <TrackItem key={track.id} className='cursor-pointer flex items-center justify-between border-gray2 border-b p-[12px]'>
              <div className='flex items-center hz-item-left'>
                <span className='text-[14px] pr-5 track-num'>{idx + 1}</span>
                <p className='hz-track-title overflow-hidden w-[90%] whitespace-nowrap text-ellipsis'>{track.title}</p>
              </div>
              <div className='flex items-center justify-end w-[150px] hz-item-info'>
                <button> <PlayCircleIcon /> </button>
                <div className='pl-10'>
                  <StarIcon className='text-yellow' style={{ width: '18px', height: '18px' }} />
                  <span className='text-gray text-[14px]'> {track.rating} / 5</span>
                </div>
              </div>
            </TrackItem>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Tracks: React.FC = () => {
  return (
    <TrackListSec />
  );
};
