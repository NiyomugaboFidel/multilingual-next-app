'use client';

import AdCard2 from "@/app/components/Advertisement/AdCard2";
import { useCategoryListByElectronics } from "@/app/hooks/useFetchCategory";
import Link from "next/link";
import { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";


interface SubCategoryItem {
  id: number;
  name: string;
}

interface SubCategoryData {
  [key: string]: SubCategoryItem[];
}


const mockSubCategoryData: SubCategoryData = {
  Electronics: [
    { id: 1, name: "Smartphone" },
    { id: 2, name: "Laptop" },
    { id: 3, name: "Smartwatch" },
  ],
  Clothing: [
    { id: 1, name: "T-Shirt" },
    { id: 2, name: "Jeans" },
    { id: 3, name: "Jacket" },
  ],
  Furniture: [
    { id: 1, name: "Sofa" },
    { id: 2, name: "Chair" },
    { id: 3, name: "Table" },
  ],
};

interface CategoryProps {
  categoryIsOpen: boolean;
}

interface NestedSubcategory {
  id: string;
  subcategory_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Subcategory {
  id: string;
  category_id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  nestedsubcategories: NestedSubcategory[];
}

interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  subcategories: Subcategory[];
}

interface CategoryItem {
  id?: string;
  label: string;
  name: string;
  icon: JSX.Element;
  subcategory_id?: string;
  Product: any[];
  nestedsubcategories?: NestedSubcategory[];
}

const CategoryList = (backendData?: Category) => {
  const t = useTranslations('categories');

  const baseCategories: CategoryItem[] = [
    {
      label: t('computer'),
      name: "Computers",
      icon: <MdComputer className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('smartphones'),
      name: "smartphones & tablets",
      icon: <HiOutlineDevicePhoneMobile className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('tv'),
      name: "tv,video & audio",
      icon: <FaTv className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('headphones'),
      name: "headphones & music",
      icon: <MdOutlineSpeaker className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('cameras'),
      name: "camera",
      icon: <IoIosCamera className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('printers'),
      name: "printers",
      icon: <FiPrinter className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('wearables'),
      name: "wearable electronics",
      icon: <BsWatch className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
  ];

  if (!backendData) {
    return baseCategories;
  }

  // Merge backend data with base categories
  const mergedCategories = baseCategories.map(baseCategory => {
    const matchingSubcategory = backendData.subcategories.find(
      sub => sub.name.toLowerCase() === baseCategory.name.toLowerCase()
    );

    if (matchingSubcategory) {
      return {
        ...baseCategory,
        id: matchingSubcategory.id,
        subcategory_id: matchingSubcategory.category_id,
        nestedsubcategories: matchingSubcategory.nestedsubcategories,
      };
    }

    return baseCategory;
  });

  return mergedCategories;
};
const NavItem: React.FC<CategoryProps> = ({ categoryIsOpen }) => {
  const [subCategoryIsOpen, setSubCategoryIsOpen] = useState<string | null>(null);
  const [subCategoryData, setSubCategoryData] = useState<SubCategoryItem[] | null>(null); 
  const {data:electronicsCategory} = useCategoryListByElectronics();

  console.log("category by electronic:", CategoryList(electronicsCategory)) ;

  const handleSubCategoryClick = (subcategoryName: string) => {
    if (subCategoryIsOpen === subcategoryName) {
      setSubCategoryIsOpen(null); 
      setSubCategoryData(null);  
    } else {
      setSubCategoryIsOpen(subcategoryName); 
      setSubCategoryData(mockSubCategoryData[subcategoryName]); 
    }
  };

  return (
    <div className="z-50 min-h-[55vh] h-full">
      <div
        className={`${categoryIsOpen ? "flex" : "hidden"} w-full min-h-[55vh] shadow-xl dark:bg-primaryColor-dark h-full bg-[#ffffff] dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px]`}
      >
        <ul className="w-full px-2 pt-5 gap-5 flex flex-col">
          {CategoryList()
            .slice(0, 8)
            .map((item, i) => (
              <li
                key={i}
                onClick={() => handleSubCategoryClick(item.name)} 
                className="px-[12px] py-[8px] rounded-[8px] hover:bg-gray-100 dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700 gap-[12px]"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{item.icon}</span>
                  <span className="flex items-start justify-start text-start dark:text-gray-200">
                    {item.label}
                  </span>
                </div>
                <span>
                  {subCategoryIsOpen === item.name ? (
                    <FaAngleLeft className="text-Gary-700 dark:text-Gary-300" />
                  ) : (
                    <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
                  )}
                </span>
              </li>
            ))}
          <Link href={`/categories`}>
            <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-gray-100 dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700 gap-[12px]">
              <div className="flex items-center justify-center gap-2">
                <span></span>
                <span className="font-semibold flex items-start justify-start text-start dark:text-gray-200">
                  View All Categories
                </span>
              </div>
              <span>
                <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
              </span>
            </li>
          </Link>
        </ul>
      </div>

    
      {subCategoryIsOpen && (
        <div
          className={` z-40 w-full transition-all h-full min-h-full    duration-300 ease-in-out absolute top-0 left-[100%] xl:min-w-[702px] pl-5 pt-5`}
        >
          <div className=" z-20 h-full min-h-full dark:bg-primaryColor-dark bg-[#ffffff] shadow ring-1 dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px] p-[12px]">
            <div className="w-full h-full lg:grid grid-cols-3 hidden gap-2 text-Gary-900 dark:text-textColor-light">
                <div className="flex flex-col  gap-5 items-center">
                  <div>
                  <p className="text-bodyDefault font-semibold text-start py-3 " >Smartphones</p>
                    <ul className="flex items-start justify-center text-start flex-col">
                      <li>Apple</li>
                      <li>Sumsang</li>
                      <li>Google pixel</li>
                      <li></li>
                      <li>Apple</li>
                    </ul>
                  </div>
                  <div>
                  <p className="text-bodyDefault font-semibold text-start py-3" >Tablets</p>
                    <ul className="flex items-start justify-center text-start flex-col">
                      <li>Apple Pad</li>
                      <li>Sumsang Pad</li>
                      <li>Amazon</li>
                      <li>Netpad</li>
                      <li>Chrome</li>
                    </ul>
                  </div>
                </div>
                <div className="flex flex-col  gap-5 items-center">
                  <div>
                  <p className="text-bodyDefault font-semibold text-start py-3 " >Smartphones</p>
                    <ul className="flex items-start justify-center text-start flex-col">
                      <li>Apple</li>
                      <li>Sumsang</li>
                      <li>Google pixel</li>
                      <li></li>
                      <li>Apple</li>
                    </ul>
                  </div>
                  <div>
                  <p className="text-bodyDefault font-semibold text-start py-3" >Tablets</p>
                    <ul className="flex items-start justify-center text-start flex-col">
                      <li>Apple Pad</li>
                      <li>Sumsang Pad</li>
                      <li>Amazon</li>
                      <li>Netpad</li>
                      <li>Chrome</li>
                    </ul>
                  </div>
              
                </div>
                <AdCard2 />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default NavItem;
import { useTranslations } from 'next-intl';
import { MdComputer } from 'react-icons/md';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { FaTv } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { IoIosCamera } from "react-icons/io";
import { FiPrinter } from "react-icons/fi";
import { FaHeadphones } from "react-icons/fa6";
import { BsWatch } from "react-icons/bs";

