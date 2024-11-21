import AdCard1 from '@/app/components/Advertisement/AdCard1'
import Advert1 from '@/app/components/Advertisement/Advert1'
import ShopCategories from '@/app/UI/organisms/Category'
import ProductsList from '@/app/UI/organisms/ProductList'
import NewsletterSectionTempalete from '@/app/UI/templat/NewsletterSectionTempalete'
import React from 'react'

const page = () => {
  return (
   <>
    <main className="flex flex-col   dark:bg-[#181D25] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
     <ShopCategories />
      <Advert1 />
     <ProductsList />
    </main>
   </>
  )
}

export default page