import Image from "next/image";

const ProductCardArrival: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center gap-[16px]">
      <div className=" w-[110px] h-[110px]">
        <Image
          width={100}
          height={100}
          src={"/images/product1.png"}
          alt="newProduct"
          priority
        />
      </div>
      <div className="flex flex-col gap-[8px] justify-center items-start">
        <div className="">
          <span className="w-full flex items-center justify-center">
            {Array(5)
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
          <p className="text-bodyDefault">Smart Watch Series 7, White</p>
        </span>
        <span className="">
          <b>$449.00 </b>
        </span>
      </div>
    </div>
  );
};

export default ProductCardArrival;
