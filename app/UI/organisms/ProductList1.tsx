"use client";

import useFetchProducts from "@/app/hooks/useFetchProducts";
import ProductCardArrival from "../molecules/ProductCardArrival";

const ProductList1 = () => {
  const { data, error, isFetched , isLoading} = useFetchProducts();
  const products:any = data

     

  return (
    <div className="w-full min-h-full h-full">
      <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-[24px] min-h-full h-full">
        {products?.rows?.slice(0,8).map((item:any, index:number) => (
          <ProductCardArrival
            key={index}
            // Get the first image or an empty string if there are no images
            image={item.images && item.images.length > 0 ? item.images[0] : '/images/product1.png'}
            id={item.id}
            star={5}
            price={item.price}
            name={item.name}
            title={item.title}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList1;
