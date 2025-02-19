import React from 'react';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FaceIcon from '@mui/icons-material/Face';
import StarIcon from '@mui/icons-material/Star';
import { RoundButton } from '@/shared/ui/roundButton/RoundButton';
import { Button } from '@/shared/ui/button/Button';
import { ReviewCard } from '@/shared/ui/review/Review';
import styled from 'styled-components';
import { useModalStore } from '@/shared/stores';

const ConTitle = styled.p`
    font-size:20px;
    font-weight:600;
    padding-bottom:20px;
`;
//
interface UserRating {
    id: number,
    rating: number,
}
interface Album {
    id: number;
    title: string;
    cover?: string;
    average_rating: number,
    ratings_count: number,
    release_date: string,
    duration: string,
    genre: string,
    artist: {
        id: number;
        name: string;
    };
}
interface Artist {
    id: number,
    name: string,
    avatar?: string
}
interface ReviewItem {
    id: number;
    reviewer: string; // 리뷰어 이름
    avatar: string; // 리뷰어 아바타
    rating: number; // 별점 (0~5)
    body: string; // 리뷰 내용 (본문만)
}

//
const mockUserAlbumRating: UserRating[] = [
    {
        id:1,
        "rating":3
    }
]
const mockAlbums: Album[] = [
    {
        "id": 2,
        "title": "To Pimp a Butterfly",
        "cover": "",
        "average_rating": 9.433468752701184,
        "ratings_count": 729,
        "release_date": "2015-03-16",
        "duration": "4680",
        "genre":"POP",
        "artist": {
            "id": 525046,
            "name": "Kendrick Lamar"
        }
    }
]
const mockArtists : Artist[] = [
    {
        "id":1,
        "name":"Balloonerism",
        "avatar":"https://picsum.photos/200/300?random=6",
    }
]
const mockReviews: ReviewItem[] = Array(6)
.fill(null)
.map((_, i) => ({
    id: i,
    reviewer: `Reviewer name ${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    body: `Review body ${
    i + 1
    } - Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
    Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
}));

//
const AlbumDetailUi = () => {
    const album = mockAlbums[0];
    const artist = mockArtists[0];
    return (
        <div className='w-[700px]'>
            <div className='flex items-end'>
                {/* 앨범 커버 */}
                <div className='flex items-center justify-center rounded-[10px] w-[324px] h-[324px] overflow-hidden bg-gray3'>
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
                <div className='pl-[18px]'>
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
                    <p className='mt-[37px] mb-[17px] text-[36px] font-bold text-black'>{album.title}</p>
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
const RatingDetailUi = () => {
    //총 별점
    //평균 별점
    //내 별점
    const { openModal } = useModalStore();
    const album = mockAlbums[0];
    const rating = mockUserAlbumRating[0];
    return (
        <div className='flex-1 min-w-0 pl-[40px]'>
            <ul className='flex items-center justify-center border border-gray4 rounded-[10px] gap-10 py-[40px]'>
                <li className='text-center'>
                    <p className='text-[24px]'>{album.ratings_count}</p>
                    <span className="text-gray4 text-[14px]">Total ratings</span>
                </li>
                <li className='text-center'>
                    <p className='text-[24px] text-gray4 '>
                        <StarIcon className='text-yellow' style={{width:'24px',height:'24px'}} />
                        <span className='text-[#1C66E0] px-[5px]'>{album.average_rating.toFixed(2)}</span>
                         / 5
                    </p>
                    <span className="text-gray4 text-[14px]">Average rating</span>
                </li>
                <li className='text-center'>
                    <p className='text-[24px] text-gray4'>
                        <StarIcon className='text-gray5' style={{width:'24px',height:'24px'}} />
                        <span className='px-[5px]'>{rating.rating}</span>
                         / 5
                        </p>
                    <span className="text-gray4 text-[14px]">Your rating</span>
                </li>
            </ul>
            <div className='flex justify-end mt-[18px]'>
                  <Button 
                        onClick={() => openModal("writeReviewModal")}
                        text="리뷰 작성"
                    />
            </div>
        </div>
    )
}
const ReviewsUi = () => {
    return (
        <div>
            <div className='flex justify-between pb-[20px]'>
                <ConTitle>Reviews</ConTitle>
                <RoundButton text="정렬" />
            </div>
            <div>
                {mockReviews.map((review) => (
                    <ReviewCard key={review.id} userName={review.reviewer} userImage={review.avatar} reviewText={review.body} rating={review.rating} />
                ))}
            </div>
        </div>
    )
}

export const SongPage: React.FC = () => {
    return (
        <div>
            <div className='flex items-center justify-between'>
                <AlbumDetailUi />
                <RatingDetailUi />
            </div>
            <div className="my-[60px]">
                <ReviewsUi />
            </div>
        </div>
    )
};
