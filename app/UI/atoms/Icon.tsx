import Image from "next/image";
import { ReactNode } from "react";

interface IconProps {
  iconName?: string; // Icon image name
  iconTag?: ReactNode; // Optional React element for custom icons (e.g., SVGs)
  className?: string; // Additional custom class names
  icontype?: boolean; // Determines whether to apply default icon styles
  width?: number; // Custom width for the icon
  height?: number; // Custom height for the icon
  hoverStyle?: string; // Additional hover styles
  rounded?: boolean; // Adds rounded styles
  onClick?: () => void; // Click event handler
  variant?: "default" | "dark" | "danger" | "success" | "warning"; // Predefined styles
}

const Icon: React.FC<IconProps> = ({
  iconName,
  className = "",
  iconTag,
  icontype = true,
  width = 16.5,
  height = 16.5,
  hoverStyle = "hover:bg-gray-700",
  rounded = true,
  onClick,
  variant = "default",
}) => {
  // Style mapping for variants
  const variantStyles: Record<string, string> = {
    default: "bg-gray-100  text-gray-800",
    dark: "bg-gray-800 text-white hover:bg-gray-600",
    danger: "bg-red-100 text-red-600 hover:bg-red-200",
    success: "bg-green-100 text-green-600 hover:bg-green-200",
    warning: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200",
  };

  // Get variant class
  const variantClass = variantStyles[variant] || variantStyles.default;

  // Default style classes
  const defaultStyles = `flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer w-[30px] h-[30px]  md:w-[48px] md:h-[48px]  p-2 md:p-[15px] ${
    rounded ? "rounded-full" : ""
  } ${hoverStyle} ${variantClass} ${className}`;

  return (
    <span
      className={`${icontype ? defaultStyles : className}`}
      onClick={onClick}
    >
      {iconTag ? (
        iconTag
      ) : (
        <Image
          width={width}
          height={height}
          src={`/icons/${iconName}`}
          alt={iconName || "icon"}
          className="w-auto h-auto bg-no-repeat"
          priority
        />
      )}
    </span>
  );
};

export default Icon;
