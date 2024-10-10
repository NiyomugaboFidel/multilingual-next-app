import Image from "next/image";
import { ProductItems } from "@/app/types/products";

const ProductCardArrival: React.FC<ProductItems> = ({price, name,id,star,image}) => {
  return (
    <div className="w-full flex items-center justify-center gap-[16px]">
      <div className=" w-[110px] h-[110px]">
        <Image
          width={100}
          height={100}
          src={image}
          alt="newProduct"
          priority
        />
      </div>
      <div className="flex flex-col gap-[8px] justify-center items-start">
        <div className="">
          <span className="w-full flex items-center justify-center">
            {Array(star)
              .fill(null)
              .map((_, index) => (
                <Image
                  key={index} // Add key for each item
                  width={10}
                  height={10}
                  src={"/icons/star-fill.svg"}
                  alt="star" // Corrected alt text from "start" to "star"
                  priority
                />
              ))}
          </span>
          <p></p>
        </div>
        <span className=" ">
          {" "}
          <p className="text-bodyDefault">{name}</p>
        </span>
        <span className="">
          <b>{price}</b>
        </span>
      </div>
    </div>
  );
};

export default ProductCardArrival;
