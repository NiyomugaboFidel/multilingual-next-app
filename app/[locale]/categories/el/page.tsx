"use client"
import Advert1 from '@/app/components/Advertisement/Advert1'
import Link from 'next/link'
import React from 'react'
import { useTranslations } from 'use-intl'

const page = () => {
  const t = useTranslations();
  return (
    <div className='flex flex-col pt-5  dark:bg-[rgb(24,29,37)] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]'>
              {/* Breadcrumb */}
      <nav className="mb-4">
        <ol className="flex items-center space-x-2 text-bodySmall text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:text-gray-700 hover:underline text-bodySmall text-textColor-dark dark:text-textColor-light"
            >
              {t("Home")}
            </Link>
          </li>
          <li>{"/"}</li>
          <li className="text-gray-700 text-bodySmall dark:text-Gary-300">
          {t("Categories")}
          </li>
        </ol>
      </nav>

      {/* Title */}
      <h1 className="text-headingH3 text-textColor-dark font-[600] dark:text-textColor-light">
        {t("ShopCategory")}
      </h1>
        <Advert1 />
    </div>
  )
}

export default page