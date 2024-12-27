
import { useTranslations } from 'next-intl';
import { MdComputer } from 'react-icons/md';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { FaTv } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { IoIosCamera } from "react-icons/io";
import { FiPrinter } from "react-icons/fi";
import { FaHeadphones } from "react-icons/fa6";
import { BsWatch } from "react-icons/bs";


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
export default CategoryList;
