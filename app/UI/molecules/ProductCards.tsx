import Image from "next/image";
import Icon from "../atoms/Icon";
import svg from "@/app/data/svgIcon";

const ProductCard1 = () => {
  return (
    <div className="w-full">
      <div className="lg:w-[306px] lg:h-[288px]">
        <Image
          src={"/images/product1.png"}
          width={258}
          height={240}
          alt="product"
        />
      </div>
      <div className="w-full flex justify-between items-end gap-[20px]">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* line 1 */}

          <div className="w-full">
            <div className="w-full flex  items-center justify-start gap-[8px]">
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
              <p className=" text-[12px] leading-[18px] text-gray-500">45</p>
            </div>
            <span className="w-full">
              <p className="w-full text-bodyDefault text-Gary-900 font-[500]">
                VRB01 Virtual Reality Glasses
              </p>
            </span>
          </div>

          <span className="w-full text-start flex gap-2">
            <b>$300</b> <del className="">$350</del>
          </span>
        </div>
        <div className="w-full">
          <Icon iconTag={svg.cartblack} className=" bg-Gary-100 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard1;
