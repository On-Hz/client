import { Album } from "@/features/review/getAlbum/ui/Album";
import "./style.css";
import React from 'react';
import { ReviewDetail } from "@/features/review/getReview/ui/ReviewDetail";


export const ReviewPage: React.FC = () => {
    
    return (
        <div id="rv-page">
            <Album />
            <div className="pt-10 mt-10 border border-gray3 border-b-0 border-l-0 border-r-0">
                <ReviewDetail />
            </div>
        </div>
    )
};