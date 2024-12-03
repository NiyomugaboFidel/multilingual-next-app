import StarRating from '@/app/components/StatRating';
import Image from 'next/image';
import React from 'react';

interface ProductItem {
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  bonus: number;
  ratings: number[];
  createdAt: string; // Add createdAt property
}

interface ProductCardProps extends ProductItem {
  isLoading?: boolean;
  descriptions:string;
  index: number;
  alt:string

}


const isProductNew = (createdAt: string) => {
  const createdDate = new Date(createdAt);
  const now = new Date();
  // console.log('now:',now,'createdAt:',createdAt )
  

  const timeDiffInHours = (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60);

  return timeDiffInHours < 24; // True if less than 24 hours
};

const ProductCard: React.FC<ProductCardProps> = ({
  price,
  bonus,
  name,
  title,
  image,
  descriptions,
  ratings,
  alt,
  createdAt, // Destructure createdAt
}) => {
  const originalPrice = Number(price);
  const discountPercentage = bonus / 10;
  const discountAmount = (discountPercentage / 100) * originalPrice;
  const discountedPrice = originalPrice - discountAmount;
  const hasDiscount = discountPercentage >= 10;

  return (
    <div className="group relative flex h-full flex-col items-center justify-center gap-3 rounded-[6px] p-4  dark:border-gray-700">
      {/* Mobile Menu Icon */}
      <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-500 lg:hidden dark:border-gray-700">
        <svg 
          viewBox="0 0 24 24" 
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 12h.01M12 6h.01M12 18h.01M" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Badge */}
      {isProductNew(createdAt) ? (
        <span className=" cursor-pointer absolute z-30 left-2 top-2 rounded bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
          New
        </span>
      ) : hasDiscount ? (
        <span className=" cursor-pointer absolute z-30 left-2 top-2 rounded bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
          -{discountPercentage}%
        </span>
      ) : null}

      {/* Product Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
           width={230}
           height={230}
          src={image}
          alt={alt}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Details */}
      <div className="flex w-full flex-col gap-2">
        {/* Ratings */}
        <div className="flex items-center gap-2">
          <StarRating ratings={ratings} />
        </div>

        {/* Title */}
        <h3 className="line-clamp-2 text-sm font-medium text-gray-900 dark:text-white">
        {name}{" "}{descriptions}
        </h3>

        {/* Price and Cart */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${hasDiscount ? discountedPrice.toFixed(2) : originalPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <button className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-700">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
