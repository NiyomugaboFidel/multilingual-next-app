'use client'
import Image from 'next/image'
import React from 'react'
import Button from '../atoms/Button'
import { IoMdArrowForward } from 'react-icons/io'

const NewArrivalBanner = () => {
  const bannerCardData = {
    ProductName:'MacBook',
    ProductPrice:'1,199',
    ProductImage:'/images/product1.png',
    BgImage:'banner.png',
    ProductDesc:'Be Pro Anywhere'
  }
  console.log(bannerCardData.BgImage)
  return (
    <div 
    style={{
      backgroundImage: `url('/images/${bannerCardData.BgImage}')`,
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      // height: '100vh', 
      width: '100%', 
    }}
     className={` bg-[#243042] shadow  rounded-[16px] w-full p-[20px]   2xl:w-[416px] h-[535px]   bg-no-repeat bg-cover bg-center`}>
        <div className=' relative flex items-center justify-center '>
          <Image priority width={294} height={313} className='top-[25px] w-[294px] h-[313px] absolute' src={bannerCardData.ProductImage}  alt='Marbook'/>
        </div>
      
        <div className='h-full w-full flex flex-col justify-end  pb-[40px] items-center gap-[20px]'>
        <h3 className='text-headingH2 text-white font-bold text-center'>{bannerCardData.ProductName}</h3>
        <p className='text-bodyDefault text-textColor'>{bannerCardData.ProductDesc}</p>
        <Button
                  className=""
                  label={`From $${bannerCardData.ProductPrice}`}
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
  )
}

export default NewArrivalBanner