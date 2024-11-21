"use client";

import Image from "next/image";
import Link from "next/link";

import CompanyData from "@/app/data/ComapanyData";
import ECategory from "@/app/data/categories/ECategory";
import { useTranslations } from "next-intl";

export default function ShopCategories() {
  const categories = ECategory();
  const t = useTranslations();
  return (
    <div className="">
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

      {/* Brands */}
      <div className=" py-[24px] grid items-center grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[20px] transition-all ease-in-out duration-300">
        {CompanyData.map((company, index) => (
          <Image
          key={index}
            src={company.logo}
            alt={company.label}
            width={200}
            height={100}
            className="w-auto h-auto"
          />
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category) => (
          <div
            key={category.title}
            className="bg-white dark:bg-primaryColor-dark  rounded-[8px] overflow-hidden   transition-shadow"
          >
            {/* Category Image */}
            <Link href={`/categories/el?=${category.href.toLowerCase()}`}>
              <div className="relative min-h-48  bg-gray-50 dark:bg-Gary-800 rounded-[6px] p-2">
                <Image
                  src={category.image}
                  alt={category.title}
                  width={300}
                  height={300}
                  className=" w-full h-full object-cover object-center transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-pretty text-bodyDefault font-[600] p-2">
                {category.title}
              </h3>
            </Link>

            {/* Category Items List */}
            <div className="p-1 px-2 ">
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={`/categories/el?=${item.link}`}
                      className="text-Gary-700 text-bodySmall dark:text-Gary-300 hover:text-gray-900 transition-colors block  rounded-[6px] hover:underline "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
