import ShopCategories from '@/app/UI/organisms/Category'
import ProductsList from '@/app/UI/organisms/ProductList'
import NewsletterSectionTempalete from '@/app/UI/templat/NewsletterSectionTempalete'
import React from 'react'

const page = () => {
  return (
   <>
    <main className="flex flex-col  dark:bg-[#181D25] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]">
     <ShopCategories />
     <ProductsList />
    </main>
      <div className="w-full h-full ">
      <NewsletterSectionTempalete />
      </div>
   </>
  )
}

export default page