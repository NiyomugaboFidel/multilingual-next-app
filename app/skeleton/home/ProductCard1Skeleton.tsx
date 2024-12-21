import React from 'react'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const ProductCard1Skeleton = () => {
  return (
    <div className="lg:w-[240px] lg:h-[380px] p-[20px] w-full flex flex-col items-center justify-center gap-[10px] lg:p-[20px] relative bg-gray-50 dark:bg-Gary-800 rounded-md">

    <div className=" hidden sm:block ">
      <Skeleton height={210} width={210} className=''  />
    </div>
    <div className=" block sm:hidden">
      <Skeleton className='hidden' height={240} width={100}  />
    </div>

    {/* Skeleton for product content */}
    <div className="w-full flex flex-col gap-[8px]">
      <div className="flex flex-col gap-[2px]">
        <div className="w-full flex items-center justify-start gap-[4px]">
          {/* Skeleton for star rating */}
          {Array(5).fill(null).map((_, index) => (
              <Skeleton  key={index} circle height={15} width={15} className="flex" />
          ))}
        </div>
        <Skeleton height={15} width={`100%`} />
      </div>

      <div className="w-[90%] flex justify-between items-center">
        <Skeleton height={20} width={100} />
        <div className='lg:block hidden'>
        <Skeleton  height={40} width={40}  />
        </div>

      </div>
    </div>
  </div>
  )
}

export default ProductCard1Skeleton