import { useTranslations } from 'next-intl';
import { MdComputer } from 'react-icons/md';
import { HiOutlineDevicePhoneMobile } from 'react-icons/hi2';
import { FaTv } from "react-icons/fa";
import { MdOutlineSpeaker } from "react-icons/md";
import { IoIosCamera } from "react-icons/io";
import { FiPrinter } from "react-icons/fi";
import { FaHeadphones } from "react-icons/fa6";
import { BsWatch } from "react-icons/bs";


const CategoryList = () => {
  const t = useTranslations('categories'); // Assuming your translations are under 'categories' namespace

  const categoryList = [
    {
      label: t('computer'),
      name: 'computer',
      icon: <MdComputer className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('smartphones'),
      name: 'smartphones',
      icon: <HiOutlineDevicePhoneMobile className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('tv'),
      name: 'tv',
      icon: <FaTv className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('music_devices'),
      name: 'music_devices',
      icon: <MdOutlineSpeaker className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('cameras'),
      name: 'cameras',
      icon: <IoIosCamera className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('printers'),
      name: 'printers',
      icon: <FiPrinter className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    // {
    //   label: t('charging'),
    //   name: 'charging',
    //   icon: <MdComputer className="text-Gary-700 dark:text-Gary-300" />,
    //   Product: [],
    // },
    {
      label: t('headphones'),
      name: 'headphones',
      icon: <FaHeadphones className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
    {
      label: t('wearables'),
      name: 'wearables',
      icon: <BsWatch className="text-Gary-700 dark:text-Gary-300" />,
      Product: [],
    },
  ];

  return categoryList
};

export default CategoryList;
