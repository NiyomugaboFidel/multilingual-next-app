"use client"
import React from 'react'
import { useTranslations } from 'use-intl'
import CategoryElNavFilter from './_category-El-Nav-Filter'
import CategoryElFilter from './_category-El-Filter'

const ElectronicSearch = () => {
  const t = useTranslations();;
  return (
    <div className='flex flex-col pt-5  dark:bg-[rgb(24,29,37)] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]'>
        {/* Breadcrumb */}
        <CategoryElNavFilter />
        <CategoryElFilter />
    </div>
  )
}

export default ElectronicSearch