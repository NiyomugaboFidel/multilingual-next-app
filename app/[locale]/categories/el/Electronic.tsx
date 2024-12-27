"use client"

import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Percent } from "lucide-react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import { useTranslations } from 'use-intl'
import Link from 'next/link'
import { ChangeEvent, InputHTMLAttributes,} from "react";
import { Search } from "lucide-react";
import { useProductsListBYElectronics } from "@/app/hooks/useFetchProducts";
import ProductCard1Skeleton from "@/app/skeleton/home/ProductCard1Skeleton";
import ProductCard from "@/app/UI/molecules/ProductCards";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdClose } from "react-icons/md";
import SiderbarFilter, { brands, categories, colors, FilterQuery, INITIAL_BRANDS_SHOW, INITIAL_CATEGORIES_SHOW, ssdSizes } from "./_category-El-Sidebar";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useSearchBYElectronics } from '@/app/hooks/useSearch';



const ElectronicSearch = () => {
  const t = useTranslations();;
  const { data:product, error, isFetched, isLoading } = useProductsListBYElectronics();



  const router = useRouter();
  const searchParams = useSearchParams();
  const search_query = searchParams.get('search_query') ?? '';
  
  const { data: searchResults, isLoading:isLoadingResults } = useSearchBYElectronics(search_query);
  const products = searchResults?.data?.results || [];
  
  // Debounce search to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(search_query);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearchTerm !== search_query) {
        if (debouncedSearchTerm.trim()) {
          router.push(`/search?category=el&search_query=${encodeURIComponent(debouncedSearchTerm)}`);
        } else {
          router.push('/search');
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedSearchTerm, router, search_query]);

  const handleSearch = (e:ChangeEvent<HTMLInputElement>) => {
    setDebouncedSearchTerm(e.target.value);
  };
  
    // State management
    const [filterQuery, setFilterQuery] = useState<FilterQuery>({});
    const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([340, 1250]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedSSDSize, setSelectedSSDSize] = useState<string[]>([]);
    const [selectedColor, setSelectedColor] = useState<string>("green");
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
    // Filter handlers
    const handleStatusChange = (status: string) => {
      const newStatus = selectedStatus.includes(status)
        ? selectedStatus.filter(s => s !== status)
        : [...selectedStatus, status];
      setSelectedStatus(newStatus);
      updateFilterQuery({ tags: newStatus });
    };
  
    const handleCategoryChange = (categoryId: string) => {
      const newCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];
      setSelectedCategories(newCategories);
      updateFilterQuery({ categoryId: newCategories });
    };
  
    const handleBrandChange = (brand: string) => {
      const newBrands = selectedBrands.includes(brand)
        ? selectedBrands.filter(b => b !== brand)
        : [...selectedBrands, brand];
      setSelectedBrands(newBrands);
      updateFilterQuery({ brand: newBrands });
    };
  
    const handleSSDChange = (size: string) => {
      const newSizes = selectedSSDSize.includes(size)
        ? selectedSSDSize.filter(s => s !== size)
        : [...selectedSSDSize, size];
      setSelectedSSDSize(newSizes);
      updateFilterQuery({
        specifications: {
          ...filterQuery.specifications,
          ssdSize: newSizes
        }
      });
    };
  
    const handleColorChange = (color: string) => {
      setSelectedColor(color);
      updateFilterQuery({
        specifications: {
          ...filterQuery.specifications,
          color: [color]
        }
      });
    };
  
    const updateFilterQuery = (newFilters: Partial<FilterQuery>) => {
      setFilterQuery(prev => ({
        ...prev,
        ...newFilters
      }));
    };
  
    // Effect to handle filter changes
    useEffect(() => {
      console.log('Filter query updated:', filterQuery);
    }, [filterQuery]);
  

  return (
    <div className='flex flex-col pt-5  dark:bg-[rgb(24,29,37)] bg-white min-h-screen  px-[20px]  md:px-[50px] xl:px-[100px]'>
        {/* Breadcrumb */}
        <div>
        <div>      <nav className="mb-4">
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
   </h1></div>
        </div>
        <div>
        <div className="py-[30px] flex flex-col items-center justify-center w-full h-full gap-5">
      {/* search */}
      <div className="w-full h-full ">
        <div className="px-3 w-full flex items-center justify-center gap-2 border  border-gray-200 dark:border-Gary-700 rounded-full">
          <span>
            <Search />
          </span>
          <Input
            onChange={handleSearch}
            type="text"
            placeholder="Search Products ..."
            className=" border-none outline-none w-full p-2 bg-transparent"
          />
        </div>
      </div>
      {/* sorts */}
      <div className="w-full flex flex-row  justify-between items-start lg:items-center ">
        <div className="hidden lg:flex w-full items-center justify-start gap-2 ">
         <div>
         <p className="  text-bodySmall px-2 pb-2">
            {" "}
            Found <span className="font-semibold"> 789 </span> Items
          </p>
         </div>
          <div className="h-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-2 items-center justify-center">
           {Array(5).fill(null).map((_,i)=>(
             <button className="bg-Gary-100 dark:bg-Gary-700 text-bodySmall rounded-[6px] p-1 px-3 flex gap-1 items-center justify-center" key={i}><MdClose/> Sale</button>
           ))}
           <button className=" underline text-bodySmall">Clear all</button>
          </div>
        </div>
        <div className="w-full items-center justify-end flex  px-2  gap-2">
          <span className="w-full text-bodySmall font-semibold text-start lg:text-end">
            Sort by:
          </span>
          <div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Most Popular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mostpopular">Most Popular</SelectItem>
                <SelectItem value="newarrivals">New Arrivals </SelectItem>
                <SelectItem value="discount">Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <div className="w-[290px]  hidden lg:block ">
        <div>
      <div className="flex flex-col gap-5 items-start justify-center">
        {/* Status Card */}
        <div className="flex gap-2 flex-col w-full h-full border border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Status</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <button 
                onClick={() => handleStatusChange('sale')}
                className={`hover:bg-gray-50 text-bodySmall border border-gray-200 dark:border-Gary-700 p-2 rounded-[6px] flex items-center justify-center gap-2 ${
                  selectedStatus.includes('sale') ? 'bg-gray-100' : ''
                }`}
              >
                <Percent className="text-sm w-3" /> Sale
              </button>
              <button 
                onClick={() => handleStatusChange('sameDay')}
                className={`hover:bg-gray-50 w-full text-bodySmall border border-gray-200 dark:border-Gary-700 p-2 rounded-[6px] ${
                  selectedStatus.includes('sameDay') ? 'bg-gray-100' : ''
                }`}
              >
                Same Day Delivery
              </button>
            </div>
          </div>
        </div>

        {/* Categories Card */}
        <div className="flex gap-2 flex-col w-full h-full border border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Categories</p>
          </div>
          <div className="pt-2 flex flex-col gap-3 items-center justify-center">
            {categories
              .slice(0, showAllCategories ? categories.length : INITIAL_CATEGORIES_SHOW)
              .map((category) => (
                <div
                  key={category.id}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Checkbox 
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <p className="text-bodySmall">{category.title}</p>
                  </div>
                  <p className="text-bodySmall">{category.count}</p>
                </div>
              ))}
            {categories.length > INITIAL_CATEGORIES_SHOW && (
              <button 
                onClick={() => setShowAllCategories(!showAllCategories)}
                className="w-full text-start gap-2 flex items-center justify-start font-semibold text-bodySmall"
              >
                {showAllCategories ? (
                  <>Show less <IoIosArrowDropup /></>
                ) : (
                  <>Show all <IoIosArrowDropdown /></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Price Card */}
        <div className="flex gap-2 flex-col w-full h-full border border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Price</p>
          </div>
          <div className="pt-2 flex flex-col gap-3 items-center justify-center">
            {/* Price range implementation would go here */}
          </div>
        </div>

        {/* Brands Card */}
        <div className="flex gap-2 flex-col w-full h-full border border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Brand</p>
          </div>
          <div className="pt-2 flex flex-col gap-3 items-center justify-center">
            {brands
              .slice(0, showAllBrands ? brands.length : INITIAL_BRANDS_SHOW)
              .map((brand) => (
                <div
                  key={brand.value}
                  className="w-full flex items-center justify-between"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Checkbox 
                      checked={selectedBrands.includes(brand.value)}
                      onCheckedChange={() => handleBrandChange(brand.value)}
                    />
                    <p className="text-bodySmall">{brand.label}</p>
                  </div>
                  <p className="text-bodySmall">{brand.count}</p>
                </div>
              ))}
            {brands.length > INITIAL_BRANDS_SHOW && (
              <button 
                onClick={() => setShowAllBrands(!showAllBrands)}
                className="w-full text-start gap-2 flex items-center justify-start font-semibold text-bodySmall"
              >
                {showAllBrands ? (
                  <>Show less <IoIosArrowDropup /></>
                ) : (
                  <>Show all <IoIosArrowDropdown /></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* SSD Size Card */}
        <div className="flex gap-2 flex-col w-full h-full border border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">SSD Size</p>
          </div>
          <div className="pt-2 flex flex-col gap-3 items-center justify-center">
            {ssdSizes.map((ssd) => (
              <div
                key={ssd.value}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center justify-center gap-2">
                  <Checkbox 
                    checked={selectedSSDSize.includes(ssd.value)}
                    onCheckedChange={() => handleSSDChange(ssd.value)}
                  />
                  <p className="text-bodySmall">{ssd.label}</p>
                </div>
                <p className="text-bodySmall">{ssd.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Colors Card */}
        <div className="flex gap-2 flex-col w-full h-full border border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Colors</p>
          </div>
          <RadioGroup 
            className="pt-2"
            value={selectedColor}
            onValueChange={handleColorChange}
          >
            {colors.map((color) => (
              <div key={color.label} className="flex items-center space-x-2">
                <RadioGroupItem
                  style={{ 
                    color: color.value,
                    border: `1.5px solid ${color.value}`
                  }}
                  value={color.value}
                  id={color.value}
                />
                <Label className="text-bodySmall" htmlFor={color.value}>
                  {color.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
      
        </div>
        

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Product Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px] py-[24px]">
            {isLoadingResults || !products
              ? Array(6)
                  .fill(null)
                  .map((_, i) => <ProductCard1Skeleton key={i} />)
              : products.map((item:any, index: number) => (
                  <ProductCard
                  key={item.id}
                  index={index}
                  image={
                    item?.productimages && item.productimages?.length > 0
                      ? item.productimages?.[0]?.url
                      : ""
                  }
                  id={item.id}
                  ratings={item.ratings}
                  price={item.price}
                  descriptions={item.description}
                  name={item.name}
                  alt={item.productimages?.[0]?.alt_text}
                  bonus={item.bonus}
                  title={item.title}
                  isLoading={isLoading}
                  createdAt={item.createdAt}
                  />
                ))}
          </div>

          {/* Pagination */}
       <div className="flex w-full  items-center justify-center p-5  ">
         <button className="p-2 flex items-center justify-start hover:bg-Gary-100 dark:hover:bg-Gary-700 rounded-full "><FaAngleLeft /></button>
         <div className="w-full h-full flex justify-center items-center gap-2 ">
            {[1, 2, 3, 4, "...", 16].map((page, index) => (
              <button
                key={index}
                className={`w-8 h-8 flex items-center justify-center rounded ${
                  page === 1 ? "dark:bg-Gary-700 bg-gray-200 " : "dark:bg-Gary-800 bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button className=" flex items-center justify-end p-2 hover:bg-Gary-100 dark:hover:bg-Gary-700 rounded-full"><FaAngleRight /></button>
       </div>

<div>
<h2>
        Items related to your search
   </h2>
<div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-[24px] py-[24px]">

            {isLoading || !product
              ? Array(6)
                  .fill(null)
                  .map((_, i) => <ProductCard1Skeleton key={i} />)
              : product.slice(0,3).map((item:any, index: number) => (
                  <ProductCard
                  key={item.id}
                  index={index}
                  image={
                    item?.productimages && item.productimages?.length > 0
                      ? item.productimages?.[0]?.url
                      : ""
                  }
                  id={item.id}
                  ratings={item.ratings}
                  price={item.price}
                  descriptions={item.description}
                  name={item.name}
                  alt={item.productimages?.[0]?.alt_text}
                  bonus={item.bonus}
                  title={item.title}
                  isLoading={isLoading}
                  createdAt={item.createdAt}
                  />
                ))}
          </div>
</div>
      

        </div>
      </div>
    </div>
        </div>
    
    </div>
  )
}

export default ElectronicSearch