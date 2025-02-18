import { ReviewCard } from "@/shared/ui/review/Review";

interface ReviewProps {
  userName: string;
  userImage?: string;
  reviewText: string;
}

const mockReviews: ReviewProps[] = Array(10)
  .fill(null)
  .map((_, i) => ({
    userName: `Reviewer ${i + 1}`,
    // 짝수번째는 아바타 있음, 홀수번째는 userImage 생략
    userImage:
      i % 2 === 0 ? `https://picsum.photos/64/64?random=${i}` : undefined,
    reviewText: `Lorem ipsum dolor sit amet, review #${
      i + 1
    } 내용이 들어갑니다. 예시 문장으로 채워넣을 수 있습니다.`,
  }));

export const ArtistReviews: React.FC = () => {
  return (
    <section className="px-4 py-8 mx-auto space-y-4 max-w-7xl">
      <h2 className="mb-4 text-2xl font-bold">Reviews</h2>
      {mockReviews.map((review, index) => (
        <ReviewCard
          key={index}
          userName={review.userName}
          userImage={review.userImage}
          reviewText={review.reviewText}
        />
      ))}
    </section>
  );
};
