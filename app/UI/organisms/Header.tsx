"use client";
import { ChangeEvent, useEffect, useState } from "react";
import Logo from "../atoms/Logo";
import SearchField from "../molecules/SearchField";
import Icon from "../atoms/Icon";
import svg from "@/app/data/svgIcon";
import { useDarkMode } from "@/app/context/DarkModeContext";
import Link from "next/link";
import NavItem from "../molecules/NavItem";
import LocaleSwitcher from "@/app/components/local-switcher";
import { navRouter } from "@/app/data/Constant";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { FaRegMoon } from "react-icons/fa";
import { BsCart2 } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { ArrowUp, Heart, SunDim } from "lucide-react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isNavOpen, setNavOpen] = useState(false);
  const [categoryisOpen, setCategoryIsOpen] = useState(false);
  const t = useTranslations();
  const router = useRouter()
  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/search?search_query=${encodeURIComponent(searchValue)}`);
    }
  };
  const toggleNavOpen = () => {
    setNavOpen(prev => !prev)
  }
  const currentRoute = usePathname();
  const local = useLocale();

  return (
    <div className="w-full min-h-[64px]  bg-primaryColor-light  text-textColor-light dark:text-textColor-light lg:px-[50px] xl:px-[100px]  block ">
      <div className="hidden lg:flex w-full h-[88px] bg-primaryColor-light   justify-between items-center lg:gap-[30px] xl:gap-[48px] ">
        <div className="w-full flex items-star">
          <Logo textDark="dark:text-[#ffffff]" textLight="text-[#ffffff]" />
        </div>

        <div className="w-full">
          <SearchField
            onSearch={handleSearch}
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <div className="flex gap-[8px]">

            <div>
              <span className="icon bg-Gary-700"  >
                <Image width={30} height={30} alt="precent" src={'/icons/percent.svg'} />
              </span>
            </div>

            <div className="w-full flex items-start justify-center flex-col gap-[2px]">
              <p className=" w-full text-[12px] leading-[18px] text-Gary-100  ">
                Only this month
              </p>
              <h5 className="w-full text-[16px] leading-[24px] text-textColor-light ">
                Super Sale 20%
              </h5>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end items-center gap-[4px]">
          <button className="" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <span className="icon">
                <FaRegMoon size={20} />
              </span>
            ) : (
              <span className="icon">
                <SunDim />
              </span>

            )}
          </button>

          <button>
            <span className="icon">
              <Heart />
            </span>
          </button>
          <button>
            <span className="icon">
              <IoPersonOutline />
            </span>
          </button>
          <button className=" relative bg-transparent">
            <span className="icon bg-Gary-700">
              <BsCart2 />
            </span>
            <span className=" absolute  -right-[10px] top-0 w-[25px] h-[25px] rounded-full bg-green-500 text-center ">3 </span>
          </button>
        </div>
      </div>

      <nav className=" h-full relative hidden lg:flex w-full py-0 bg-primaryColor-light text-textColor-light ">
        <div className="h-full w-full flex justify-between items-end gap-5">

          <div className="py-[12px] flex justify-center items-center bg-Gary-700 rounded-t-[8px]">
            <button className=" relative min-w-[306px] w-full   flex justify-between items-center gap-[10px] ">
              <div className=" px-5 flex items-center justify-center gap-2">
                <span className="w-full">
                  <Icon width={14} height={14} iconName="window.svg" icontype={false} />
                </span>
                <span className=" text-bodySmall font-semibold">{t("Categories")}</span>

              </div>
              <span className="px-5" onClick={() => setCategoryIsOpen(prev => !prev)} >
               { categoryisOpen || currentRoute === `/${local}` ?    <IoIosArrowDown /> : <IoIosArrowUp/>}
              </span>
              <div className={` ${categoryisOpen ? "block" : "hidden"} z-50   min-h-[70vh] h-full  absolute top-[35px] w-full`} >
                <NavItem categoryIsOpen={currentRoute === `/${local}` ? false : categoryisOpen} />
              </div>
            </button>
          </div>

          <ul className="py-[12px] flex  w-full  px-5">
            {navRouter().map((item, index) => (
              <Link key={index} href={item.href}>
                <li className="text-bodySmall 2xl:text-[16px] 2xl:leading-[24px] px-[15px] 2xl:px-[30px]  ">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <div className="py-[12px] flex  gap-[20px] ">
            <div className="flex justify-center items-center gap-1">
              <LocaleSwitcher />
            </div>

          </div>
        </div>
      </nav>

      {/* moble phone */}
      <nav className=" relative w-full h-[64px] flex lg:hidden justify-between  items-center px-[16px]">
        <div className="flex items-center justify-center">
          <button className="" onClick={toggleNavOpen}>
            {isNavOpen ? (
              <Icon variant="dark" iconTag={svg.menuclose} />
            ) : (
              <Icon variant="dark" iconTag={svg.menu} />
            )}
          </button>
        </div>
        <div className=" flex justify-center items-center gap-[4px]">
          <button className="" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Icon variant="dark" iconTag={svg.moon} />
            ) : (
              <Icon variant="dark" iconTag={svg.sun} />
            )}
          </button>

          <Icon variant="dark" iconTag={svg.search} />
          <Icon variant="dark" iconTag={svg.cart} className="bg-Gary-700 hover:bg-Gary-300" />
        </div>
        <div className={`${!isNavOpen ? 'left-[-800%]' : 'left-[0%]'} z-20 w-full top-[64px] text-start bg-primaryColor-light h-full min-h-[100vh] absolute  transition-all duration-500 ease-in-out flex flex-col lg:hidden `}>

          <ul className={` w-[228px] flex flex-col `}>
            {navRouter().map((item, index) => (
              <Link key={index} href={item.href}>
                <li className=" bg-Gary-700 text-start text-[16px] leading-[24px]  py-[12px] my-[2px] px-[20px] ">
                  {item.name}
                </li>
              </Link>
            ))}

          </ul>
          <div className="w-[228px] my-[2px] flex flex-col lg:flex-row justify-start items-start  gap-[20px] ">
            <div className="flex py-[12px] justify-center items-center gap-1 bg-Gary-700 w-full">
              <LocaleSwitcher />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
