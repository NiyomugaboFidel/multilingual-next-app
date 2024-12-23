import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import StarRating from '@/app/components/StatRating';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  title: string;
  price: string;
  image: string;
  bonus: number;
  ratings:number[]
  available: number;
  totalStock: number;
  descriptions:string
}

const ProductSliderCard: React.FC<Product> = ({
  id,
  price,
  bonus,
  name,
  title,
  image,
  ratings,
  available,
  totalStock,
  descriptions

}) => {
  const originalPrice = Number(price);
  const discountPercentage = bonus / 10;
  const discountAmount = (discountPercentage / 100) * originalPrice;
  const discountedPrice = originalPrice - discountAmount;
  const hasDiscount = discountPercentage >= 10;
  const availabilityPercentage = (available / totalStock) * 100;

  return (
    <div className="group relative flex w-[270px] flex-col items-start gap-3 p-4 md:w-[306px]">
      {/* Menu Button */}
      <button className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 shadow-sm transition-colors hover:bg-gray-50 lg:hidden dark:border-gray-700 dark:hover:bg-gray-800">
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

      {/* Product Image */}
      <div className="relative h-[288px] w-full overflow-hidden p-5">
          <Link href={`/item?id=${id}`} >
          <img
          src={image}
          alt={name}
          className="h-full w-full object-contain transition-transform duration-500 hover:scale-150"
        />
          </Link>
      </div>

      {/* Product Details */}
      <div className="flex w-full flex-col gap-2">
        {/* Ratings */}
        <div className="flex items-center gap-2">
    
          <StarRating ratings={ratings} />
        
        </div>

        {/* Title */}
        <Link href={`/item?id=${id}`}>
        <h3 className="line-clamp-2 text-base font-medium text-gray-900 dark:text-white">
        {name}{" "}{descriptions}{" "}{title}
        </h3>
        </Link>

        {/* Price and Cart */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
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

        {/* Availability Bar */}
        <div className="w-full">
          <div className="relative h-1 w-full rounded-full bg-gray-100 dark:bg-gray-700">
            <div 
              className="absolute h-1 rounded-full bg-red-500"
              style={{ width: `${availabilityPercentage}%` }}
            />
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Available: <span className="font-medium text-gray-900 dark:text-white">{available.toFixed()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

 export default ProductSliderCard