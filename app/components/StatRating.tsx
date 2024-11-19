import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  ratings: number[];
}

const StarRating: React.FC<StarRatingProps> = ({ ratings }) => {
  // Check for empty array and default to 0 rating if empty
  const averageRating = ratings.length > 0
    ? ratings.reduce((a, b) => a + b, 0) / ratings.length
    : 0;

  const minRating = Math.min(...ratings, 0); // Use 0 as fallback for min
  const maxRating = Math.max(...ratings, 1); // Use 1 as fallback for max to avoid division by 0

  // Normalize to a 5-star scale
  const normalizedRating = maxRating > minRating
    ? ((averageRating - minRating) / (maxRating - minRating)) * 5
    : averageRating;

  const fullStars = Math.floor(normalizedRating);
  const halfStar = normalizedRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className='flex items-center justify-center gap-[10px]'>
        <div className='flex gap-[4px] items-center justify-center text-[14px]'>
      {[...Array(fullStars === 0 ? 1 : fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} color="gold" />
      ))}
      {halfStar && <FaStarHalfAlt color="gold" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} color="gold" />
      ))}
    </div>
      <span className="text-xs text-gray-600 dark:text-gray-300">({averageRating.toFixed() === "0" ? 1:averageRating.toFixed() })</span>
    </div>
  );
};

export default StarRating;
