"use client";
import Button from "@/app/UI/atoms/Button";
import Image from "next/image";
import { IoMdArrowForward } from "react-icons/io";

const AdCard2 = () => {
  return (
    <div className="h-full lg:h-[300px]">
      <div className="  flex flex-col  items-center justify-center h-full  bg-gradient-to-r from-pink-200 to-pink-100 dark:bg-gradient-to-r dark:from-dark-purple-1 dark:to-dark-purple-2   rounded-[12px]">
        <div className="w-full pt-[50px] gap-2  flex flex-col items-center justify-start">
        <div className="flex flex-col-reverse gap-3 items-center justify-center">
            <div className="flex flex-col-reverse items-center justify-center">
            <p className=" text-[28px] font-semibold">iPad Pro M1</p>
            <p className="text-bodySmall">Deal of the week</p>
           
            </div>
            <div>
            <Button
                  className=""
                  label="From $899"
                  icon={true}
                  iconTag={
                    <IoMdArrowForward className=" -rotate-45 h-[18px] flex items-center justify-center" />
                  }
                  type="button"
                  onClick={() => {
                    console.log("Button clicked");
                  }}
                />
            </div>
            </div>
        </div>
        <div className="w-full h-full  flex items-center justify-center   ">
          <Image
            src="/images/add-pc.png"
            width={316}
            height={220}
            className=" overflow-hidden h-full object-bottom object-contain "
            alt="product"
          />
        </div>
      </div>
    </div>
  );
};

export default AdCard2;
