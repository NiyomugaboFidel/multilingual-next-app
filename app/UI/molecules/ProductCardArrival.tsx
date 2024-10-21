import Image from "next/image";
import { ProductItems } from "@/app/types/products";
import ProductsArrivalLoader from "@/app/skeleton/home/ProductsArrivalLoader";

interface ProductCardArrivalProps extends ProductItems {
  isLoading: boolean;
}

const ProductCardArrival: React.FC<ProductCardArrivalProps> = ({
  price,
  name,
  id,
  star,
  image,
  title,
  isLoading,
}) => {
  if (isLoading) {
    return <ProductsArrivalLoader isLoading={isLoading} />;
  }

  return (
    <div className="w-full flex items-center justify-center gap-[16px]">
      <div className="w-1/3 h-[110px]">
        <Image width={100} height={100} src={image} alt="newProduct" priority />
      </div>
      <div className="w-2/3 flex flex-col gap-[8px] justify-center items-start">
        <div className="w-full flex  items-center justify-start gap-[8px]">
          <span className="flex items-center justify-center gap-[2px]">
            {Array(star)
              .fill(null)
              .map((_, index) => (
                <Image
                  key={index} // Add key for each item
                  width={10}
                  height={10}
                  src={"/icons/star-fill.svg"}
                  alt="star"
                  priority
                />
              ))}
          </span>
          <p className=" text-[12px] leading-[18px] text-gray-500">45</p>
        </div>
        <span>
          <p className="text-bodyDefault">
            {name}, {title}
          </p>
        </span>
        <span>
          <b>${price}</b>
        </span>
      </div>
    </div>
  );
};

export default ProductCardArrival;
