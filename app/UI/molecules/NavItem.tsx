'use client';

import { useCallback, useState } from "react";
import Link from "next/link";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import AdCard2 from "@/app/components/Advertisement/AdCard2";
import { useBrandListByElectronics, useCategoryListByElectronics } from "@/app/hooks/useFetchCategory";
import { useTranslations } from 'next-intl';
import { MdComputer } from 'react-icons/md';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { FaTv } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { IoIosCamera } from "react-icons/io";
import { FiPrinter } from "react-icons/fi";
import { FaHeadphones } from "react-icons/fa6";
import { BsWatch } from "react-icons/bs";
import { usePathname } from "next/navigation";


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

interface CategoryProps {
  categoryIsOpen: boolean;
}

interface Brand {
  name: string;
  brands: string[];
}

interface Category {
  id: string;
  name: string;
  label: string;
  icon: React.ReactNode;
}


// Skeleton Loading Components
const CategorySkeleton = () => {
  return (
    <div className="animate-pulse">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="px-[12px] py-[8px] mb-5 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      ))}
    </div>
  );
};

const BrandsSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-5 w-full animate-pulse">
      {[...Array(2)].map((_, index) => (
        <div key={index} className="brand-category">
          <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Types remain the same as in your original code
interface CategoryProps {
  categoryIsOpen: boolean;
}

// ... (rest of the interfaces remain the same)

const NavItem: React.FC<CategoryProps> = ({ categoryIsOpen }) => {
  const [subCategoryIsOpen, setSubCategoryIsOpen] = useState<string | null>(null);
  const [subCategoryId, setSubCategoryId] = useState<string>('');
  const currentRoute = usePathname();
  const { 
    data: electronicsCategory,
    error: categoryError,
    isLoading: isCategoryLoading 
  } = useCategoryListByElectronics();

  const {
    data: brands,
    isFetched: isBrandFetched,
    error: brandError,
    isLoading: isBrandLoading
  } = useBrandListByElectronics(subCategoryId ? subCategoryId : '');

  const handleSubCategoryClick = useCallback((subcategoryName: string, id: string) => {
    if (!id) {
      console.error('Invalid subcategory ID');
      return;
    }

    setSubCategoryId(id);
    setSubCategoryIsOpen(prevName => prevName === subcategoryName ? null : subcategoryName);
  }, []);

  if (categoryError) {
    return (
      <div className="min-h-[55vh] flex items-center justify-center text-red-500 dark:text-red-400">
        <p>Failed to load categories. Please try again later.</p>
      </div>
    );
  }

  const categories = CategoryList(electronicsCategory);

  return (
    <div className="z-50 min-h-[55vh] h-full relative">
      <div
        className={`${
          categoryIsOpen ? "flex" : "hidden"
        } w-full min-h-[55vh] shadow-xl dark:bg-primaryColor-dark h-full bg-[#ffffff] dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px]`}
      >
        <ul className="w-full px-2 pt-5 gap-5 flex flex-col">
          {isCategoryLoading ? (
            <CategorySkeleton />
          ) : (
            <>
              {categories
                .slice(0, 8)
                .map((item:any) => (
                  <li
                    key={item.id}
                    onClick={() => handleSubCategoryClick(item.name, item.id)}
                    className="px-[12px] py-[8px] rounded-[8px] hover:bg-gray-100 dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700 gap-[12px] cursor-pointer transition-colors duration-200"
                  >
                   <Link href={`${currentRoute+'?category_id='+item.id}`} className="w-full flex justify-between items-center">
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
                   </Link>
                  </li>
                ))}
              <Link href="/categories">
                <li className="px-[12px] py-[8px] rounded-[8px] hover:bg-gray-100 dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700 gap-[12px] transition-colors duration-200">
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-semibold flex items-start justify-start text-start dark:text-gray-200">
                      View All Categories
                    </span>
                  </div>
                  <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>

      {subCategoryIsOpen && (
        <div className="z-40 w-full transition-all h-full min-h-full duration-300 ease-in-out absolute top-0 left-[100%] xl:min-w-[702px] pl-5 pt-5">
          <div className="z-20 h-full min-h-full dark:bg-primaryColor-dark bg-[#ffffff] shadow ring-1 dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px] p-[12px]">
            <div className="w-full h-full lg:grid grid-cols-2 hidden gap-2 text-Gary-900 dark:text-textColor-light">
              <div className="grid grid-cols-2 gap-5 w-full">
                {isBrandLoading ? (
                  <div className="col-span-2 gap-5 grid">
                       <BrandsSkeleton />
                       <BrandsSkeleton />
                  </div>

                ) : brandError ? (
                  <div className="col-span-2 text-red-500 dark:text-red-400 flex items-center justify-center">
                    Failed to load brands. Please try again.
                  </div>
                ) : (
                  brands && 
                  isBrandFetched && 
                  Array.isArray(brands) && 
                  brands.map((item: Brand) => (
                    <div key={item.name} className="brand-category">
                      <p className="text-bodyDefault font-semibold text-start py-3">
                        {item.name}
                      </p>
                      <ul className="flex items-start justify-center text-start flex-col">
                        {item.brands && item.brands.map((brand: string, i: number) => (
                          <li 
                            key={`${brand}-${i}`} 
                            className="text-bodySmall py-1 hover:underline hover:text-textColor-dark transition-colors duration-200"
                          >
                            {brand}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
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
      name: "headphones&music",
      icon: <FaHeadphones className="text-Gary-700 dark:text-Gary-300" />,
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

