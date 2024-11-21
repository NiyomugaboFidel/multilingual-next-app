"use client";
import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCard1 from "../molecules/ProductCards";
import { IoIosArrowForward } from "react-icons/io";
import ProductCard1Skeleton from "@/app/skeleton/home/ProductCard1Skeleton";
import { useTranslations } from "next-intl";

const ProductsList: React.FC = () => {
  const { data, error, isFetched, isLoading } = useFetchProducts();
  const products: any = data;
  const t = useTranslations();
  return (
    <div className="flex flex-col w-full h-full my-[100px]">
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
                  item.images && item.images.length > 0
                    ? item.images[0]
                    : ""
                }
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

export default ProductsList
