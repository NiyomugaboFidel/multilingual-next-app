
import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Percent } from "lucide-react";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

// Types
type FilterQuery = {
  bestBefore?: string;
  maxPrice?: number;
  minPrice?: number;
  categoryId?: string[];
  name?: string;
  brand?: string[];
  tags?: string[];
  specifications?: Record<string, string[]>;
}

type Category = {
  id: string;
  title: string;
  key: string;
  label: string;
  count: number;
}

type Brand = {
  label: string;
  value: string;
  count: number;
}

type SSDSize = {
  label: string;
  value: string;
  count: number;
}

type Color = {
  value: string;
  label: string;
}

const SidebarFilter = () => {
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

  // Mock categories with enhanced type
  const categories: Category[] = [
    { id: "1", title: "Laptops", key: "laptops", label: "Laptops", count: 29 },
    { id: "2", title: "Desktops", key: "desktops", label: "Desktops", count: 58 },
    { id: "3", title: "Accessories", key: "accessories", label: "Accessories", count: 87 },
    { id: "4", title: "Monitors", key: "monitors", label: "Monitors", count: 116 },
    { id: "5", title: "Keyboards", key: "keyboards", label: "Keyboards", count: 145 },
    { id: "6", title: "Mouse", key: "mouse", label: "Mouse", count: 174 },
    { id: "7", title: "Storage", key: "storage", label: "Storage", count: 203 },
    { id: "8", title: "Components", key: "components", label: "Components", count: 232 }
  ];

  const brands: Brand[] = [
    { label: "Apple", value: "Apple", count: 12 },
    { label: "Asus", value: "Asus", count: 47 },
    { label: "Cobra", value: "Cobra", count: 52 },
    { label: "Dell", value: "Dell", count: 48 },
    { label: "Lenovo", value: "Lenovo", count: 112 },
    { label: "2E Gaming", value: "2E Gaming", count: 13 },
    { label: "AsRock", value: "AsRock", count: 35 },
    { label: "HP", value: "HP", count: 89 },
    { label: "MSI", value: "MSI", count: 67 },
    { label: "Acer", value: "Acer", count: 45 }
  ];

  const ssdSizes: SSDSize[] = [
    { label: "2 TB", value: "2 TB", count: 13 },
    { label: "1 TB", value: "1 TB", count: 28 },
    { label: "512 GB", value: "512 GB", count: 47 },
    { label: "256 GB", value: "256 GB", count: 56 },
    { label: "128 GB", value: "128 GB", count: 69 },
    { label: "64 GB or less", value: "64 GB or less", count: 141 },
  ];

  const colors: Color[] = [
    { value: "#8BC4AB", label: "Green" },
    { value: "#EE7976", label: "Coral red" },
    { value: "#DF8FBF", label: "Light pink" },
    { value: "#9ACBF1", label: "Sky blue" },
    { value: "#364254", label: "Black" },
    { value: "gray", label: "White" },
  ];

  // Constants for show/hide limits
  const INITIAL_CATEGORIES_SHOW = 5;
  const INITIAL_BRANDS_SHOW = 6;

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
  );
};

export default SidebarFilter;