"use client";
import { useProductsListBYElectronics } from "@/app/hooks/useFetchProducts";
import ProductCard1Skeleton from "@/app/skeleton/home/ProductCard1Skeleton";
import { useTranslations } from "next-intl";
import ProductCard from "../molecules/ProductCards";

const ProductsList: React.FC = () => {
  const { data:products, error, isFetched, isLoading } = useProductsListBYElectronics();

  const t = useTranslations();
  return (
    <div className="flex flex-col w-full h-full my-[100px]">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px] py-[24px]">
        {isLoading || !products
          ? Array(6)
              .fill(null)
              .map((_, i) => <ProductCard1Skeleton key={i} />)
          : products.map((item: any, index: number) => (
              <ProductCard
                key={item.id}
                index={index}
                image={
                  item?.productimages && item.productimages?.length > 0
                    ? item.productimages?.[0]?.url
                    : ""
                }
                id={item.id}
                ratings={item.ratings}
                price={item.price}
                descriptions={item.description}
                name={item.name}
                alt={item.productimages?.[0]?.alt_text}
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
