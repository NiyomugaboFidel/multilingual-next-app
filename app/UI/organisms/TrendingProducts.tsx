"use client";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCard1 from "../molecules/ProductCards";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard1Skeleton from "@/app/skeleton/home/ProductCard1Skeleton";
import { useTranslations } from "next-intl";
import Link from "next/link";

const TrendingProducts: React.FC = () => {
  const { data, error, isFetched, isLoading } = useFetchProducts({ id: "2f1d6e7e-b728-4f23-8e1d-c13c0f6eb4ac" });

  const products: any = data;
  const t = useTranslations();
  return (
    <div className="flex flex-col w-full h-full my-[100px]">
      <div className="flex justify-between items-start w-full  border-gray-500 border-b-[1px] pb-[24px] ">
        <h3 className="lg:text-[28px]  lg:leading-[36px] text-[23px] leading-[30px] font-semibold">
          {t("trendingProducts.title")}{" "}
        </h3>
        <Link href={`/search?category=el&status=trending`} className=" py-[5px] text-Gary-700 dark:text-textColor-light flex gap-[6px]  items-center  justify-center   text-[14px] leading-[20px] font-[500] ">
          <p> {t("viewAll.title")}</p> <IoIosArrowForward />{" "}
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] py-[24px]">
        {isLoading || !products
          ? Array(6)
              .fill(null)
              .map((_, i) => <ProductCard1Skeleton key={i} />)
          : products?.rows?.map((item: any, index: number) => (
              <ProductCard1
                key={item.id}
                index={index}
                image={
                  item?.productimages && item.productimages?.length > 0
                    ? item.productimages?.[0]?.url
                    : ""
                }
                alt={item.productimages?.[0]?.alt_text}
                id={item.id}
                ratings={item.ratings}
                price={item.price}
                descriptions={item.description}
                name={item.name}
                bonus={item.bonus}
                title={item.title}
                isLoading={isLoading}
                createdAt={item.createdAt}
              />
            ))}
      </div>
    </div>
  );
};

export default TrendingProducts;
