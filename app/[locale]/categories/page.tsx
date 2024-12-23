import Advert1 from '@/app/components/Advertisement/Advert1'
import ShopCategories from '@/app/UI/organisms/Category'
import ProductsList from '@/app/UI/organisms/ProductList'
import React from 'react'

const page = () => {
  return (
   <>
    <main className="flex flex-col py-4   dark:bg-[#181D25] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
     <ShopCategories />
      <Advert1 />
     <ProductsList />
    </main>
   </>
  )
}

export default page