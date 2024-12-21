"use client";

import Image from "next/image";
import React from "react";
import { IoMdArrowForward } from "react-icons/io";
import Skeleton from "react-loading-skeleton";
import Button from "../atoms/Button";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import "react-loading-skeleton/dist/skeleton.css"; // Add this to include Skeleton CSS

const NewArrivalBanner = () => {
  const { data, error, isFetched, isLoading } = useFetchProducts({ id: "2f1d6e7e-b728-4f23-8e1d-c13c0f6eb4ac" });

  const products: any = data;
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
        products?.rows?.slice(0, 1).map((item: any) => (
          <div
            key={item.id}
            style={{
              backgroundImage: `url('/images/${bannerCardData.BgImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100%",
            }}
            className="bg-[#243042] shadow rounded-[16px] w-full p-[20px] 2xl:w-[416px] h-[535px] bg-no-repeat bg-cover bg-center"
          >
            <div className="relative flex items-center justify-center">
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
                className="top-[25px] w-[294px] h-[313px] absolute rounded-sm shadow"
                src={ item.productimages?.[0]?.url}
                alt={ item.productimages?.[0]?.alt_text}
              />
            </div>

            <div className="h-full w-full flex flex-col justify-end pb-[40px] items-center gap-[20px]">
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
        ))
      )}
    </div>
  );
};

export default NewArrivalBanner;
