"use client";

import Image from "next/image";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import Button from "../atoms/Button";
import useFetchProducts, { useProductsListBYElectronics } from "@/app/hooks/useFetchProducts";
import "react-loading-skeleton/dist/skeleton.css"; // Add this to include Skeleton CSS

const NewArrivalBanner = () => {
  const { data:products, error, isFetched, isLoading } = useProductsListBYElectronics();
  const bannerCardData = {
    ProductName: "MacBook",
    ProductPrice: "1,199",
    ProductImage: "/images/product1.png",
    BgImage: "banner.png",
    ProductDesc: "Be Pro Anywhere",
  };

  return (
    <div>
      {isLoading || !products ? (
        <div
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
          }}
          className="bg-gray-100 shadow rounded-[16px] w-full p-[20px] 2xl:w-[416px] h-[535px] bg-no-repeat bg-cover bg-center"
        >
          <div className="hidden sm:flex w-full items-center justify-center">
          <Skeleton height={313} width={294} />
          </div>
          <div className="flex sm:hidden w-full items-center justify-center">
          <Skeleton height={313} width={250} />
          </div>
          <div className="w-full flex flex-col justify-end pb-[40px] pt-[20px] items-center gap-[20px]">
            <Skeleton width={200} height={30} />
            <Skeleton width={150} height={20} />
            <Skeleton width={100} height={40} />
          </div>
        </div>
      ) : (
        products.slice(0, 1).map((item: any) => (
          <div
            key={item.id}
            style={{
              backgroundImage: `url('/images/${bannerCardData.BgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
            }}
            className="bg-[#243042] shadow rounded-[16px] w-full p-[20px] 2xl:w-[416px] h-full min-h-[535px] bg-no-repeat bg-cover bg-center"
          >
       <div className="flex flex-col items-center justify-between h-full gap-5">
       <div className="relative flex items-center justify-center p-5">
              <Image
                   style={
                    {
                      width:'auto',
                      height:'auto'
                    }
                   }
                priority
                width={294}
                height={313}
                className=" w-full rotate-3 h-full  rounded-[8px] shadow"
                src={ item.productimages?.[0]?.url}
                alt={ item.productimages?.[0]?.alt_text}
              />
            </div>

            <div className="w-full h-full flex flex-col justify-end pb-[40px] items-center gap-[20px]">
              <h3 className="text-headingH2 text-white font-bold text-center w-full">
                {item.name}
              </h3>
              <p className="text-bodyDefault text-textColor text-center">{item.title}</p>
              <Button
                className=""
                label={`From $${item.price}`}
                icon={true}
                iconTag={
                  <IoMdArrowForward className="-rotate-45 h-[18px] flex items-center justify-center" />
                }
                type="button"
                onClick={() => {
                  console.log(`Button clicked by ${item.name}`);
                }}
              />
            </div>
       </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NewArrivalBanner;
