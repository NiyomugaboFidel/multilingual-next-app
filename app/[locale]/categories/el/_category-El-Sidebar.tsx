import ECategory from "@/app/data/categories/ECategory";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Percent } from "lucide-react";
import { useState } from "react";
import { IoIosArrowDropdown } from "react-icons/io";

const SiderbarFilter = () => {
  const [priceRange, setPriceRange] = useState([340, 1250]);
  const [selectedBrands, setSelectedBrands] = useState(["Apple"]);
  const [selectedSSDSize, setSelectedSSDSize] = useState(["1 TB"]);
  const [selectedColor, setSelectedColor] = useState("Green");
  const categories = ECategory();
  const brands = [
    { label: "Apple", value: "Apple", count: 12 },
    { label: "Asus", value: "Asus", count: 47 },
    { label: "Cobra", value: "Cobra", count: 52 },
    { label: "Dell", value: "Dell", count: 48 },
    { label: "Lenovo", value: "Lenovo", count: 112 },
    { label: "2E Gaming", value: "2E Gaming", count: 13 },
    { label: "AsRock", value: "AsRock", count: 35 },
  ];

  const ssdSizes = [
    { label: "2 TB", value: "2 TB", count: 13 },
    { label: "1 TB", value: "1 TB", count: 28 },
    { label: "512 GB", value: "512 GB", count: 47 },
    { label: "256 GB", value: "256 GB", count: 56 },
    { label: "128 GB", value: "128 GB", count: 69 },
    { label: "64 GB or less", value: "64 GB or less", count: 141 },
  ];

  const colors = [
    { value: "green-500", label: "Green" },
    { value: "red-500", label: "Coral red" },
    { value: "pink-600", label: "Light pink" },
    { value: "blue-500", label: "Sky blue" },
    { value: "black", label: "Black" },
    { value: "white", label: "White" },
  ];

  return (
    <div>
      <div className="flex flex-col gap-5 items-start justify-center">
        {/* Card 1 */}
        <div className="flex gap-2 flex-col w-full h-full border  border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Status</p>
          </div>
          <div className="flex flex-col gap-2   ">
            <div className="flex items-center justify-center gap-2">
              <button className=" hover:bg-gray-50 text-bodySmall border  border-gray-200 dark:border-Gary-700 p-2 rounded-[6px] flex items-center justify-center gap-2">
                {" "}
                <Percent className="text-sm w-3" /> Sela{" "}
              </button>
              <button className="hover:bg-gray-50  w-full text-bodySmall border  border-gray-200 dark:border-Gary-700 p-2 rounded-[6px]">
                Same Day Delivery
              </button>
            </div>
            <button className="hover:bg-gray-50  w-full text-bodySmall border  border-gray-200 dark:border-Gary-700 p-2 rounded-[6px]">
              Same Day Delivery
            </button>
          </div>
        </div>
        {/* Card 2 */}
        <div className="lex gap-2 flex-col w-full h-full border  border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Categories</p>
          </div>
          <div className=" pt-2 flex flex-col gap-3 items-center justify-center">
            {categories.map((category, i) => (
              <div
                key={category.title}
                className="w-full flex items-center justify-between"
              >
                <p className="text-bodySmall ">{category.title}</p>
                <p className="text-bodySmall ">{i > 0 ? 29 * i : 29}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Card 3 */}
        <div className="lex gap-2 flex-col w-full h-full border  border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Price</p>
          </div>
          <div className=" pt-2 flex flex-col gap-3 items-center justify-center"></div>
        </div>
        {/* Card 4 */}
        <div className="lex gap-2 flex-col w-full h-full border  border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">Brand</p>
          </div>
          <div className=" pt-2 flex flex-col gap-3 items-center justify-center">
            {brands.map((brand, i) => (
              <div
                key={brand.label}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center justify-center gap-2">
                  <Checkbox value={brand.value} />
                  <p className="text-bodySmall ">{brand.label}</p>
                </div>
                <p className="text-bodySmall ">{brand.count}</p>
              </div>
            ))}
            <button className=" w-full text-start gap-2 flex items-center justify-start font-semibold text-bodySmall">
              Show all <IoIosArrowDropdown />
            </button>
          </div>
        </div>
        {/* Card 5 */}
        <div className="lex gap-2 flex-col w-full h-full border  border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">SSD Size</p>
          </div>
          <div className=" pt-2 flex flex-col gap-3 items-center justify-center">
            {ssdSizes.map((ssd, i) => (
              <div
                key={ssd.label}
                className="w-full flex items-center justify-between"
              >
                <div className="flex items-center justify-center gap-2">
                  <Checkbox value={ssd.value} />
                  <p className="text-bodySmall ">{ssd.label}</p>
                </div>
                <p className="text-bodySmall ">{ssd.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 6 */}
        <div className="lex gap-2 flex-col w-full h-full border  border-gray-200 dark:border-Gary-700 rounded-[8px] p-5">
          <div>
            <p className="font-semibold text-bodyDefault">SSD Size</p>
          </div>
          <RadioGroup className="pt-2 " defaultValue="green">
            {colors.map((color, i) => (
              <div key={color.label} className="flex items-center space-x-2">
                <RadioGroupItem className={` bg-${color.value} border-gray-300 outline-gray-300`}  value={color.value} id={color.value} />
                <Label className="text-bodySmall " htmlFor={color.value}>
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

export default SiderbarFilter;
