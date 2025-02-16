import React from 'react';
import { RoundButton } from '@/shared/ui/roundButton/RoundButton';
import { Button } from '@/shared/ui/button/Button';
import { TabButton } from '@/shared/ui/tabButton/TabButton';
import { InputBox } from '@/shared/ui/inputBox/InputBox';
import { ReviewCard } from '@/shared/ui/review/review';

export const AlbumPage: React.FC = () => {
    const tabNames = ['전체', '노래', '아티스트', '앨범'];
    return (
        <div>
            <RoundButton text={'정렬'}/>
            <Button text={'리뷰작성'}/>
            <TabButton nameArr={tabNames} />
            <InputBox width={'300px'} placeholder='입력해주세요.' />
            <div className='flex gap-5'>
                <div className='flex-1'>
                    <ReviewCard userName={'홍길동'} reviewText={'노래가 너무 좋아요 제가 반딧불인줄'}/>
                </div>
                <div className='w-[500px] bg-gray5'> 테스트 500px 영역</div>
            </div>
            
        </div>
    )
};
