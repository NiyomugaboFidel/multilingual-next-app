import Image from "next/image";
import { ReactNode } from "react";

interface IconProps {
  iconName?: string;
  iconTag?: ReactNode;
  className?: string;
  icontype?: boolean;
  width?: number;
  height?: number;
}

const Icon: React.FC<IconProps> = ({
  iconName,
  className,
  iconTag,
  icontype = true,
  width = 16.5,
  height = 16.5,
}) => {
  const icon1 = `${className} w-[30px] h-[30px]  md:w-[48px] md:h-[48px] flex items-center justify-center  hover:bg-Gary-700 rounded-full p-2 md:p-[15px] transition-all duration-300 ease-in-out cursor-pointer`;
  return (
    <span className={` cursor-pointer ${className} ${icontype ? icon1 : ""}`}>
      {iconTag ? (
        iconTag
      ) : (
        <Image
          style={{
            width: "auto",
            height: "auto",
          }}
          width={width}
          height={height}
          src={`/icons/${iconName}`}
          alt={iconName ? iconName : "icon"}
          className="w-auto h-auto bg-no-repeat"
          priority
        />
      )}
    </span>
  );
};

export default Icon;
