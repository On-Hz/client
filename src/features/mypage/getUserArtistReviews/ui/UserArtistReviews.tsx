import { ReviewCard } from "@/shared/ui/review/Review"
import { mockReviews } from "../api/getUserArtistReviews"

export const UserArtistReviews = () => {
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
