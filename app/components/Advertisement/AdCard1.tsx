'use client'
import Button from "@/app/UI/atoms/Button"
import Image from "next/image"
import { IoMdArrowForward } from "react-icons/io";

const AdCard1 = () => {
  return (
   <div className="w-full h-full lg:h-[300px]">
     <div className="pt-5 flex flex-col-reverse lg:flex-row items-center justify-center h-full  dark:bg-gradient-to-l dark:from-custom-dark-1 dark:to-custom-dark-2 bg-gradient-to-l to-gradientStart from-gradientEnd  dark:bg-[#1B273A] bg-[#ACCBEE]  rounded-[12px]">
        <div className="lg:w-[716px] h-full  flex items-center justify-center   ">
            <Image src="/images/add-phone.png" width={416} height={320} className=" overflow-hidden h-full object-cover object-bottom " alt="product" />
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center ">
        <div className="flex flex-col gap-3">
             <div>
             <p className=" text-[28px] font-semibold">iPhone 14</p>
            <p className="text-bodySmall">Apple iPhone 14 128GB Blue</p>
           
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
    </div>
   </div>
  )
}

export default AdCard1