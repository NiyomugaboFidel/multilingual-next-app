"use client"
import Advert1 from '@/app/components/Advertisement/Advert1'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'use-intl'
import CategoryElNavFilter from './_category-El-Nav-Filter'
import CategoryElFilter from './_category-El-Filter'
import {useCategoryListByElectronics } from '@/app/hooks/useFetchCategory'

const page = () => {
  const t = useTranslations();
    // const {data:electronicsCategory} = useCategoryListByElectronics();
    // console.log("category by electronic:", electronicsCategory);
  return (
    <div className='flex flex-col pt-5  dark:bg-[rgb(24,29,37)] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]'>
              {/* Breadcrumb */}
        <CategoryElNavFilter />
        <Advert1 />
        <CategoryElFilter />
    </div>
  )
}

export default page