import Image from "next/image";
import Icon from "../atoms/Icon";
import svg from "@/app/data/svgIcon";
import { ProductItems } from "@/app/types/products";
import { CiMenuKebab } from "react-icons/ci";


interface ProductCardProps extends ProductItems {
  isLoading?: boolean;
  index: number;
  bonus: number;
}

const ProductCard1: React.FC<ProductCardProps> = ({
  price,
  bonus,
  name,
  id,
  star,
  image,
  title,
  isLoading,
  index,
}) => {
  const originalPrice = Number(price);
  const discountPercentage = bonus / 10;
  const discountAmount = (discountPercentage / 100) * originalPrice;
  const discountedPrice = originalPrice - discountAmount;

  return (
    <div className="lg:w-[306px] lg:h-[448px] w-full flex flex-col items-center justify-center gap-[10px] lg:p-[20px] relative">
      <span className="lg:hidden absolute dark:border-Gary-700 border-[#E0E5EB] top-0 right-0 w-[32px] h-[32px] text-center border shadow rounded flex items-center justify-center">
        <CiMenuKebab />
      </span>

      {index < 2 ? (
        <span className={`bg-[#2F6ED5] text-textColor-light top-0 left-0 rounded-sm absolute text-center py-[2px] shadow px-[6px] text-[12px] leading-[16px] font-[500]`}>
          New
        </span>
      ) : bonus / 10 < 10 ? null : (
        <span className={`bg-[#F03D3D] top-0 left-0 text-textColor-light rounded-sm absolute text-center py-[2px] shadow px-[6px] text-[12px] leading-[16px] font-[500]`}>
          {`-${discountPercentage}%`}
        </span>
      )}

      {/* Product Image */}
      <div className="lg:w-[306px] lg:h-[288px] p-[20px]">
        <Image src={image} width={258} height={240} alt={name} className="hover:scale-110 object-contain object-center" />
      </div>

      {/* Product Content */}
      <div className="w-full flex flex-col gap-[8px]">
        <div className="flex flex-col gap-[2px]">
          <div className="w-full flex items-center justify-start gap-[8px]">
            {/* Stats */}
            <span className="flex items-center justify-center gap-[2px]">
              {Array(5).fill(null).map((_, index) => (
                <Image
                  key={index}
                  width={10}
                  height={10}
                  src={"/icons/star-fill.svg"}
                  alt="star"
                  priority
                />
              ))}
            </span>
            <p className="text-[12px] dark:text-Gary-100 text-textColor-dark">(45)</p>
          </div>
          <p className="line-clamp-2 w-full text-bodyDefault text-Gary-900 font-[500] dark:text-textColor">
            {name}, {title}
          </p>
        </div>

        <div className="w-[90%] flex justify-between items-center">
          <span className="w-full text-start flex lg:flex-row flex-col lg:gap-2">
            <b className="text-[20px] leading-[28px] dark:text-[#ffffff] text-textColor-dark">
              ${bonus / 10 < 10 ? originalPrice : discountedPrice}
            </b>
            {bonus / 10 > 10 ? <del className="">{originalPrice}</del> : null}
          </span>
          <span>
            <Icon
              iconTag={svg.cartblack}
              className="bg-Gary-100 dark:bg-Gary-700 hover:bg-gray-200 rounded-lg"
            />
          </span>
        </div>

      </div>
      <div>
       
      </div>
    </div>
  );
};

export default ProductCard1;
