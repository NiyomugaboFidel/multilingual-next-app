import Image from "next/image";
import { ReactNode } from "react";

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "submit" | "button" | "reset";
  className?: string;
  icon?: boolean;
  iconTag?: ReactNode;
  iconName?: string;
  disabled?:boolean
   isLoading?:boolean
}
const Button: React.FC<ButtonProps> = ({
  className,
  label,
  type = "button",
  onClick,
  iconName,
  iconTag,
  icon,
  disabled,
  isLoading
}) => {
  return (
    <button
      onClick={onClick}
      className={`${className} bg-[#F55266]  text-[#FFFFFF] leading-[24px] text-[16px] font-[500] flex  gap-[8px] px-[24px] py-[12px] rounded-[8px] border-none `}
      type={type}
      disabled={disabled || isLoading}
    >
      <span className="w-full h-full flex items-center justify-center text-center">
        {" "}
        {label}
      </span>
      {icon ? (
        <span
          className={` ${className} h-[18px] cursor-pointer border-none decoration-transparent flex items-center justify-center `}
        >
          {iconTag ? (
            iconTag
          ) : (
            <Image
              width={16.5}
              height={16.5}
              src={`/icons/${iconName}`}
              alt={iconName ? iconName : "icon"}
            />
          )}
        </span>
      ) : null}
    </button>
  );
};

export default Button;
