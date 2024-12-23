"use client";
import Image from "next/image";
import Button from "../atoms/Button";
import { IoMdArrowForward } from "react-icons/io";
import Benefits from "../organisms/Benefits";
import heroData from "../../data/heroData";
import NavItem from "../molecules/NavItem";

const Hero: React.FC = (z) => {
  const { benefits } = heroData();

  return (
    <section className="w-full h-full flex flex-col gap-[30px]">
      <div className=" flex h-full min-h-[55vh]  gap-[20px]  w-full">
        <div className=" hidden lg:block min-w-[306px] ">
          <NavItem  categoryisOpen={true} />
        </div>

        <div className="  min-h-[55vh] mt-[20px] relative dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l from-gradientStart to-gradientEnd  dark:bg-[#1B273A] bg-[#ACCBEE] w-full h-full    flex flex-col items-end justify-end py-5 rounded-[12px]">
          <div className="flex lg:flex-row flex-col items-center justify-between w-full h-full py-5 ">
            <div className=" h-full flex flex-col gap-[40px] items-center lg:items-start pt-[40px] lg:pt-0 lg:pl-[40px] justify-center ">
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
            <div className="w-full  h-full flex items-end justify-end">
              <Image
                style={{
                  width: "auto",
                  height: "auto",
                }}
                width={6034}
                height={6032}
                src={"/images/hero.png"}
                alt="hero"
                className="h-full w-full object-cover object-center"
                priority
              />
            </div>
          </div>
          <div className=" h-full relative w-full flex items-center justify-center ">
            <div className="absolute h-1   w-[95%] bg-gray-50/35 rounded-full ">
              <span className=" absolute z-10 bg-white rounded-full h-full w-1/4"></span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full ">
        <Benefits benefits={benefits} />
      </div>
    </section>
  );
};

export default Hero;
