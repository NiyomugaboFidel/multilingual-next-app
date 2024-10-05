"use client";
import { ChangeEvent, useState } from "react";
import Logo from "../atoms/Logo";
import SearchField from "../molecules/SearchField";
import Icon from "../atoms/Icon";
import svg from "@/app/data/svgIcon";
import { useDarkMode } from "@/app/context/DarkModeContext";
import Link from "next/link";
import NavItem from "../molecules/NavItem";
import LocaleSwitcher from "@/app/components/local-switcher";
import { navRouter } from "@/app/data/Constant";


const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState("");
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [isNavOpen, setNavOpen ] = useState(false);
  const [categoryisOpen, setCategoryIsOpen ] = useState(true);

  // search input values
  console.log(searchValue);

  const toggleNavOpen = ()=>{
    setNavOpen(prev => !prev)
  }
  

  return (
    <div className="w-full min-h-[64px]  bg-primaryColor-light  text-textColor-light dark:text-textColor-light lg:px-[50px] xl:px-[100px]  block ">
      <div className="hidden lg:flex w-full h-[88px] bg-primaryColor-light   justify-between items-center lg:gap-[30px] xl:gap-[48px] ">
        <div className="w-full">
          <Logo textDark="dark:text-[#ffffff]" textLight="text-[#ffffff]" />
        </div>

        <div className="xl:w-[440px]">
          <SearchField
            value={searchValue}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchValue(e.target.value)
            }
          />
        </div>
        <div className="w-full flex justify-center items-center gap-[8px]">
          <Icon iconName="percent.svg" className="bg-Gary-700" />
          <div className="flex items-start justify-center flex-col gap-[2px]">
            <p className="text-[12px] leading-[18px] text-Gary-100  ">
              Only this month
            </p>
            <h5 className="text-[16px] leading-[24px] text-textColor-light ">
              Super Sale 20%
            </h5>
          </div>
        </div>
        <div className="w-full flex justify-center items-center gap-[4px]">
          <button className="" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Icon iconTag={svg.moon} />
            ) : (
              <Icon iconTag={svg.sun} />
            )}
          </button>

          <Icon iconTag={svg.heart} />
          <Icon iconTag={svg.person} />
          <Icon iconTag={svg.cart} className="bg-Gary-700 hover:bg-Gary-300" />
        </div>
      </div>
      <nav className="hidden lg:flex w-full py-0 bg-primaryColor-light text-textColor-light">
        <div className="w-full flex justify-between items-end">
          <div className="flex justify-center items-center">
            <button className=" relative min-w-[306px] w-full rounded-t-[8px] pl-[24px] pr-[16px] bg-Gary-700 flex justify-between items-center gap-[10px] ">
              <div className="flex items-center justify-center">
                <span className="w-full">
                  <Icon iconName="window.svg" className="w-[18px] h-[18px] " />
                </span>
                <span>Categories</span>
             
              </div>
              <span onClick={()=> setCategoryIsOpen(prev => !prev)} >
                <Icon iconTag={svg.dropdown} className="" />
              </span>
              <NavItem  categoryisOpen={categoryisOpen} />
            </button>
          </div>
          <ul className="flex justify-center items-center">
            {navRouter().map((item, index) => (
              <Link key={index} href={item.href}>
                <li className="text-[16px] leading-[24px]  py-[12px] px-[20px]">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          <div className="flex items-center gap-[8px] justify-center ">
            <div className="py-[12px] flex justify-center items-center gap-1">
              <LocaleSwitcher />
            </div>
            <div className="py-[12px] flex justify-center items-center gap-1 ">
              <span>Usd($) </span>{" "}
              <span>
                <Icon iconTag={svg.dropdown} className="w-[8px] h-[4px]" />
              </span>
            </div>
          </div>
        </div>
      </nav>
      
      {/* moble phone */}
      <nav className=" relative w-full h-[64px] flex lg:hidden justify-between  items-center px-[16px]">
        <div className="flex items-center justify-center">
        <button className="" onClick={toggleNavOpen}>
            {isNavOpen ? (
              <Icon iconTag={svg.menuclose} />
            ) : (
              <Icon iconTag={svg.menu} />
            )}
          </button>
        </div>
        <div className=" flex justify-center items-center gap-[4px]">
        <button className="" onClick={toggleDarkMode}>
            {isDarkMode ? (
              <Icon iconTag={svg.moon} />
            ) : (
              <Icon iconTag={svg.sun} />
            )}
          </button>

          <Icon iconTag={svg.search} />
          <Icon iconTag={svg.cart} className="bg-Gary-700 hover:bg-Gary-300" />
        </div>
       <div className={`${!isNavOpen ? 'left-[-800%]' : 'left-[0%]'} z-20 w-full top-[64px] text-start bg-primaryColor-light h-full min-h-[300px] absolute  transition-all duration-500 ease-in-out flex flex-col lg:hidden `}>
       <div className="">
            <button className="pl-[24px] pr-[16px] bg-Gary-700 flex justify-between items-center gap-[10px] ">
              <div className="flex items-center justify-center">
                <span className="w-full">
                  <Icon iconName="window.svg" />
                </span>
                <span>Categories</span>
              </div>
              <span>
                <Icon iconTag={svg.dropdown} className="" />
              </span>
            </button>
          </div>
        <ul className={` w-full  flex flex-col `}>
            {navRouter().map((item, index) => (
              <Link  key={index} href={item.href}>
                <li  className=" text-start text-[16px] leading-[24px]  py-[12px] px-[20px]">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
       </div>
      </nav>
    </div>
  );
};

export default Header;
