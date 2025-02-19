import { ReviewCard } from "@/shared/ui/review/Review";

interface ReviewItem {
    id: number;
    reviewer: string; // 리뷰어 이름
    avatar: string; // 리뷰어 아바타
    rating: number; // 별점 (0~5)
    body: string; // 리뷰 내용 (본문만)
}
const mockReviews: ReviewItem[] = Array(6)
.fill(null)
.map((_, i) => ({
    id: i,
    reviewer: `Reviewer name ${i + 1}`,
    avatar: `https://picsum.photos/40/40?random=${i}`,
    rating: (i % 5) + 1,
    body: `Review body ${
    i + 1
    } - 이 노래는 Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
    Laboriosam explicabo blanditiis commodi esse, voluptate saepe dolorum quos? 
    Repudiandae velit illum dolores dicta, consequatur accusantium numquam.`, // 예시로 길게
}));
const ReviewsUi = () => {
    return (
        <div>
            <div>
                {mockReviews.map((review) => (
                    <ReviewCard key={review.id} userName={review.reviewer} userImage={review.avatar} reviewText={review.body} rating={review.rating} />
                ))}
            </div>
        </div>
    )
}


export const MypageSong: React.FC = () => { 
    return (
        <div>
            <ReviewsUi />
        </div>
    )
}