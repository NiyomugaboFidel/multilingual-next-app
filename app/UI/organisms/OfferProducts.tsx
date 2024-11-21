"use client";
import MySlider from "@/app/components/MySlider";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import React from "react";
import { SplideSlide } from "@splidejs/react-splide";
import { IoIosArrowForward } from "react-icons/io";
import TimeCountdown from "@/app/components/TimeCountdown";
import ProductSliderCard from "../molecules/ProductSliderCard";
import { useTranslations } from "next-intl";
const OfferProducts = () => {
  const { data, error, isFetched, isLoading } = useFetchProducts();
  const t = useTranslations();
  const products: any = data;
  if (isLoading) {
    return null
  }

  if (error) {
    return null
  }
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-start w-full  border-gray-500 border-b-[1px] pb-[24px] ">
        <div className="flex lg:flex-row flex-col items-start lg:items-center justify-center gap-[32px]">
          <h3 className=" flex items-start  justify-start lg:text-[28px] text-[23px] leading-[30px] lg:leading-[36px] font-semibold ">
            {t("specialOffers.title")}
          </h3>
          <TimeCountdown />
        </div>
        <button className=" py-[5px] text-Gary-700 dark:text-textColor-light flex gap-[6px]  items-center  justify-center   text-[14px] leading-[20px] font-[500] ">
          <p>{t("viewAll.title")}</p> <IoIosArrowForward />{" "}
        </button>
      </div>

      <div className="pt-6">
        {isFetched && products?.rows?.length > 0 ? (
          <MySlider>
            {products?.rows?.map((item: any, index: number) => (
              <SplideSlide key={item.id}>
                <ProductSliderCard
                descriptions={item.description}
                  available={item.quantity}
                  totalStock={400}
                  key={item.id}
                  // index={index}
                  image={
                    item.images && item.images.length > 0
                      ? item.images[0]
                      : "/images/product2.png"
                  }
                  id={item.id}
                  // star={5}
                  price={item.price}
                  name={item.name}
                  bonus={item.bonus}
                  title={item.title}
                  ratings={item.ratings}
                  // isLoading={isLoading}
                />
              </SplideSlide>
            ))}
          </MySlider>
        ) : (
          <p className="text-center py-8">
            No products available at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default OfferProducts;
