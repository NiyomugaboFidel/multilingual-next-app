"use client";
import CategoryList from "@/app/components/CategoryList";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { MdComputer } from "react-icons/md";

interface CategoryPorps {
  categoryisOpen: boolean;
}
const NavItem: React.FC<CategoryPorps> = ({ categoryisOpen }) => {
  const [categoryListIsOpen, setCategoryIsOpen] = useState(''); 
  // Access the current route
  const currentRoute = usePathname();
  const local = useLocale();

  return (
    <div className="bg-white z-30 dark:bg-primaryColor-dark  ">
      <div
        className={`${
          currentRoute === `/${local}`
            ? "flex"
            : !categoryisOpen
            ? "flex"
            : "hidden"
        } w-full  lg:h-[424px] z-30 dark:bg-primaryColor-dark  2xl:h-[546px] min-h-full items-start justify-center bg-[#ffffff]  absolute top-[37px] left-0  min-w-[304px] ring-1 dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px] p-[12px]`}
      >
        <ul className="w-full max-w-[522px] gap-[6px] flex flex-col  h-[60vh]">
          {CategoryList()
            .slice(0, 8)
            .map((items, i) => (
              <li
                onClick={() => {
                  setCategoryIsOpen(items.name);
                  console.log(items.name);
                }}
                key={i}
                className="px-[12px] py-[8px] rounded-[8px] hover:bg-Gary-100  dark:hover:bg-Gary-700 w-full flex justify-between items-center text-Gary-700  gap-[12px]"
              >
                <div className="flex items-center justify-center gap-2">
                  <span>{items.icon}</span>
                  <span className="  flex items-start justify-start text-start dark:text-gray-200">
                    {items.label}
                  </span>
                </div>
                <span>
                  <FaAngleRight className="text-Gary-700 dark:text-Gary-300" />
                </span>
              </li>
            ))}
        </ul>
      </div>
      <div
        className={`${categoryListIsOpen === ''  ? 'hidden': 'flex'} w-full transition-all duration-300 ease-in-out z-20 lg:h-[424px] 2xl:h-[546px] min-h-full items-start justify-center dark:bg-primaryColor-dark bg-[#ffffff]  mx-[5px] shadow absolute top-[40px] left-[100%]  min-w-[702px] ring-1 dark:bg-[#080B1240] dark:ring-Gary-700 ring-Gary-100 rounded-b-[16px] p-[12px]`}
      >
       <div className="w-full h-full lg:grid 2xl:grid-cols-4 lg:grid-cols-3 hidden gap-2">
        <div className="bg-indigo-200 h-full w-full"></div>
        <div className="bg-indigo-200 h-full w-full"></div>
        <div className="bg-indigo-200 h-full w-full"></div>
     
       </div>
      </div>
    </div>
  );
};

export default NavItem;
