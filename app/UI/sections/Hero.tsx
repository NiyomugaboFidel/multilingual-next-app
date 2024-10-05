"use client";
import Image from "next/image";
import Button from "../atoms/Button";
import { IoMdArrowForward } from "react-icons/io";

const Hero: React.FC = () => {
  return (
    <div className=" flex w-full pt-[24px]">
      <div className=" hidden lg:block lg:w-1/3"></div>
      <div className=" relative dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l from-gradientStart to-gradientEnd  dark:bg-[#1B273A] bg-[#ACCBEE] w-full h-full  lg:w-2/3 lg:h-[400px] 2xl:h-[522px] flex flex-col items-center justify-center rounded-[12px]">
        <div className="flex lg:flex-row flex-col items-center justify-center w-full h-full">
          <div className="lg:w-[351px] h-full flex flex-col gap-[40px] items-center lg:items-start pt-[40px] lg:pt-0 lg:pl-[40px] justify-center ">
            <p className="text-center lg:text-start font-[400] text-[16px] leading-[24px] py-[]">
              Feel the real quality sound{" "}
            </p>
            <h2 className=" text-center lg:text-start leading-[41px] text-[34px] font-[600] md:leading-[68px] md:text-[54px] md:font-[700]">
              Headphones ProMax
            </h2>
            <span>
              <Button
                className=""
                label="Shop now"
                icon={true}
                iconTag={
                  <IoMdArrowForward className=" -rotate-45 h-[18px] flex items-center justify-center" />
                }
                type="button"
                onClick={() => {
                  console.log("Button clicked");
                }}
              />
            </span>
          </div>
          <div className="w-full  h-full">
            <Image
              width={1034}
              height={1032}
              src={"/images/hero.png"}
              alt="hero"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className=" relative w-full flex items-center justify-center ">
          <div className="absolute h-1 bottom-[32px]  w-[88%] bg-gray-50/35 rounded-full ">
            <span className=" absolute z-10 bg-white rounded-full h-full w-1/4"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
