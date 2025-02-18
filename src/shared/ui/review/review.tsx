import React, { useState } from 'react';
import Rating from "@mui/material/Rating";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
interface ReviewProps {
    userName: string,
    userImage?: string, 
    reviewText: string,
    rating: number,
}

export const ReviewCard = ({userName, userImage, reviewText, rating}: ReviewProps) => {
    const [liked, setLiked] = useState(false);

    const onClick = () => {
        setLiked(!liked);
    }

    return (
       <div className='mb-[24px] px-[24px] py-[18px] bg-white border-gray3 border rounded-[8px]'>
            <div className='flex items-center'>
                <span className='w-[64px] h-[64px] rounded-[50%] overflow-hidden border border-gray3'>
                    {userImage ? (
                        <img src={userImage} alt="" className='w-full h-full'/>
                    ) : (
                        <AccountCircleIcon className='text-gray5' style={{width:'100%',height:'100%'}} />
                    )}
                </span>
                <p className='font-bold text-gray pl-[12px]'>{userName}</p>
            </div>
            <div className='py-[15px]'>
                <Rating 
                    value={rating} readOnly
                    sx={{
                        '& .MuiRating-iconFilled': {
                          color: '#FFD231', // 채워진 별 색상
                        },
                        '& .MuiRating-iconEmpty': {
                          color: '#a1a1a1', // 비어있는 별 색상
                        },
                      }}
                 />
            </div>
            <div className='min-h-[70px]'>
                {reviewText}
            </div>
            <div className='pt-[15px]'>
                <button onClick={onClick}><FavoriteIcon className={liked ? "text-red" : "text-white stroke-black stroke-[2px]"}/></button>
            </div>
       </div>
    )
};
  