import { ReviewCard } from "@/shared/ui/reviewCard/ReviewCard"
import { mockReviews } from "../api/getUserSongReviews"

export const UserSongReviews = () => {
    return (
        <div>
            <div>
                {mockReviews.map((review) => (
                    <ReviewCard key={review.id} isMybtn={true} userName={review.reviewer} userImage={review.avatar} reviewText={review.body} rating={review.rating} />
                ))}
            </div>
        </div>
    )
}
