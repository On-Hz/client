import StarIcon from '@mui/icons-material/Star';

const RatingBox = ({ rating }: { rating: number }) => {
    // 별점 표시를 위해 별 5개로 나누기
    const fullStars = Math.floor(rating);  // 채워진 별
    const halfStar = rating % 1 !== 0;    // 반 별
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // 비어 있는 별
  
    return (
      <div>
        <div className="flex items-center">
          {/* 채워진 별 */}
          {Array(fullStars).fill(null).map((_, i) => (
            <StarIcon key={`full-${i}`} className="text-yellow" style={{ width: '24px', height: '24px' }} />
          ))}
          
          {/* 반 별 */}
          {halfStar && (
            <StarIcon key="half" className="text-yellow" style={{ width: '24px', height: '24px' }} />
          )}
          
          {/* 비어있는 별 */}
          {Array(emptyStars).fill(null).map((_, i) => (
            <StarIcon key={`empty-${i}`} className="text-gray5" style={{ width: '24px', height: '24px' }} />
          ))}
        </div>
      </div>
    );
  };
  
  export default RatingBox;