import Image from "next/image";
import Icon from "../atoms/Icon";
import svg from "@/app/data/svgIcon";
import { ProductItems } from "@/app/types/products";
import { CiMenuKebab } from "react-icons/ci";
interface ProductCardProps extends ProductItems {
  isLoading: boolean;
  index: number;
  bonus: number;
}

const ProductSliderCard: React.FC<ProductCardProps> = ({
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
  const originalPrice = Number(price); // example price
  const discountPercentage = bonus / 10; // 10% discount

  const discountAmount = (discountPercentage / 100) * originalPrice;
  const discountedPrice = originalPrice - discountAmount;

  return (
    <div className=" w-[270px] md:w-[306px] lg:h-[448px]  flex flex-col items-start gap-[10px] lg:p-[20px] relative ">
          <span className="  lg:hidden absolute dark:border-Gary-700 top-[8px] border-[#E0E5EB] right-[8px] w-[32px] h-[32px] text-center border shadow rounded flex items-center justify-center "><CiMenuKebab /></span>
      {/* products image */}
      <div className=" lg:w-[306px] h-[288px] p-[20px]">
        <Image src={image} width={258} height={240} alt={name} className=" hover:scale-150 object-contain object-center  " />
      </div>

      {/* product content */}
      <div className="w-full flex flex-col gap-[8px]">
        <div className=" flex flex-col gap-[2px]">
          <div className="w-full flex  items-center justify-start gap-[8px]">
            {/* stats */}
            <span className="flex items-center justify-center gap-[2px]">
              {Array(5)
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
            <p className="text-[12px]  dark:text-Gary-100 text-textColor-dark">
            (45)
            </p>
          </div>
          <p className=" line-clamp-2 w-full text-bodyDefault text-Gary-900 font-[500] dark:text-textColor ">
            {name} , {title}
          </p>
        </div>

        <div className="w-[90%] flex justify-between items-center">
          <span className="w-full text-start flex lg:flex-row flex-col lg:gap-2">
            <b className="text-[20px] leading-[28px] dark:text-[#ffffff] text-textColor-dark">
              ${bonus / 10 < 10 ? originalPrice : discountedPrice}
            </b>
            {bonus / 10 > 10 ? <del className="">${originalPrice}</del> : null}
          </span>
          <span>
            <Icon
              iconTag={svg.cartblack}
              className=" bg-Gary-100 dark:bg-Gary-700 hover:bg-gray-200 rounded-lg "
            />
          </span>
        </div>

      </div>
      <div className="w-full h-1 bg-Gary-100 rounded-full">
        <span className="bg-Red-100 absolute w-[50%] h-1 rounded-full"></span>
        <div className="text-bodySmall font-[400] py-1 text-gray-500">Available: <span className="text-Gary-900 text-bodySmall font-[500]">45</span> </div>
      </div>
    </div>
  );
};

export default ProductSliderCard;
