"use client";

import useFetchProducts, { useProductsListBYElectronics } from "@/app/hooks/useFetchProducts";
import ProductCardArrival from "../molecules/ProductCardArrival";
import ProductsArrivalLoader from "@/app/skeleton/home/ProductsArrivalLoader";

const ProductList1 = () => {
  const { data:products, error, isFetched, isLoading } = useProductsListBYElectronics();

  return (
    <div className="w-full min-h-full h-full">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-[24px] min-h-full h-full">
        {isLoading || error
          ? Array(8)
              .fill(null)
              .map((_, i) => <ProductsArrivalLoader key={i} isLoading={isLoading} />)
          : products?.slice(0, 8).map((item:any, index:number) => (
              <ProductCardArrival
                key={item.id} // Use `item.id` as the key
                image={
                  item.productimages?.[0]?.url || "/images/product1.png"
                } // Get the first product image or fallback
  
                price={item.price}
                ratings={item.ratings}
                name={item.name}
                title={item.title}
                // isLoading={false} // Pass `false` since it's no longer loading
                descriptions={item.description}
              />
            ))}
      </div>
    </div>
  );
};

export default ProductList1;
