"use client";
import { useState } from "react";
import Icon from "./Icon";
import svg from "@/app/data/svgIcon";

interface SelectData {
  value: string;
  label: string;
}

interface Select {
  SelectList: SelectData[];
  className?: string;
  onChange: (value: string) => void;
  value: string;
  name: string;
}
const Selector: React.FC<Select> = ({
  SelectList,
  className,
  onChange,
  name,
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={` ${className} flex justify-between items-center w-full gap-[10px] `}
      >
        <span>{value ? value : name}</span>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Icon
            icontype={false}
            className=" w-[14px] h-[14px] flex items-center justify-center  transition-all duration-300 ease-in-out cursor-pointer "
            iconTag={svg.dropdown_dark}
          />
        </button>
      </div>

      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } max-h-[200px] overflow-auto absolute top-11  flex-col w-full p-[12px] gap-[4px] rounded-[8px] border border-Gary-300 `}
      >
        {SelectList.map((item, index) => (
          <button
            key={index}
            onClick={() => onChange(item.value)}
            className={` ${
              value === item.value ? "bg-slate-300 " : ""
            } flex justify-between items-center bg-gray-100 hover:bg-slate-300 rounded-[8px] text-start  w-full relative px-[16px] gap-[10px] py-[9px]  transition-all ease-in-out duration-500 `}
          >
            <span>{item.label}</span>
            <span>
              {value === item.value ? (
                <Icon
                  icontype={false}
                  className={` w-[14px] h-[14px] flex items-center justify-center  transition-all duration-300 ease-in-out cursor-pointer `}
                  iconTag={svg.v}
                />
              ) : null}
            </span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Selector;
